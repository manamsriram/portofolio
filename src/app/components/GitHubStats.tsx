'use client';
import { useEffect, useState } from 'react';

interface Stats {
  repos: number;
  commits: number;
  languages: number;
}

const USERNAME = 'manamsriram';

export default function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`).then(r => r.json()),
      fetch(`https://api.github.com/search/commits?q=author:${USERNAME}+committer-date:${new Date().getFullYear()}-01-01..${new Date().getFullYear()}-12-31&per_page=1`, {
        headers: { Accept: 'application/vnd.github.cloak-preview+json' },
      }).then(r => r.json()),
    ]).then(([user, repos, commitSearch]) => {
      const languages = Array.isArray(repos)
        ? new Set(repos.map((r: { language: string | null }) => r.language).filter(Boolean)).size
        : 0;
      const commits = commitSearch?.total_count ?? 0;
      setStats({ repos: user.public_repos ?? 0, commits, languages });
    }).catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="bg-surface border border-surface-lighter rounded-lg p-6 text-center font-mono-display text-sm text-text-secondary">
        GitHub API unavailable —{' '}
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-electric-cyan hover:text-electric-cyan/80 transition-colors"
        >
          view profile directly →
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {([
          { label: 'Public Repos', value: stats?.repos },
          { label: `${new Date().getFullYear()} Commits`, value: stats?.commits ? `${stats.commits}+` : undefined },
          { label: 'Languages', value: stats?.languages },
        ] as const).map(({ label, value }) => (
          <div key={label} className="bg-surface border border-surface-lighter rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-electric-cyan font-mono-display">
              {value !== undefined ? value : <span className="text-text-secondary animate-pulse">—</span>}
            </div>
            <div className="text-xs text-text-secondary font-mono-display mt-1">{label}</div>
          </div>
        ))}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&theme=react-dark&hide_border=true&bg_color=0d1117&color=00ffff&line=00ff41&point=ffffff&area=true&area_color=00ffff`}
        alt="GitHub contribution activity"
        className="w-full rounded-lg opacity-90"
      />
    </div>
  );
}
