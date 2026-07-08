import { motion } from 'framer-motion'
import type { TimelineItem, TimelineStatus } from '@/data/timeline'
import { DOT_R, TRUNK_X, type GraphLayout } from '@/lib/timelineGraph'

const TRACK_STROKE: Record<TimelineItem['track'], string> = {
  education: 'hsl(var(--accent))',
  experience: 'hsl(var(--primary))',
  project: '#a78bfa',
}

// dot fill follows the branch's track color (matches the line); status only dims
// still-open/just-started dots so a filled-in dot reads as "settled" at a glance.
const FADED_STATUS = new Set<TimelineStatus>(['started', 'in-progress'])

export function GitGraphSvg({
  layout,
  onEnter,
  onLeave,
}: {
  layout: GraphLayout
  onEnter: (e: React.MouseEvent<SVGCircleElement>, item: TimelineItem) => void
  onLeave: () => void
}) {
  const { branches, totalHeight, graphWidth } = layout

  return (
    <svg
      width={graphWidth}
      height={totalHeight}
      viewBox={`0 0 ${graphWidth} ${totalHeight}`}
      className="shrink-0"
    >
      <motion.line
        x1={TRUNK_X}
        y1={0}
        x2={TRUNK_X}
        y2={totalHeight}
        stroke="hsl(var(--terminal-border))"
        strokeWidth={2.5}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {branches.map(({ id, track, divergePath, laneLinePath, closePath, dots, isOpen }) => {
        const stroke = TRACK_STROKE[track]
        const tipRow = Math.min(...dots.map((d) => d.row))
        const delay = 0.1 + tipRow * 0.02

        return (
          <g key={id}>
            <motion.path
              d={divergePath}
              stroke={stroke}
              strokeWidth={2}
              strokeOpacity={0.65}
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay }}
            />
            {laneLinePath && (
              <motion.path
                d={laneLinePath}
                stroke={stroke}
                strokeWidth={2}
                strokeOpacity={0.65}
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: delay + 0.05 }}
              />
            )}
            {closePath && (
              <motion.path
                d={closePath}
                stroke={stroke}
                strokeWidth={2}
                strokeOpacity={0.65}
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: delay + 0.1 }}
              />
            )}

            {dots.map((d) => {
              const fill = { color: stroke, opacity: d.item.status && FADED_STATUS.has(d.item.status) ? 0.4 : 1 }
              const isTip = d.row === tipRow
              return (
                <g key={`${d.item.id}-${d.row}`}>
                  {isOpen && isTip && (
                    <motion.circle
                      cx={d.cx}
                      cy={d.cy}
                      r={DOT_R}
                      fill="none"
                      stroke={fill.color}
                      strokeWidth={1.5}
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                      style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
                    />
                  )}
                  <motion.circle
                    cx={d.cx}
                    cy={d.cy}
                    r={DOT_R}
                    fill={fill.color}
                    fillOpacity={fill.opacity}
                    stroke={fill.color}
                    strokeWidth={2}
                    className="cursor-pointer"
                    onMouseEnter={(e) => onEnter(e, d.item)}
                    onMouseLeave={onLeave}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.15, delay: delay + 0.15 }}
                    style={{ transformOrigin: `${d.cx}px ${d.cy}px` }}
                  />
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}
