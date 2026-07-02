import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineItems, type TimelineItem, type TimelineStatus } from '@/data/timeline'
import { cn } from '@/lib/utils'

type HoverState = { item: TimelineItem; x: number; y: number } | null

const STATUS_DOT: Record<TimelineStatus, string> = {
  active: 'bg-primary border-primary',
  graduated: 'bg-accent border-accent',
  started: 'bg-accent/40 border-accent',
  completed: 'bg-[#a78bfa] border-[#a78bfa]',
  contributed: 'bg-[#f59e0b] border-[#f59e0b]',
  'in-progress': 'bg-[#f59e0b]/40 border-[#f59e0b]',
}

const STATUS_TEXT: Record<TimelineStatus, string> = {
  active: 'text-primary',
  graduated: 'text-accent',
  started: 'text-accent',
  completed: 'text-[#a78bfa]',
  contributed: 'text-[#f59e0b]',
  'in-progress': 'text-[#f59e0b]',
}

const STATUS_LABEL: Record<TimelineStatus, string> = {
  active: 'ACTIVE ●',
  graduated: 'GRADUATED',
  started: 'STARTED',
  completed: 'COMPLETED',
  contributed: 'CONTRIBUTED',
  'in-progress': 'IN PROGRESS',
}

const TRACKS = ['education', 'experience', 'project'] as const
const TRACK_COLORS: Record<(typeof TRACKS)[number], string> = {
  education: 'text-accent',
  experience: 'text-primary',
  project: 'text-[#a78bfa]',
}

function Node({
  item,
  onEnter,
  onLeave,
}: {
  item: TimelineItem
  onEnter: (e: React.MouseEvent<HTMLDivElement>) => void
  onLeave: () => void
}) {
  const dot = item.status ? STATUS_DOT[item.status] : 'bg-muted border-muted'
  return (
    <motion.div
      className={cn('w-3 h-3 rounded-full border-2 cursor-pointer mx-auto', dot)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.6 }}
      transition={{ duration: 0.1 }}
    />
  )
}

function HoverCard({
  hovered,
  onMouseEnter,
  onMouseLeave,
}: {
  hovered: NonNullable<HoverState>
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const { item, x, y } = hovered
  const W = 304
  const left = typeof window !== 'undefined' && x + W > window.innerWidth - 16 ? x - W - 28 : x
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      className="fixed z-50 bg-card border border-terminal rounded-lg p-4 shadow-2xl"
      style={{ left, top: y, width: W }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-semibold text-foreground font-mono leading-snug">{item.title}</h4>
        {item.status && (
          <span className={cn('text-xs font-mono whitespace-nowrap shrink-0', STATUS_TEXT[item.status])}>
            {STATUS_LABEL[item.status]}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.map((t) => (
            <span key={t} className="text-xs px-1.5 py-0.5 bg-secondary rounded text-muted-foreground font-mono">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between pt-2 border-t border-terminal">
        {item.dateRange && <span className="text-xs text-muted-foreground font-mono">{item.dateRange}</span>}
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:text-primary font-mono transition-colors">
            View GitHub →
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function Timeline() {
  const [hovered, setHovered] = useState<HoverState>(null)
  const [mounted, setMounted] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => setMounted(true), [])

  const visible = timelineItems.filter((i) => i.visible)
  const years = [...new Set(visible.flatMap((i) => i.years))].sort((a, b) => b - a)

  const cancelHide = () => hideTimer.current && clearTimeout(hideTimer.current)
  const scheduleHide = () => {
    cancelHide()
    hideTimer.current = setTimeout(() => setHovered(null), 120)
  }
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>, item: TimelineItem) => {
    cancelHide()
    const r = e.currentTarget.getBoundingClientRect()
    setHovered({ item, x: r.right + 12, y: r.top - 8 })
  }

  return (
    <section id="timeline" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">// timeline</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl mt-3">Career Timeline</h2>
          <p className="mt-4 text-sm text-muted-foreground font-mono">Hover any node to see details.</p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-[64px_1fr_1fr_1fr] gap-2 mb-2 px-2">
            <div />
            {TRACKS.map((t) => (
              <div key={t} className={cn('text-xs font-mono uppercase tracking-widest text-center', TRACK_COLORS[t])}>
                {t}
              </div>
            ))}
          </div>
          <div className="border-t border-terminal mb-1" />

          {(() => {
            const rows = years.map((year) => {
              const yearItems = visible.filter((i) => i.years.includes(year))
              return (
                <div key={year} className="grid grid-cols-[64px_1fr_1fr_1fr] gap-2 px-2 relative">
                  <div className="flex items-start pt-4">
                    <span className="text-sm font-mono text-muted-foreground">{year}</span>
                  </div>
                  {TRACKS.map((track) => {
                    const items = yearItems.filter((i) => i.track === track)
                    return (
                      <div key={track} className="relative flex flex-col items-center min-h-[48px]">
                        <div className="relative z-10 flex flex-col gap-2 py-3">
                          {items.map((item) => (
                            <Node
                              key={item.id}
                              item={item}
                              onEnter={(e) => handleEnter(e, item)}
                              onLeave={scheduleHide}
                            />
                          ))}
                          {items.length === 0 && <div className="w-3 h-3" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })
            return (
              <div className="relative">
                {/* Continuous vertical lines behind all rows */}
                <div className="absolute inset-0 grid grid-cols-[64px_1fr_1fr_1fr] gap-2 px-2 pointer-events-none">
                  <div />
                  {TRACKS.map((t) => (
                    <div key={t} className="relative">
                      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[hsl(var(--terminal-border))]" />
                    </div>
                  ))}
                </div>
                <div className="relative">{rows}</div>
              </div>
            )
          })()}
        </div>

        {mounted &&
          createPortal(
            <AnimatePresence>
              {hovered && (
                <HoverCard
                  key={hovered.item.id}
                  hovered={hovered}
                  onMouseEnter={cancelHide}
                  onMouseLeave={scheduleHide}
                />
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </section>
  )
}
