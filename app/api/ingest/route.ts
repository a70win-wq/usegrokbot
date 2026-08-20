import { collectXUrls, ingestUseCase, queueIngestIssue } from "@/lib/ingest";
import { rateLimit } from "@/lib/ingest/rate-limit";

export const maxDuration = 60;

type Body = {
  xUrl?: string;
  xUrls?: string[];
  urls?: string;
  prompt?: string;
  notes?: string;
  phase?: "full" | "extract";
};

function isIngestBot(request: Request) {
  const expected = process.env.INGEST_BOT_TOKEN;
  if (!expected) return false;
  const given =
    request.headers.get("x-ingest-token") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return Boolean(given && given === expected);
}

function urlsFromBody(body: Body) {
  return collectXUrls(
    [body.xUrl ?? "", ...(Array.isArray(body.xUrls) ? body.xUrls : []), body.urls ?? ""].join("\n"),
  );
}

export async function POST(request: Request) {
  const bot = isIngestBot(request);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!bot && !rateLimit(ip)) {
    return Response.json(
      { status: "skipped", code: "rate_limited", reason: "Too many submissions. Try later." },
      { status: 429 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ status: "skipped", code: "bad_request", reason: "Send JSON." }, { status: 400 });
  }

  const urls = urlsFromBody(body);
  if (urls.length === 0) {
    return Response.json(
      { status: "skipped", code: "missing_url", reason: "An X post URL is required." },
      { status: 400 },
    );
  }

  const phase = request.headers.get("x-ingest-mode") === "extract" ? "extract" : body.phase;
  if (phase === "extract" || urls.length === 1) {
    const result = await ingestUseCase({
      xUrl: urls[0],
      prompt: body.prompt?.trim() || undefined,
      notes: body.notes?.trim() || undefined,
      phase,
    });
    const status = result.status === "skipped" ? 422 : 200;
    return Response.json(result, { status });
  }

  try {
    const queued = await queueIngestIssue(urls);
    return Response.json({
      status: "queued",
      count: queued.count,
      issueUrl: queued.issueUrl,
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "queue_failed";
    return Response.json(
      { status: "skipped", code: "queue_failed", reason: "Could not queue those posts on GitHub." },
      { status: reason === "missing_github_token" ? 503 : 500 },
    );
  }
}
