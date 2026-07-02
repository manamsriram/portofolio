import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { TerminalCard } from './TerminalCard'
import { LiveClock } from './LiveClock'

interface Line {
  cmd?: string
  out: string
}

const commands: Record<string, string[]> = {
  help: [
    'available commands:',
    '  help    → see all commands',
    '  email   → open mail client',
    '  about   → who is Sri Ram',
    '  social  → linkedin & github',
    '  clear   → reset terminal',
  ],
  email: ['opening mailto:sriram.mannam10@gmail.com …'],
  about: [
    'Sri Ram Mannam — MS Software Engineering, SJSU \'26.',
    'Distributed systems engineer. Chases correctness under failure.',
  ],
  social: [
    'linkedin.com/in/srirammannam',
    'github.com/manamsriram',
  ],
}

export function Contact() {
  const [lines, setLines] = useState<Line[]>([
    { out: 'welcome to sriram@portfolio ~' },
    { out: 'type a command to get started (try `help`)' },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return
    if (trimmed === 'clear') {
      setLines([])
      return
    }
    if (trimmed === 'email') {
      window.location.href = 'mailto:sriram.mannam10@gmail.com'
    }
    const out = commands[trimmed] ?? [`command not found: ${trimmed}`, 'try `help`']
    setLines((prev) => [...prev, { cmd: trimmed, out: '' }, ...out.map((o) => ({ out: o }))])
  }

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">// contact</span>
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl mt-3">
            Get in <span className="italic text-accent">touch</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Sri Ram is currently open to new grad and internship roles, as well as collaborations on distributed
            systems, RAG, and agentic infrastructure. Say hi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TerminalCard label="contact-terminal">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-terminal">
                <span className="text-xs text-muted-foreground">session · sriram@portfolio</span>
                <LiveClock />
              </div>
              <div ref={scrollRef} className="h-64 overflow-y-auto space-y-1 text-sm">
                {lines.map((l, i) => (
                  <div key={i}>
                    {l.cmd !== undefined ? (
                      <div>
                        <span className="text-primary">$ </span>
                        <span className="text-foreground">{l.cmd}</span>
                      </div>
                    ) : (
                      <div className="text-muted-foreground pl-0">{l.out}</div>
                    )}
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  run(input)
                  setInput('')
                }}
                className="mt-3 pt-3 border-t border-terminal flex items-center gap-2"
              >
                <span className="text-primary">$</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground font-mono text-sm"
                  placeholder="type help"
                  autoComplete="off"
                />
              </form>
            </TerminalCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { label: 'Email', value: 'sriram.mannam10@gmail.com', href: 'mailto:sriram.mannam10@gmail.com' },
              { label: 'LinkedIn', value: 'Sri Ram Mannam', href: 'https://linkedin.com/in/srirammannam' },
              { label: 'GitHub', value: 'manamsriram', href: 'https://github.com/manamsriram' },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group border border-terminal bg-terminal rounded-lg p-5 hover:border-primary/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="font-mono text-xs text-primary uppercase tracking-widest">{c.label}</p>
                  <p className="mt-1 text-foreground group-hover:text-accent transition-colors">{c.value}</p>
                </div>
                <span className="text-muted-foreground group-hover:text-accent transition-colors">↗</span>
              </a>
            ))}
            <div className="border border-terminal bg-terminal rounded-lg p-5">
              <p className="font-mono text-xs text-primary uppercase tracking-widest">Location</p>
              <p className="mt-1 text-foreground">San Jose, California</p>
              <p className="mt-1 text-xs text-muted-foreground">Open to relocation</p>
            </div>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-terminal flex flex-col md:flex-row justify-between items-center gap-3 font-mono text-xs text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Sri Ram Mannam · Built with care</p>
          <p>San Jose, CA · Available Spring 2026</p>
        </motion.footer>
      </div>
    </section>
  )
}
