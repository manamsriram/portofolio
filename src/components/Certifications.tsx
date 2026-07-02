import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Cert {
  status: 'Completed' | 'In Progress'
  issuer: string
  title: string
  description: string
  link?: string
}

const certs: Cert[] = [
  {
    status: 'Completed',
    issuer: 'Wells Fargo / Forage',
    title: 'Software Engineering Virtual Experience',
    description:
      'Built a system requirements document and object model diagram for a portfolio management system, and set up a Kafka messaging system for data processing.',
    link: 'https://www.theforage.com/completion-certificates/nkmk7gJitYs4TBvoA/9Wvq4L2WCFQDyyPp3_nkmk7gJitYs4TBvoA_6994b6eaf08021556e51fd39_1771871939738_completion_certificate.pdf',
  },
  {
    status: 'Completed',
    issuer: 'SmartInterviews',
    title: 'DSA & Problem Solving Certificate',
    description:
      'Data structures and algorithms, competitive programming, and systematic problem-solving for technical interviews.',
    link: 'https://smartinterviews.in/certificate/84411827',
  },
  {
    status: 'In Progress',
    issuer: 'IBM / Coursera',
    title: 'Backend Development Professional Certificate',
    description:
      'Backend engineering fundamentals, REST APIs, microservices, containers, and cloud-native development with Python and Node.js.',
  },
  {
    status: 'In Progress',
    issuer: 'Microsoft',
    title: 'AI-200 Certification',
    description:
      'Azure AI solutions: designing and implementing AI workloads, computer vision, NLP, and conversational AI on Azure.',
  },
  {
    status: 'In Progress',
    issuer: 'GitHub',
    title: 'GitHub Copilot Certification',
    description:
      'AI-assisted development workflows, prompt engineering for code generation, and responsible Copilot use in enterprise environments.',
  },
]

export function Certifications() {
  return (
    <section id="certs" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">// certifications</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl mt-3">Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group bg-terminal border border-dashed border-[#a78bfa]/50 rounded-lg p-6 hover:border-[#a78bfa] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(167,139,250,0.15)] transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={cn(
                    'font-mono text-xs px-2 py-0.5 rounded',
                    c.status === 'Completed'
                      ? 'text-[#a78bfa] bg-[#a78bfa]/10'
                      : 'text-[#f59e0b] bg-[#f59e0b]/10',
                  )}
                >
                  {c.status}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{c.issuer}</span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 font-mono text-xs text-accent hover:text-primary transition-colors"
                >
                  View Certificate →
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
