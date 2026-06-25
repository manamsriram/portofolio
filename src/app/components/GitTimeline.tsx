'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineItems, TimelineItem } from '../data/timeline';

type HoverState = {
  item: TimelineItem;
  x: number;
  y: number;
} | null;

const STATUS_DOT_COLORS: Record<string, string> = {
  active:      'bg-terminal-green border-terminal-green',
  graduated:   'bg-electric-cyan border-electric-cyan',
  started:     'bg-electric-cyan/40 border-electric-cyan',
  completed:   'bg-accent-purple border-accent-purple',
  contributed: 'bg-warning-amber border-warning-amber',
  'in-progress': 'bg-warning-amber/40 border-warning-amber',
};

const STATUS_TEXT_COLORS: Record<string, string> = {
  active:      'text-terminal-green',
  graduated:   'text-electric-cyan',
  started:     'text-electric-cyan',
  completed:   'text-accent-purple',
  contributed: 'text-warning-amber',
  'in-progress': 'text-warning-amber',
};

const STATUS_LABELS: Record<string, string> = {
  active:      'ACTIVE ●',
  graduated:   'GRADUATED',
  started:     'STARTED',
  completed:   'COMPLETED',
  contributed: 'CONTRIBUTED',
  'in-progress': 'IN PROGRESS',
};

const TRACKS = ['education', 'experience', 'project'] as const;

function Node({
  item,
  onMouseEnter,
  onMouseLeave,
}: {
  item: TimelineItem;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}) {
  const dotColor = STATUS_DOT_COLORS[item.status ?? 'completed'] ?? 'bg-surface-lighter border-surface-lighter';
  return (
    <motion.div
      className={`w-3 h-3 rounded-full border-2 cursor-pointer mx-auto ${dotColor}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.6 }}
      transition={{ duration: 0.1 }}
    />
  );
}

function TrackCell({
  items,
  onNodeEnter,
  onNodeLeave,
}: {
  items: TimelineItem[];
  onNodeEnter: (e: React.MouseEvent<HTMLDivElement>, item: TimelineItem) => void;
  onNodeLeave: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center min-h-[48px]">
      {/* vertical track line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-surface-lighter" />
      {/* nodes */}
      <div className="relative z-10 flex flex-col gap-2 py-3">
        {items.map((item) => (
          <Node
            key={item.id}
            item={item}
            onMouseEnter={(e) => onNodeEnter(e, item)}
            onMouseLeave={onNodeLeave}
          />
        ))}
        {items.length === 0 && <div className="w-3 h-3" />}
      </div>
    </div>
  );
}

function HoverCard({ hovered }: { hovered: NonNullable<HoverState> }) {
  const { item, x, y } = hovered;
  const CARD_WIDTH = 304;
  const left =
    typeof window !== 'undefined' && x + CARD_WIDTH > window.innerWidth - 16
      ? x - CARD_WIDTH - 28
      : x;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      className="fixed z-50 bg-surface border border-surface-lighter rounded-lg p-4 shadow-2xl pointer-events-none"
      style={{ left, top: y, width: CARD_WIDTH }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-semibold text-text-primary font-mono-display leading-snug">
          {item.title}
        </h4>
        {item.status && (
          <span className={`text-xs font-mono-display whitespace-nowrap shrink-0 ${STATUS_TEXT_COLORS[item.status] ?? 'text-text-secondary'}`}>
            {STATUS_LABELS[item.status] ?? item.status}
          </span>
        )}
      </div>

      <p className="text-xs text-text-secondary mb-3 line-clamp-3 leading-relaxed">
        {item.description}
      </p>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-1.5 py-0.5 bg-surface-light rounded text-text-secondary font-mono-display"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-surface-lighter">
        {item.dateRange && (
          <span className="text-xs text-text-secondary font-mono-display">{item.dateRange}</span>
        )}
        {item.link && (
          <span className="text-xs text-electric-cyan font-mono-display">View GitHub →</span>
        )}
      </div>
    </motion.div>
  );
}

export default function GitTimeline() {
  const [hovered, setHovered] = useState<HoverState>(null);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const visibleItems = timelineItems.filter((i) => i.visible);
  const years = [...new Set(visibleItems.flatMap((i) => i.years))].sort((a, b) => b - a);

  const handleNodeEnter = (e: React.MouseEvent<HTMLDivElement>, item: TimelineItem) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHovered({ item, x: rect.right + 12, y: rect.top - 8 });
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="grid grid-cols-[64px_1fr_1fr_1fr] gap-2 mb-2 px-2">
        <div />
        {TRACKS.map((track) => (
          <div
            key={track}
            className="text-xs text-text-secondary font-mono-display uppercase tracking-widest text-center"
          >
            {track}
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="border-t border-surface-lighter mb-1" />

      {/* Year rows */}
      {years.map((year) => {
        const yearItems = visibleItems.filter((i) => i.years.includes(year));
        return (
          <div key={year} className="grid grid-cols-[64px_1fr_1fr_1fr] gap-2 px-2">
            {/* Year label */}
            <div className="flex items-start pt-4">
              <span className="text-sm font-mono-display text-text-secondary">{year}</span>
            </div>
            {/* Track cells */}
            {TRACKS.map((track) => (
              <TrackCell
                key={track}
                items={yearItems.filter((i) => i.track === track)}
                onNodeEnter={handleNodeEnter}
                onNodeLeave={() => setHovered(null)}
              />
            ))}
          </div>
        );
      })}

      {/* Hover card portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {hovered && <HoverCard key={hovered.item.id} hovered={hovered} />}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
