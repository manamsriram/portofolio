# Timeline Redesign — Git-Graph Style Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat vertical timeline in `page.tsx` with a three-track git-graph layout (Education | Experience | Projects) grouped by year, with hover-triggered detail cards rendered via React portal.

**Architecture:** A `timelineItems` data array with `years: number[]` drives two new files: `src/app/data/timeline.ts` (types + data) and `src/app/components/GitTimeline.tsx` (layout + hover card). Page.tsx imports `<GitTimeline />` and removes the old `timeline` array and JSX.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, framer-motion (already installed), `react-dom/client` createPortal.

## Global Constraints

- No new npm dependencies — framer-motion and react-dom already available
- All Tailwind classes must use tokens already defined in the project (`text-terminal-green`, `text-electric-cyan`, `text-warning-amber`, `text-accent-purple`, `bg-surface`, `bg-surface-light`, `border-surface-lighter`, `font-mono-display`)
- `'use client'` directive required on any file using hooks or event handlers
- Hover card: desktop only — no touch/tap handlers

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/data/timeline.ts` | Create | `TimelineItem` type + `timelineItems` array |
| `src/app/components/GitTimeline.tsx` | Create | Year rows, track columns, nodes, hover card portal |
| `src/app/page.tsx` | Modify | Remove old `timeline` array + JSX; add `<GitTimeline />` import |

---

### Task 1: Create timeline data file

**Files:**
- Create: `src/app/data/timeline.ts`

**Interfaces:**
- Produces: `TimelineItem` type, `timelineItems: TimelineItem[]` consumed by Task 2

- [ ] **Step 1: Create the file**

```ts
// src/app/data/timeline.ts

export type TimelineItem = {
  id: string;
  years: number[];
  track: 'education' | 'experience' | 'project';
  title: string;
  description: string;
  tags?: string[];
  status?: 'active' | 'completed' | 'contributed' | 'in-progress' | 'graduated' | 'started';
  dateRange?: string;
  link?: string;
  visible: boolean;
};

