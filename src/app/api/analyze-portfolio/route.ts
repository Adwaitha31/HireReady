import { NextRequest, NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string | null;
  description: string | null;
  fork: boolean;
  html_url: string;
}

interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  company: string | null;
  blog: string | null;
  avatar_url: string;
}

function extractGitHubUsername(url: string): string | null {
  try {
    const clean = url.trim().replace(/\/$/, "");
    const match = clean.match(/github\.com\/([a-zA-Z0-9-]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

function isGitHubUrl(url: string): boolean {
  return url.toLowerCase().includes("github.com");
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string" || url.trim() === "") {
      return NextResponse.json({ type: "none", summary: "No portfolio URL provided." });
    }

    const trimmedUrl = url.trim();

    // ── GitHub Analysis ──────────────────────────────────────────────
    if (isGitHubUrl(trimmedUrl)) {
      const username = extractGitHubUsername(trimmedUrl);
      if (!username) {
        return NextResponse.json({ type: "url", isLive: false, summary: "Could not extract GitHub username from URL." });
      }

      const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "HireReady-App",
      };

      // Fetch user profile + repos in parallel
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, { headers }),
        fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10&type=public`, { headers }),
      ]);

      if (!userRes.ok) {
        return NextResponse.json({
          type: "github",
          username,
          error: userRes.status === 404 ? "GitHub user not found." : "GitHub API error.",
          summary: `GitHub profile @${username} could not be fetched.`,
        });
      }

      const user: GitHubUser = await userRes.json();
      const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];

      // Filter out forks, get top by stars
      const ownRepos = repos.filter((r) => !r.fork).slice(0, 5);

      // Aggregate languages
      const langCounts: Record<string, number> = {};
      for (const repo of repos) {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
      }
      const topLanguages = Object.entries(langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);

      const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

      const topRepos = ownRepos.map((r) => ({
        name: r.name,
        stars: r.stargazers_count,
        language: r.language || "Unknown",
        description: r.description || "",
      }));

      // Build a readable summary for the AI
      const summary = `
GitHub Profile: @${username}
- Public Repositories: ${user.public_repos}
- Followers: ${user.followers}
- Total Stars across repos: ${totalStars}
- Top Languages: ${topLanguages.join(", ") || "None detected"}
- Bio: ${user.bio || "Not provided"}
- Top Projects: ${topRepos.map((r) => `${r.name} (${r.stars}⭐, ${r.language}): ${r.description}`).join(" | ") || "No public repos"}
`.trim();

      return NextResponse.json({
        type: "github",
        username,
        publicRepos: user.public_repos,
        followers: user.followers,
        totalStars,
        topLanguages,
        topRepos,
        bio: user.bio,
        name: user.name,
        summary,
      });
    }

    // ── Generic URL — check if live ───────────────────────────────────
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(trimmedUrl, { method: "HEAD", signal: controller.signal });
      clearTimeout(timeout);

      const domain = new URL(trimmedUrl).hostname.replace("www.", "");
      const isLive = res.ok || res.status === 405; // 405 = method not allowed, but site exists

      return NextResponse.json({
        type: "url",
        isLive,
        domain,
        summary: isLive
          ? `Portfolio URL is live at ${domain}. The candidate has a publicly accessible portfolio.`
          : `Portfolio URL at ${domain} returned status ${res.status}.`,
      });
    } catch {
      return NextResponse.json({
        type: "url",
        isLive: false,
        summary: "Portfolio URL could not be reached (may be blocked or invalid).",
      });
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg, type: "none", summary: "" }, { status: 500 });
  }
}
