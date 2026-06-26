# Portfolio Improvement Backlog

## High Impact (Missing Entirely)

- [x] **Resume download button** — Nav + hero, with fullstack/backend dropdown. ✅ Done.
- [x] **Impact numbers on projects** — Descriptions now lead with concrete metrics (8-service, ~50% faster queries, 241 tests, 8-check risk gate, 15+ endpoints). ✅ Done.
- [x] **Photo** — `profile.jpg` in `public/`, rendered in About section. ✅ Done.
- [x] **Live demo links** — Demo video links added to projects. ✅ Done.

## Medium Impact (Easy Wins)

- [x] **Copyright year** — Footer shows "© 2026". ✅ Done.
- [x] **About section** — Now has specific LessGo distributed-state bug story, "correctness is a property of how services fail together" thesis, explicit graduation timeline. ✅ Done.
- [x] **Mobile navigation** — Hamburger menu implemented with `mobileMenuOpen` state. ✅ Done.
- [x] **Contact terminal hints** — Terminal pre-loads `'help → see all commands'` in initial output. ✅ Done.
- [x] **Skills bars dropped** — Removed `level` percentages from skills data. Skills terminal now shows tools list only, no quantifiable self-ratings. ✅ Done.

## Polish

- [x] **Project tags deduplicated** — `tags` + `skills` merged into single `tags` array (unique values) per project; `skills` field removed. Filter logic updated to use `tags`. ✅ Done.
- [x] **OG image** — `opengraph-image.tsx` generates 1200×630 PNG via Next.js ImageResponse (no static file needed). Removed broken `/og-image.png` reference from layout. ✅ Done.
- [x] **GitHub stats widget** — `GitHubStats` component fetches live repos/stars/followers from GitHub API + embeds activity contribution graph. Added to About section. ✅ Done.

## New Suggestions

- [x] **Structured data (JSON-LD)** — `Person` schema added to `layout.tsx` (name, jobTitle, alumniOf, sameAs). ✅ Done.
- [x] **profile.jpg perf** — `<Image>` now has `priority` + `sizes="80px"` for WebP auto-conversion and no layout shift. ✅ Done.
- [ ] **Resume PDFs are small (97–100KB)** — Likely low-res or text-only. Verify they render cleanly at 100% zoom; recruiters open PDFs directly.
- [x] **404 page** — `src/app/not-found.tsx` added with terminal-style design and home link. ✅ Done.
- [x] **`robots.txt` / `sitemap.xml`** — `public/robots.txt` and `src/app/sitemap.ts` added. ✅ Done.

## New Findings (Jun 25 Audit)

- [x] **Command palette search wired up** — input filters section links + resume downloads by query; query cleared on close/Escape/section jump. ✅ Done.
- [x] **Contact section social links** — 4-card grid (email, LinkedIn, GitHub, location); LinkedIn and GitHub now actionable in the contact section. ✅ Done.
- [x] **Hero "Resume ↓" dropdown** — button now opens Full-Stack / Backend dropdown matching nav behavior. ✅ Done.
- [x] **GitHubStats error state** — `.catch` now sets `error` state; renders fallback with direct profile link instead of silent dashes. ✅ Done.
- [x] **Canvas touch support** — `touchmove`/`touchend` listeners added; mobile visitors get same repel physics as desktop. ✅ Done.
- [x] **`metadataBase` fixed** — now uses `VERCEL_URL` env var (`https://${VERCEL_URL}`) with localhost fallback; works correctly on Vercel without a custom domain. ✅ Done.

## Already Good (Keep)

- Cursor-repelling name animation — genuinely memorable
- Particle canvas with mouse repulsion — polished
- Git timeline — unique differentiator
- Command palette (⌘K) — clever hacker touch
- Project expand/collapse with per-column layout — works well
- OG metadata in `layout.tsx` (title, description, twitter card) — done; just needs the actual PNG