export const timelineItems: TimelineItem[] = [
  // ── Education ──────────────────────────────────────────────────────
  {
    id: 'btech-start',
    years: [2020],
    track: 'education',
    title: 'B.Tech IT · Started',
    description: 'Prasad V. Potluri Siddhartha Institute of Technology · Vijayawada, India.',
    status: 'started',
    dateRange: '2020 – May 2024',
    visible: true,
  },
  {
    id: 'btech-grad',
    years: [2024],
    track: 'education',
    title: 'B.Tech IT · Graduated',
    description: 'Prasad V. Potluri Siddhartha Institute of Technology · Vijayawada, India. Information Technology.',
    status: 'graduated',
    dateRange: 'May 2024',
    visible: true,
  },
  {
    id: 'ms-start',
    years: [2024],
    track: 'education',
    title: 'MS Software Engineering · Started',
    description: 'San Jose State University · San Jose, CA. Coursework: Enterprise Distributed Technologies, Engineering Software Systems, SDN, Virtualization, ML, Mobile Development.',
    status: 'started',
    dateRange: 'Aug 2024 – present',
    visible: true,
  },
  {
    id: 'ms-grad',
    years: [2026],
    track: 'education',
    title: 'MS Software Engineering · Graduated',
    description: 'San Jose State University · San Jose, CA.',
    status: 'graduated',
    dateRange: '2026',
    visible: true,
  },
  // ── Experience ─────────────────────────────────────────────────────
  {
    id: 'mentor-start',
    years: [2023],
    track: 'experience',
    title: 'Student Mentor · SmartInterviews',
    description: 'Ran 50+ code reviews and sprint-style practice cycles with 100+ students on data structures, algorithms, and backend topics.',
    status: 'started',
    dateRange: 'May 2023 – Mar 2024',
    visible: true,
  },
  {
    id: 'mentor-end',
    years: [2024],
    track: 'experience',
    title: 'Student Mentor · Ended',
    description: 'SmartInterviews · Wrote and presented curriculum on backend development, RESTful APIs, and scalable system design.',
    status: 'completed',
    dateRange: 'Mar 2024',
    visible: true,
  },
  // ── Projects ───────────────────────────────────────────────────────
  {
    id: 'edgerunner',
    years: [2024, 2026],
    track: 'project',
    title: 'EdgeRunner',
    description: 'Autonomous trading platform — FastAPI backend, React 19 dashboard, backtested quant strategies, 8-check risk gate, 241 offline pytest tests.',
    tags: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'PostgreSQL'],
    status: 'active',
    dateRange: 'Nov 2024 – present',
    link: 'https://github.com/manamsriram/EdgeRunner',
    visible: true,
  },
  {
    id: 'docsense',
    years: [2024, 2026],
    track: 'project',
    title: 'DocSense AI',
    description: 'Agentic RAG document platform — multi-stage retrieval with dense vectors, BM25, RRF fusion, cross-encoder reranking. Three-tier Redis cache, Corrective RAG loop.',
    tags: ['Python', 'Flask', 'Qdrant', 'Redis', 'Docker'],
    status: 'active',
    dateRange: 'Nov 2024 – present',
    link: 'https://github.com/manamsriram/DocSense-AI',
    visible: true,
  },
  {
    id: 'lessgo',
    years: [2025, 2026],
    track: 'project',
    title: 'LessGo – Campus Ridesharing',
    description: 'Full-stack ridesharing — 8 Node.js/TS microservices, SwiftUI iOS, live driver tracking, in-app chat, Stripe payments, 3-stage Python matching pipeline using graph embeddings and PostGIS.',
    tags: ['TypeScript', 'Swift/SwiftUI', 'Node.js', 'PostgreSQL'],
    status: 'completed',
    dateRange: '2025 – 2026',
    link: 'https://github.com/manamsriram/SJSU_Ridesharing',
    visible: true,
  },
  {
    id: 'pic-standard',
    years: [2026],
    track: 'project',
    title: 'PIC Standard',
    description: 'Open-source contributor — Dockerized HTTP bridge for agentic provenance services, audit-logging middleware, X-Request-ID tracing, version endpoints in PIC SDK.',
    tags: ['TypeScript', 'Python', 'Docker', 'Observability'],
    status: 'contributed',
    dateRange: 'Feb 2026 – present',
    link: 'https://github.com/manamsriram/pic-standard',
    visible: true,
  },
  {
    id: 'restaurant-finder',
    years: [2024],
    track: 'project',
    title: 'Restaurant Finder',
    description: 'Full-stack restaurant discovery — React 18 SPA + FastAPI/SQLAlchemy REST API, ZIP-code search, owner dashboards, JWT roles, GitHub Actions CI, AWS EC2/RDS.',
    tags: ['React 18', 'Python', 'FastAPI', 'MySQL', 'AWS'],
    status: 'completed',
    dateRange: '2024',
    link: 'https://github.com/manamsriram/Restaurant-Finder-Application',
    visible: true,
  },
  {
    id: 'distributed-doc',
    years: [2025],
    track: 'project',
    title: 'Distributed Document Editing',
    description: 'Real-time collaborative document editing system using distributed systems principles. SJSU CMPE 275 coursework.',
    tags: ['Java'],
    status: 'completed',
    dateRange: 'Sep – Oct 2025',
    link: 'https://github.com/manamsriram/Distributed_Document_Editing',
    visible: true,
  },
  {
    id: 'baby-hypervisor',
    years: [2025],
    track: 'project',
    title: 'baby_hypervisor',
    description: 'Hypervisor with basic operational capabilities built in C++ from scratch.',
    tags: ['C++', 'Systems'],
    status: 'in-progress',
    dateRange: 'Oct – Nov 2025',
    link: 'https://github.com/manamsriram/baby_hypervisor',
    visible: true,
  },
  {
    id: 'sdn-load-balancer',
    years: [2025],
    track: 'project',
    title: 'SDN Load Balancer',
    description: 'Load balancer using Software Defined Networks and Network Functions Virtualization. SJSU CMPE 275 coursework.',
    tags: ['Python', 'SDN', 'NFV'],
    status: 'completed',
    dateRange: 'Nov – Dec 2025',
    link: 'https://github.com/manamsriram/load_balancer',
    visible: true,
  },
  {
    id: 'smart-grocery',
    years: [2025],
    track: 'project',
    title: 'Smart Grocery Assistant',
    description: 'Cross-platform mobile app — React Native + Expo, Firebase Firestore real-time sync, pantry expiry tracking, recipe discovery from available ingredients.',
    tags: ['React Native', 'TypeScript', 'Expo', 'Firebase'],
    status: 'completed',
    dateRange: 'Oct 2025 – Feb 2026',
    link: 'https://github.com/manamsriram/Smart-Grocery-Assistant',
    visible: true,
  },
  {
    id: 'hiring-agent',
    years: [2026],
    track: 'project',
    title: 'Hiring Agent',
    description: 'AI agent to evaluate and score resumes. Python-based agentic workflow.',
    tags: ['Python', 'AI'],
    status: 'in-progress',
    dateRange: 'Jun 2026',
    link: 'https://github.com/manamsriram/hiring-agent',
    visible: true,
  },
  {
    id: 'solo-leveling',
    years: [2026],
    track: 'project',
    title: 'SoloLeveling',
    description: 'Personal task tracking application.',
    tags: ['TypeScript'],
    status: 'in-progress',
    dateRange: 'Jun 2026',
    link: 'https://github.com/manamsriram/SoloLeveling',
    visible: false,
  },
  {
    id: 'hotel-mgmt',
    years: [2023],
    track: 'project',
    title: 'Hotel Management System',
    description: 'Fully functional hotel management website using JSP, HTML, CSS, JavaScript, and SQL.',
    tags: ['Java', 'JSP', 'SQL'],
    status: 'completed',
    dateRange: '2023',
    link: 'https://github.com/manamsriram/Hotel-management-system',
    visible: false,
  },
  {
    id: 'liver-predictor',
    years: [2023],
    track: 'project',
    title: 'Liver Disease Predictor',
    description: 'Supervised ML model predicting liver disease likelihood from chemical body composition data.',
    tags: ['Python', 'ML', 'Jupyter'],
    status: 'completed',
    dateRange: 'Nov 2023',
    link: 'https://github.com/manamsriram/Liver-Disease-Predictor',
    visible: false,
  },
  {
    id: 'image-style-transfer',
    years: [2024],
    track: 'project',
    title: 'Image Style Transfer',
    description: 'Neural style transfer implementation exploring improvements over existing approaches.',
    tags: ['Python', 'ML', 'Jupyter'],
    status: 'completed',
    dateRange: 'Nov 2024',
    link: 'https://github.com/manamsriram/Image_Style_Transfer',
    visible: false,
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/sriram/Documents/GitHub/portofolio && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors related to `timeline.ts`

- [ ] **Step 3: Commit**

```bash
git add src/app/data/timeline.ts
git commit -m "feat(timeline): add TimelineItem type and timelineItems data array"
```

---

### Task 2: Build GitTimeline component (layout + nodes)

**Files:**
- Create: `src/app/components/GitTimeline.tsx`

**Interfaces:**
- Consumes: `TimelineItem`, `timelineItems` from `../data/timeline`
- Produces: `<GitTimeline />` default export consumed by Task 4

- [ ] **Step 1: Create the component file**

```tsx
// src/app/components/GitTimeline.tsx
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
type Track = typeof TRACKS[number];

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
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
cd /Users/sriram/Documents/GitHub/portofolio && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/GitTimeline.tsx
git commit -m "feat(timeline): add GitTimeline component with year rows, track columns, hover card"
```

---

### Task 3: Wire GitTimeline into page.tsx

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `<GitTimeline />` from `./components/GitTimeline`
- The old `timeline` array (lines 253–290 in page.tsx) and its JSX block (lines 661–705) get removed

- [ ] **Step 1: Add import at top of page.tsx** (after existing imports, line ~5)

```tsx
import GitTimeline from './components/GitTimeline';
```

- [ ] **Step 2: Remove old `timeline` array**

Delete lines 253–290 in `page.tsx` — the entire `const timeline = [...]` block:

```ts
// DELETE THIS ENTIRE BLOCK:
const timeline = [
  {
    year: '2026',
    title: 'Project: EdgeRunner',
    ...
  },
  ...
  {
    year: '2020–2024',
    title: 'B.Tech Information Technology',
    ...
  }
];
```

- [ ] **Step 3: Replace old timeline JSX with `<GitTimeline />`**

Find the timeline JSX block (starts with `{/* Timeline */}`, around line 661). Replace the entire `<motion.div>` block that renders the old flat timeline:

```tsx
// REPLACE:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="mt-16"
>
  <h3 className="text-2xl font-semibold text-text-primary mb-8 font-mono-display">
    Career Timeline
  </h3>
  <div className="relative border-l-2 border-surface-lighter ml-4 space-y-8">
    {timeline.map((item, index) => (
      ...all the old JSX...
    ))}
  </div>
</motion.div>

// WITH:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="mt-16"
>
  <h3 className="text-2xl font-semibold text-text-primary mb-8 font-mono-display">
    Career Timeline
  </h3>
  <GitTimeline />
</motion.div>
```

- [ ] **Step 4: Verify TypeScript compiles clean**

```bash
cd /Users/sriram/Documents/GitHub/portofolio && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors

- [ ] **Step 5: Start dev server and visual check**

```bash
cd /Users/sriram/Documents/GitHub/portofolio && npm run dev
```

Open http://localhost:3000, scroll to "Career Timeline". Verify:
- Three columns with headers: education | experience | project
- Year labels 2026 down to 2020 on the left
- Colored dots appear at correct year/track intersections
- Hovering a dot shows the detail card with title, description, tags, date range
- Card flips side when near right viewport edge
- No console errors

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(timeline): wire GitTimeline into page, remove old flat timeline"
```

---

## Self-Review

**Spec coverage:**
- ✅ Three-track git-graph layout (Education | Experience | Projects)
- ✅ Year-based grouping, newest first
- ✅ Education split across years (btech-start 2020, btech-grad + ms-start 2024, ms-grad 2026)
- ✅ Multi-year items appear in both years (edgerunner: [2024, 2026], docsense: [2024, 2026], lessgo: [2025, 2026])
- ✅ `visible: boolean` flag — items with `visible: false` filtered at render time
- ✅ Hover card: portal-rendered, 200ms fade, positioned right of node, flips left near edge
- ✅ Hover only (no tap handler)
- ✅ GitHub link in hover card
- ✅ Status badge with color matching track palette
- ✅ All GitHub repos included, featured ones visible, coursework/personal visible, old undergrad projects hidden

**Placeholder scan:** None found.

**Type consistency:**
- `TimelineItem` defined in Task 1, imported in Task 2 ✅
- `HoverState` uses `TimelineItem` ✅
- `TRACKS` constant used in both header and TrackCell iteration ✅
- `STATUS_DOT_COLORS`, `STATUS_TEXT_COLORS`, `STATUS_LABELS` keyed by `item.status` ✅
