import { useEffect, useState } from 'react'
import { TerminalCard } from './TerminalCard'

const USERNAME = 'manamsriram'
const CACHE_KEY = 'github-stats-cache-v1'
const CACHE_TTL_MS = 60 * 60 * 1000

interface Stats {
  repos: number
  commits: number | null
  languages: number
}

function readCache(): Stats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { stats, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL_MS) return null
    return stats
  } catch {
    return null
  }
}

function writeCache(stats: Stats) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ stats, ts: Date.now() }))
  } catch {
    // ignore quota/storage errors
  }
}

export function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(() => readCache())
  const [error, setError] = useState(false)

  useEffect(() => {
    if (stats?.commits != null) return
    const year = new Date().getFullYear()
    Promise.allSettled([
      fetch(`https://api.github.com/users/${USERNAME}`).then((r) => r.json()),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`).then((r) => r.json()),
      fetch(
        `https://api.github.com/search/commits?q=author:${USERNAME}+committer-date:${year}-01-01..${year}-12-31&per_page=1`,
        { headers: { Accept: 'application/vnd.github.cloak-preview+json' } },
      ).then((r) => r.json()),
    ]).then(([userResult, reposResult, commitResult]) => {
      const user = userResult.status === 'fulfilled' ? userResult.value : null
      const repos = reposResult.status === 'fulfilled' ? reposResult.value : null
      const commitSearch = commitResult.status === 'fulfilled' ? commitResult.value : null

      if (!user && !repos) {
        setError(true)
        return
      }

      const languages = Array.isArray(repos)
        ? new Set(repos.map((r: { language: string | null }) => r.language).filter(Boolean)).size
        : 0
      const commits = typeof commitSearch?.total_count === 'number' ? commitSearch.total_count : null
      const next = { repos: user?.public_repos ?? 0, commits, languages }
      setStats(next)
      if (commits != null) writeCache(next)
    })
  }, [stats])

  if (error) {
    return (
      <TerminalCard label="github-stats">
        <p className="text-muted-foreground">
          GitHub API unavailable —{' '}
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-primary transition-colors"
          >
            view profile directly →
          </a>
        </p>
      </TerminalCard>
    )
  }

  const rows = [
    { label: 'Public Repos', value: stats?.repos },
    { label: `${new Date().getFullYear()} Commits`, value: stats?.commits ? `${stats.commits}+` : undefined },
    { label: 'Languages', value: stats?.languages },
  ]

  return (
    <TerminalCard label="github-stats">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {rows.map(({ label, value }) => (
          <div key={label} className="text-center">
            <div className="text-2xl text-primary">
              {value !== undefined ? value : <span className="text-muted-foreground animate-pulse">—</span>}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>
      <img
        src={`https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&theme=react-dark&hide_border=true&bg_color=0a0a0a&color=22d3ee&line=22c55e&point=ffffff&area=true&area_color=22c55e`}
        alt="GitHub contribution activity"
        className="w-full rounded opacity-90"
        loading="lazy"
      />
    </TerminalCard>
  )
}
