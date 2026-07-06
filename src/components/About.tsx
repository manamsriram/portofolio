import { motion } from 'framer-motion'
import { useState } from 'react'
const profileUrl = `${import.meta.env.BASE_URL}profile.jpg`
import { TerminalCard } from './TerminalCard'
import { GitHubStats } from './GitHubStats'
import { cn } from '@/lib/utils'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' as const },
}

const whatHeDoes = [
  'Ships 8+ service distributed systems with independent deployability and JWT auth',
  'Builds multi-stage RAG pipelines with corrective loops and page-level citations',
  'Wires CI/CD from GitHub Actions to AWS; writes tests that never flake on missing credentials',
  'Contributes to open-source agentic infrastructure — observability, audit logging, tracing',
]

const skillGroups: Record<string, string[]> = {
  devops: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS (EC2 / RDS / S3)', 'GCP', 'Vercel', 'Terraform'],
  backend: ['Python', 'FastAPI', 'Node.js', 'TypeScript', 'PostgreSQL', 'MySQL', 'Redis', 'Kafka'],
  'distributed-systems': ['Microservices', 'gRPC', 'Event-driven arch', 'PostGIS', 'Consensus & Consistency', 'Fault tolerance'],
  cloud: ['AWS', 'GCP', 'Supabase', 'Firebase', 'Qdrant', 'Serverless'],
  networking: ['REST', 'WebSockets', 'JWT / OAuth', 'Nginx', 'Load balancing', 'HTTP/2'],
}

function SkillGroup({ name, items }: { name: string; items: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-center gap-2 py-1.5 hover:text-primary transition-colors"
      >
        <span className="text-primary">$</span>
        <span className="text-foreground/90">{name}</span>
        <span className="text-accent">--list</span>
        <span className={cn('ml-auto text-muted-foreground transition-transform', open && 'rotate-90')}>›</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pl-6 pb-3 flex flex-wrap gap-2"
        >
          {items.map((s) => (
            <span key={s} className="text-xs px-2 py-1 border border-terminal rounded text-muted-foreground bg-black/30">
              {s}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="mb-12">
          <span className="font-mono text-xs text-primary tracking-widest uppercase">// about</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl mt-3">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 mb-20">
          <motion.div {...fadeInUp} className="flex lg:block justify-center">
            <div className="w-56 lg:w-full">
              <div className="relative">
                <img
                  src={profileUrl}
                  alt="Sri Ram Mannam"
                  className="w-full aspect-square object-cover rounded-lg border border-terminal"
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-primary/20 pointer-events-none" />
              </div>
              <p className="mt-4 font-mono text-sm text-foreground text-center lg:text-left">Sri Ram Mannam</p>
              <p className="font-mono text-xs text-muted-foreground text-center lg:text-left">
                MS Software Engineering · SJSU '26
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.15 }} className="space-y-5">
            <p className="text-base lg:text-lg text-foreground/80 leading-relaxed">
              Sri Ram started out on the frontend. On Restaurant Finder, he built the UI while pair programming with
              a friend on the APIs behind it, writing and testing the endpoints that fed his own screens, and that's
              where the backend caught his interest. That interest turned into something harder to shake once he hit
              a bug he couldn't explain: while building LessGo, a campus rideshare app, two microservices started
              returning different views of the same ride. No errors, no crashes, just two services quietly
              disagreeing on state. That gap between{' '}
              <em className="text-accent not-italic">"the code is correct"</em> and{' '}
              <em className="text-accent not-italic">"the system is correct"</em> is what he's been chasing ever since.
            </p>
            <p className="text-base lg:text-lg text-foreground/80 leading-relaxed">
              At SJSU he's focused on systems that have to stay correct under failure: a retrieval pipeline that
              re-queries when its own confidence is low, a trading engine that runs multiple checks before every
              position, and agentic middleware where a missed audit log is a security issue, not a logging bug. The
              pattern he keeps finding is that correctness is rarely a property of individual services. It's a
              property of how they fail together.
            </p>
            <p className="text-base lg:text-lg text-foreground/80 leading-relaxed">
              He has graduated from SJSU, with his Masters Degree in Software Engineering, in May 2026 and is looking for roles where the failure
              modes are interesting, the systems actually have to work, and there's room to keep pushing his
              understanding of distributed systems in production environments.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div {...fadeInUp}>
            <h3 className="font-mono text-sm text-primary mb-5">// what he does</h3>
            <ul className="space-y-3">
              {whatHeDoes.map((line) => (
                <li key={line} className="flex gap-3 text-foreground/85 leading-relaxed">
                  <span className="text-accent shrink-0 mt-1">▹</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.15 }}>
            <h3 className="font-mono text-sm text-primary mb-5">// technical expertise</h3>
            <TerminalCard label="skills-terminal">
              <div className="space-y-0.5">
                {Object.entries(skillGroups).map(([k, v]) => (
                  <SkillGroup key={k} name={k} items={v} />
                ))}
              </div>
            </TerminalCard>
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="mt-16">
          <h3 className="font-mono text-sm text-primary mb-5">// github activity</h3>
          <GitHubStats />
        </motion.div>
      </div>
    </section>
  )
}
