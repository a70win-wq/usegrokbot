import { ingestUseCase } from "@/lib/ingest";
import { rateLimit } from "@/lib/ingest/rate-limit";

export const maxDuration = 60;

type Body = {
  xUrl?: string;
  prompt?: string;
  notes?: string;
  phase?: "full" | "extract";
};

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) {
    return Response.json({ status: "skipped", code: "rate_limited", reason: "Too many submissions. Try later." }, { status: 429 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ status: "skipped", code: "bad_request", reason: "Send JSON." }, { status: 400 });
  }

  const xUrl = body.xUrl?.trim() ?? "";
  if (!xUrl) {
    return Response.json({ status: "skipped", code: "missing_url", reason: "An X post URL is required." }, { status: 400 });
  }

  const phase = request.headers.get("x-ingest-mode") === "extract" ? "extract" : body.phase;
  const result = await ingestUseCase({
    xUrl,
    prompt: body.prompt?.trim() || undefined,
    notes: body.notes?.trim() || undefined,
    phase,
  });

  const status = result.status === "skipped" ? 422 : 200;
  return Response.json(result, { status });
}
