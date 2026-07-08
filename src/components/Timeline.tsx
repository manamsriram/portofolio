import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineItems, type TimelineItem, type TimelineStatus } from '@/data/timeline'
import { cn } from '@/lib/utils'
import { GitGraphSvg } from '@/components/timeline/GitGraphSvg'
import { buildGraphLayout, formatDateRange, hashId } from '@/lib/timelineGraph'

type HoverState = { item: TimelineItem; x: number; y: number } | null

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

const TRACK_COLORS: Record<TimelineItem['track'], string> = {
  education: 'text-accent',
  experience: 'text-primary',
  project: 'text-[#a78bfa]',
}

const LEGEND: { track: TimelineItem['track']; label: string; dot: string }[] = [
  { track: 'education', label: 'education', dot: 'bg-accent' },
  { track: 'experience', label: 'experience', dot: 'bg-primary' },
  { track: 'project', label: 'project', dot: 'bg-[#a78bfa]' },
]

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
        <span className="text-xs text-muted-foreground font-mono">{formatDateRange(item)}</span>
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
  const layout = buildGraphLayout(visible)

  const cancelHide = () => hideTimer.current && clearTimeout(hideTimer.current)
  const scheduleHide = () => {
    cancelHide()
    hideTimer.current = setTimeout(() => setHovered(null), 120)
  }
  const handleEnter = (e: React.MouseEvent<SVGCircleElement>, item: TimelineItem) => {
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
          <div className="flex items-center gap-4 mt-4">
            {LEGEND.map((l) => (
              <div key={l.track} className="flex items-center gap-1.5">
                <span className={cn('w-2 h-2 rounded-full', l.dot)} />
                <span className={cn('text-xs font-mono uppercase tracking-widest', TRACK_COLORS[l.track])}>{l.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="overflow-x-auto">
          <div className="flex min-w-fit">
            <GitGraphSvg layout={layout} onEnter={handleEnter} onLeave={scheduleHide} />
            <div className="flex-1 min-w-0">
              {layout.rows.map((row) => (
                <div
                  key={row.row}
                  className="flex flex-col justify-center gap-1 px-3 border-b border-terminal/40 last:border-b-0"
                  style={{ height: row.height }}
                >
                  {row.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4">
                      <div className="min-w-0 flex items-baseline gap-2">
                        <span className={cn('font-mono text-xs shrink-0', TRACK_COLORS[item.track])}>{item.track}:</span>
                        <span className="font-mono text-sm text-foreground truncate">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 font-mono text-xs text-muted-foreground">
                        <span className="text-muted-foreground/70">{hashId(item.id)}</span>
                        {item.status && (
                          <span className={cn('whitespace-nowrap', STATUS_TEXT[item.status])}>{STATUS_LABEL[item.status]}</span>
                        )}
                        <span className="whitespace-nowrap">{formatDateRange(item)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
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
