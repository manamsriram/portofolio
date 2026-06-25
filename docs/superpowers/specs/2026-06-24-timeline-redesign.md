# Timeline Redesign — Git-Graph Style

## Overview

Replace flat vertical timeline with a three-track git-graph layout. Tracks: Education, Experience, Projects. Year labels on left axis. Hover over any node → detail card.

## Data Model

```ts
type TimelineItem = {
  id: string;
  year: number[];          // multi-year items appear in each listed year
  track: 'education' | 'experience' | 'project';
  title: string;
  description: string;
  tags?: string[];
  status?: 'active' | 'completed' | 'contributed' | 'in-progress' | 'graduated' | 'started';
  dateRange?: string;      // human-readable e.g. "Nov 2024 – present"
  link?: string;
  visible: boolean;        // toggle to hide/show without deleting
};
```

Multi-year items: an item with `year: [2024, 2026]` renders a node in both year rows. Hover card shows full date range.

## Layout

- Left column: year labels (2020–2026), descending (newest first)
- Three track columns: Education | Experience | Projects
- Each track has a vertical connecting line
- Nodes (●) appear at the correct year row on their track
- Year rows have fixed height; multiple nodes in same year/track stack vertically

## Hover Card

- Trigger: `onMouseEnter` / `onMouseLeave` (desktop only; no tap handler)
- Positioning: rendered in a portal, anchored to node, shifts left if near right edge
- Content: title, description (max 3 lines), tags row, status badge, date range, GitHub link if present
- Style: matches existing `tech-border` card aesthetic — dark bg, monospace font, `electric-cyan` accents
- Animation: 200ms fade + 4px slide via framer-motion

## Repo Visibility

Each `TimelineItem` has `visible: boolean`. Items with `visible: false` are filtered out at render time. No UI toggle — edit the data array to change.

GitHub repos included (visible: true by default for featured work):
- EdgeRunner, DocSense AI, LessGo/SJSU_Ridesharing, PIC Standard, Restaurant Finder, Smart Grocery Assistant
- baby_hypervisor, SDN load_balancer, Distributed_Document_Editing (visible: true, coursework)
- hiring-agent, SoloLeveling (visible: true, personal tools)
- Others (Hotel-management-system, Liver-Disease-Predictor, forage-midas, wells-fargo-task-2, cmpe*, mini*, video_encoding): visible: false by default

## Education Split

| Year | Entry |
|------|-------|
| 2020 | B.Tech IT started |
| 2024 | B.Tech IT graduated (May), MS SWE started (Aug) |
| 2026 | MS SWE graduated |

## Implementation Scope

- Add `timelineItems` data array replacing current `timeline` array
- Add `GitTimeline` component (inline in page.tsx or extracted to `src/app/components/GitTimeline.tsx`)
- Add `HoverCard` rendered via React portal
- Remove old flat timeline JSX, insert `<GitTimeline>` in its place
- No new dependencies needed (framer-motion already installed)
