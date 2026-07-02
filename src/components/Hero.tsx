import { motion } from 'framer-motion'
import { useState } from 'react'
import { ParticleBackground } from './ParticleBackground'
import { LiveClock } from './LiveClock'
import { TerminalCard } from './TerminalCard'
import { TypedText } from './TypedText'

const TERMINAL_PHRASES = [
  'Building distributed systems that stay correct under failure',
  'Optimizing backend performance...',
  'Designing scalable architectures...',
  'Engineering cloud solutions...',
  'Mastering software-defined networking...',
]

export function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex justify-center"
        >
          <LiveClock />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="font-display text-[16vw] md:text-[9vw] leading-[0.95] tracking-tight"
        >
          <span className="text-foreground">Sri Ram </span>
          <span className="text-accent italic">Mannam</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-4 md:mt-6 font-mono text-sm md:text-base text-muted-foreground tracking-wide"
        >
          Graduate Software Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="mt-10 md:mt-12 max-w-2xl mx-auto text-left"
        >
          <TerminalCard>
            <span className="text-primary">$ </span>
            <TypedText texts={TERMINAL_PHRASES} />
          </TerminalCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="font-mono text-sm px-5 py-2.5 border border-accent/60 text-accent hover:bg-accent/10 transition-colors rounded"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="font-mono text-sm px-5 py-2.5 border border-accent/60 text-accent hover:bg-accent/10 transition-colors rounded"
          >
            Get In Touch
          </button>
          <div className="relative">
            <button
              onClick={() => setResumeOpen((o) => !o)}
              onBlur={() => setTimeout(() => setResumeOpen(false), 150)}
              className="font-mono text-sm px-5 py-2.5 border border-primary/60 text-primary hover:bg-primary/10 transition-colors rounded"
            >
              Resume ↓
            </button>
            {resumeOpen && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-44 border border-terminal bg-terminal rounded shadow-lg overflow-hidden z-20">
                <a
                  href={`${import.meta.env.BASE_URL}resume-fullstack.pdf`}
                  download
                  className="block px-4 py-2 text-sm font-mono text-foreground/90 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  Full-Stack
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}resume-backend.pdf`}
                  download
                  className="block px-4 py-2 text-sm font-mono text-foreground/90 hover:bg-primary/10 hover:text-primary transition-colors border-t border-terminal"
                >
                  Backend
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
      >
        ↓
      </motion.div>
    </section>
  )
}
