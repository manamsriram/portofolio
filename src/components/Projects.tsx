import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface Project {
  title: string
  description: string
  tech: string[]
  categories: string[]
  live?: string
  code?: string
  demo?: string
  demoLabel?: string
  details: string[]
}

const projects: Project[] = [
  {
    title: 'LessGo — Campus Ridesharing',
    description:
      '8-service campus ridesharing platform — PostGIS geo-matching (5 km radius), SwiftUI live tracking, Stripe payments.',
    tech: ['TypeScript', 'Node.js', 'Python', 'SwiftUI', 'GCP', 'Docker', 'Stripe', 'Kubernetes'],
    categories: ['Distributed', 'Backend', 'Fullstack', 'Cloud', 'Mobile'],
    demo: 'https://www.youtube.com/watch?v=l79FVVxRbPU',
    demoLabel: 'Watch Demo',
    code: 'https://github.com/manamsriram/SJSU_Ridesharing',
    details: [
      '8 Node.js/Express microservices behind an API gateway — each independently deployable with JWT auth and per-route rate limiting',
      'Python matching pipeline: graph embeddings → PostGIS geo-filter (5 km / ±30 min) → cost function across detour, wait time, and ride history',
      'Live driver tracking and in-app chat on SwiftUI iOS client; Stripe handles the full payment flow',
    ],
  },
  {
    title: 'EdgeRunner',
    description:
      'Autonomous trading engine — 8-check risk gate, 15+ control endpoints, 241 offline pytest tests, zero-flake CI.',
    tech: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'PostgreSQL', 'pytest', 'CI/CD'],
    categories: ['Backend', 'Fullstack', 'DevOps', 'Ai', 'Cloud'],
    live: 'https://edge-runner-xi.vercel.app/',
    code: 'https://github.com/manamsriram/EdgeRunner',
    details: [
      '15+ endpoints for positions, approvals, kill-switch controls, and live performance charts — humans stay in the loop',
      '8-check risk gate runs before every trade; idempotent execution logs track Sharpe ratio, max drawdown, and win rate',
      '241 pytest tests pass entirely offline — no API keys or network required, so CI never flakes on missing credentials',
    ],
  },
  {
    title: 'Restaurant Finder',
    description:
      'React 18 + FastAPI restaurant finder — ~50% faster search via index tuning, GitHub Actions → AWS EC2/RDS.',
    tech: ['React 18', 'Python', 'FastAPI', 'MySQL', 'AWS', 'CI/CD', 'Google Maps API'],
    categories: ['Fullstack', 'Backend', 'Cloud', 'DevOps'],
    live: 'https://restaurant-finder-application.vercel.app/',
    code: 'https://github.com/manamsriram/Restaurant-Finder-Application',
    details: [
      'Led front-back integration for a 4-person Agile team — defined API contracts, ran code reviews, kept both sides in sync',
      'ZIP-code search via Google Maps API; separate dashboards for restaurant owners and admins',
      'GitHub Actions runs pytest + integration tests on every push; green builds deploy straight to AWS EC2/RDS',
      'Reworked DB schemas and query indexes — cut search response time by ~50%',
    ],
  },
  {
    title: 'PIC Standard',
    description:
      'Open-source contributor — Docker HTTP bridge, audit-logging middleware, X-Request-ID tracing for agentic systems.',
    tech: ['TypeScript', 'Python', 'Docker', 'Observability', 'Security'],
    categories: ['Backend', 'DevOps'],
    code: 'https://github.com/pic-standard/pic-standard',
    details: [
      'Dockerized HTTP bridge for agentic provenance services — slimmer image builds, Python health checks, local setup just works',
      'Audit-logging middleware and X-Request-ID tracing cleanup tightened the security surface',
      'Version endpoints in the PIC SDK let downstream services know exactly which build handled a request',
    ],
  },
  {
    title: 'DocSense AI',
    description:
      'Agentic RAG chatbot — dense + BM25 fusion, corrective retrieval loop, Llama 3.3 70B with 3-tier Redis cache.',
    tech: ['Python', 'Flask', 'Qdrant', 'Redis', 'Docker', 'Supabase', 'LLM', 'RAG'],
    categories: ['Ai', 'Backend', 'Cloud', 'DevOps'],
    live: 'https://docsense-ai-7k4b.onrender.com/',
    code: 'https://github.com/manamsriram/DocSense-AI',
    details: [
      'Multi-stage retrieval: dense vectors + BM25, fused with RRF, reranked with a cross-encoder — citations link back to the exact page',
      'Corrective RAG loop re-queries when confidence is low; handles multi-hop questions that single-pass systems miss',
      'Three-tier Redis cache, per-user Qdrant collection isolation via Supabase JWT, vision captions for image-heavy PDFs',
    ],
  },
  {
    title: 'Smart Grocery Assistant',
    description:
      'React Native pantry tracker — real-time Firestore sync, expiry alerts, recipe suggestions, theme-aware UI.',
    tech: ['React Native', 'TypeScript', 'Expo', 'Firebase'],
    categories: ['Mobile', 'Fullstack', 'Cloud'],
    live: 'https://smart-grocery-assistant-chi.vercel.app/',
    code: 'https://github.com/manamsriram/Smart-Grocery-Assistant',
    details: [
      'Track pantry items with expiration dates; recipe suggestions based on what you actually have on hand',
      'Multiple shopping lists with real-time sync via Firebase Firestore; accounts through Firebase Auth',
      'Light, dark, and system theme support; Expo Router for navigation, React Context for global state',
    ],
  },
]

const filters = ['All', 'Backend', 'Fullstack', 'Distributed', 'Ai', 'Cloud', 'DevOps', 'Mobile']

export function Projects() {
  const [active, setActive] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.categories.includes(active))),
    [active],
  )

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 bg-radial-purple opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">// projects</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl mt-3">Featured Projects</h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                'font-mono text-xs px-3 py-1.5 rounded border transition-colors',
                active === f
                  ? 'bg-[#a78bfa] text-background border-[#a78bfa]'
                  : 'border-terminal text-muted-foreground hover:text-foreground hover:border-[#a78bfa]/40',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group h-full flex flex-col border border-terminal bg-terminal rounded-lg overflow-hidden hover:border-[#a78bfa]/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(167,139,250,0.15)] transition-all"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl md:text-2xl font-light text-foreground group-hover:text-[#a78bfa] transition-colors">
                      {p.title}
                    </h3>
                    <div className="w-3 h-3 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 border border-accent/30 rounded text-accent bg-accent/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-terminal flex items-center justify-between flex-wrap gap-3">
                    <button
                      onClick={() => setExpanded(expanded === p.title ? null : p.title)}
                      className="font-mono text-xs text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
                    >
                      {expanded === p.title ? 'Show Less' : 'Learn More'}
                    </button>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/70">
                          Live Demo →
                        </a>
                      )}
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/70">
                          {p.demoLabel ?? 'Watch Demo'} →
                        </a>
                      )}
                      {p.code && (
                        <a href={p.code} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary">
                          View Code →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {expanded === p.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 border-t border-terminal pt-4"
                    >
                      <ul className="space-y-2">
                        {p.details.map((d, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                            <span className="text-accent mt-0.5 shrink-0">▹</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
