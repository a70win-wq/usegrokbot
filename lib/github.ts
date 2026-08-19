import { site } from "@/lib/site";

const GITHUB_API = `https://api.github.com/repos/${site.githubRepo}`;
const REVALIDATE_SECONDS = 3600;

export async function getGithubStars(): Promise<number | null> {
  try {
    const headers = new Headers({
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "usegrokbot.com",
    });
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(GITHUB_API, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github-stars"] },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}
