# Portfolio Improvement Backlog

## High Impact (Missing Entirely)

- [ ] **Resume download button** — Add to nav + hero. Recruiters spend ~10s deciding; no PDF = they leave.
- [ ] **Impact numbers on projects** — Replace vague descriptions with concrete metrics (latency #s, user counts, test coverage %, deploy frequency). AI screening tools prioritize proof of impact.
- [ ] **Photo** — Add to About or nav. Zero face on the site currently.
- [ ] **Live demo links** — All 6 projects only link to GitHub. Even 1-2 Loom walkthroughs or deployed URLs would stand out.

## Medium Impact (Easy Wins)

- [ ] **Copyright says 2024** — Fix footer to 2025/2026.
- [ ] **About section is boilerplate** — "I'm passionate about building scalable systems" is generic. Tell a specific story: what surprised you building something at SJSU? What hard problem are you obsessed with?
- [ ] **Mobile: no navigation** — Command palette (⌘K) is `hidden md:flex` only. Mobile gets nothing. Add hamburger menu.
- [ ] **Contact terminal needs upfront hints** — Most visitors won't type anything. Show example commands on load:
  ```
  $ help    → see commands
  $ email   → open mailto
  ```
- [ ] **Skills bars look like guesses** — Self-reported 85%/90% etc. look arbitrary. Replace with "Used in production" context or just drop the bars.

## Polish

- [ ] **Project tags are duplicated** — `tags` + `skills` arrays merged with `Set` but still overlap (e.g. "TypeScript" appears twice for LessGo). Use one source of truth.
- [ ] **No OpenGraph / SEO** — No `og:image`, no description meta tag. LinkedIn share shows nothing.
- [ ] **GitHub stats widget** — Live contribution graph or streak shows *active* coding, not just past work. Git timeline is good but static.

## Already Good (Keep)

- Cursor-repelling name animation — genuinely memorable
- Particle canvas with mouse repulsion — polished
- Git timeline — unique differentiator
- Command palette (⌘K) — clever hacker touch
- Project expand/collapse with per-column layout — works well
