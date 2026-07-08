import type { TimelineItem, TimelineStatus } from '@/data/timeline'

export const ROW_HEIGHT = 72
export const GROUP_ROW_EXTRA = 16
export const HEADROOM = ROW_HEIGHT / 2
export const LANE_PITCH = 18
export const PAD_LEFT = 14
export const DOT_R = 6
export const TRUNK_X = PAD_LEFT
export const MAIN_BRANCH = 'main'
export const GAP_PER_MONTH = 4
export const GAP_MAX = 48

const OPEN = new Set<TimelineStatus>(['active', 'in-progress', 'started'])

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "YYYY-MM" -> absolute month index */
export function monthIdx(ym: string): number {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}

export function formatMonth(idx: number): string {
  const y = Math.floor(idx / 12)
  const m = ((idx % 12) + 12) % 12
  return `${MONTHS[m]} ${y}`
}

function isOpenItem(item: TimelineItem): boolean {
  return item.status ? OPEN.has(item.status) && !item.end : false
}

export function formatDateRange(item: TimelineItem): string {
  const startIdx = monthIdx(item.start)
  if (isOpenItem(item)) return `${formatMonth(startIdx)} – present`
  if (!item.end) return formatMonth(startIdx)
  const endIdx = monthIdx(item.end)
  if (endIdx === startIdx) return formatMonth(startIdx)
  return `${formatMonth(startIdx)} – ${formatMonth(endIdx)}`
}

function bezierS(x0: number, y0: number, x1: number, y1: number) {
  const my = (y0 + y1) / 2
  return `M ${x0},${y0} C ${x0},${my} ${x1},${my} ${x1},${y1}`
}

export function laneX(k: number) { return PAD_LEFT + k * LANE_PITCH }

export function hashId(id: string): string {
  let h = 5381
  for (let i = 0; i < id.length; i++) h = ((h * 33) ^ id.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(7, '0').slice(0, 7)
}

export type GraphRow = { items: TimelineItem[]; row: number; height: number }

export type GraphBranch = {
  id: string
  track: TimelineItem['track']
  laneIndex: number
  divergePath: string
  laneLinePath: string | null
  closePath: string | null
  dots: { row: number; cx: number; cy: number; item: TimelineItem }[]
  isOpen: boolean
}

export type GraphLayout = {
  rows: GraphRow[]
  branches: GraphBranch[]
  totalHeight: number
  graphWidth: number
  rowHeight: number
}

export function buildGraphLayout(items: TimelineItem[]): GraphLayout {
  // tip = end date if closed, +Infinity if still open (HEAD-like, always newest).
  // a 'started' marker's own `end` is only decoration for formatDateRange (it mirrors
  // the branch's later closing date) — the marker itself happened at its own start,
  // so it must sort there, not get dragged next to its sibling's closing row.
  const tipOf = (item: TimelineItem) =>
    isOpenItem(item) ? Infinity : monthIdx(item.status === 'started' ? item.start : (item.end ?? item.start))

  // newest-tip first, ties broken by start desc, then track, then title — deterministic row order
  const sorted = [...items].sort((a, b) => {
    const at = tipOf(a), bt = tipOf(b)
    if (bt !== at) return bt - at
    const as = monthIdx(a.start), bs = monthIdx(b.start)
    if (bs !== as) return bs - as
    if (a.track !== b.track) return a.track.localeCompare(b.track)
    return a.title.localeCompare(b.title)
  })

  // group consecutive items into one shared row whenever they tie exactly on tip — same
  // month means same point in time (and every open item ties at Infinity, i.e. "now" is
  // the same moment for all of them), so they share a row regardless of which branch they
  // fork off; each branch still targets its own parent lane independently, and — for open
  // branches — its own real diverge row (see rowByMonth below), only the tip row is shared.
  // Each item is always a boundary commit of its own branch (branches here only ever have
  // 1-2 commits), so any tip tie is a real shared diverge/merge point, not an artifact of
  // unrelated mid-branch commits.
  const rowGroups: TimelineItem[][] = []
  for (let i = 0; i < sorted.length; ) {
    const item = sorted[i]
    const group = [item]
    let j = i + 1
    while (
      j < sorted.length &&
      tipOf(sorted[j]) === tipOf(item) &&
      !group.some((g) => g.branch === sorted[j].branch)
    ) {
      group.push(sorted[j])
      j++
    }
    rowGroups.push(group)
    i = j
  }

  const N = rowGroups.length
  const rowOf = new Map<string, number>()
  rowGroups.forEach((group, row) => group.forEach((it) => rowOf.set(it.id, row)))

  const rowHeights = rowGroups.map((g) => ROW_HEIGHT + Math.max(0, g.length - 1) * GROUP_ROW_EXTRA)

  // idle months between two consecutive rows get a little extra whitespace, so an 8-month
  // gap (e.g. restaurant-finder shipping Dec 2024, lessgo starting Aug 2025) visibly reads
  // as more time passing than two events a month apart. Capped so multi-year gaps (e.g. the
  // full B.Tech span) don't blow out the layout; open (Infinity-tip) rows get no gap bonus.
  const repTip = (g: TimelineItem[]) => tipOf(g[0])
  const rowTops: number[] = []
  const rowBottoms: number[] = []
  const rowYs: number[] = []
  let cursor = HEADROOM
  for (let row = 0; row < rowGroups.length; row++) {
    if (row > 0) {
      const prevTip = repTip(rowGroups[row - 1])
      const curTip = repTip(rowGroups[row])
      if (Number.isFinite(prevTip) && Number.isFinite(curTip)) {
        const idleMonths = Math.max(0, prevTip - curTip - 1)
        cursor += Math.min(GAP_MAX, idleMonths * GAP_PER_MONTH)
      }
    }
    const h = rowHeights[row]
    rowTops.push(cursor)
    rowYs.push(cursor + h / 2)
    cursor += h
    rowBottoms.push(cursor)
  }
  const totalHeight = cursor + HEADROOM

  const rowY = (i: number) => rowYs[i]
  const rowTop = (i: number) => rowTops[i]
  const rowBottom = (i: number) => rowBottoms[i]

  const rows: GraphRow[] = rowGroups.map((group, row) => ({ items: group, row, height: rowHeights[row] }))

  // group commits into branches
  const branchItems = new Map<string, TimelineItem[]>()
  for (const it of sorted) {
    const list = branchItems.get(it.branch) ?? []
    list.push(it)
    branchItems.set(it.branch, list)
  }

  const branchIds = [...branchItems.keys()]
  const branchParent = new Map<string, string>()
  const branchDivergeRow = new Map<string, number>() // oldest commit's row (largest index)
  const branchTipRow = new Map<string, number>() // newest commit's row (smallest index)

  for (const id of branchIds) {
    const its = branchItems.get(id)!
    const parent = its[0].parentBranch ?? MAIN_BRANCH
    branchParent.set(id, parent)
    const commitRows = its.map((it) => rowOf.get(it.id)!)
    branchDivergeRow.set(id, Math.max(...commitRows))
    branchTipRow.set(id, Math.min(...commitRows))
  }

  // a single-commit open branch (e.g. an active project) gets its dot pinned near the top
  // of the graph (open items always sort as "newest"), but it should still visually fork
  // off its parent at the row matching its REAL start month, then run a line up to that
  // top dot — not fork right where it's drawn. Look up the row where closed items with
  // that same calendar month already landed, and use that as this branch's diverge row.
  const rowByMonth = new Map<number, number>()
  rowGroups.forEach((group, row) => {
    const t = tipOf(group[0])
    if (Number.isFinite(t)) rowByMonth.set(t, row)
  })
  for (const id of branchIds) {
    const its = branchItems.get(id)!
    if (its.length !== 1) continue
    const only = its[0]
    if (!isOpenItem(only)) continue
    const realDivergeRow = rowByMonth.get(monthIdx(only.start))
    if (realDivergeRow !== undefined && realDivergeRow > branchTipRow.get(id)!) {
      branchDivergeRow.set(id, realDivergeRow)
    }
  }

  // a branch's line must stay "alive" in the background through every row any of its
  // children occupy (like a real git graph) — otherwise a child whose commits fall
  // between two sparse parent commits has nothing local to anchor onto, and its
  // diverge/merge curves collapse onto the parent's nearest visible commit instead.
  // this is tracked separately from the branch's own diverge/tip rows: those still
  // drive where THIS branch forks off ITS OWN parent — only the extended span is used
  // when this branch is acting as the parent anchor target for a child.
  const branchExtDivergeRow = new Map(branchDivergeRow)
  const branchExtTipRow = new Map(branchTipRow)
  let extended = true
  while (extended) {
    extended = false
    for (const id of branchIds) {
      const parent = branchParent.get(id)!
      if (parent === MAIN_BRANCH) continue
      const childDiverge = branchExtDivergeRow.get(id)!
      const childTip = branchExtTipRow.get(id)!
      if (childDiverge > branchExtDivergeRow.get(parent)!) { branchExtDivergeRow.set(parent, childDiverge); extended = true }
      if (childTip < branchExtTipRow.get(parent)!) { branchExtTipRow.set(parent, childTip); extended = true }
    }
  }

  // main is a virtual line spanning the whole graph
  function branchSpan(branchId: string): [tip: number, diverge: number] {
    if (branchId === MAIN_BRANCH) return [0, N - 1]
    return [branchExtTipRow.get(branchId) ?? 0, branchExtDivergeRow.get(branchId) ?? N - 1]
  }

  // the parent branch's line already passes through every row between its tip and diverge
  // rows, so the nearest — and only visually-correct — anchor point is the child's own row,
  // clamped into the parent's span. snapping to a "nearest matching date" instead produces
  // long diagonal sweeps when the parent has sparse commits (e.g. a degree's start/end).
  function anchorRowOnBranch(branchId: string, childRow: number): number {
    const [tip, diverge] = branchSpan(branchId)
    return Math.min(diverge, Math.max(tip, childRow))
  }

  // an open (still-active) branch never frees its lane for reuse below it — it has no
  // real end row, so stacking a later, unrelated branch right underneath in the same
  // lane column reads as a continuation of it instead of a separate fork off main.
  const branchIsOpen = new Map<string, boolean>()
  for (const id of branchIds) {
    const its = branchItems.get(id)!
    const tipRow = branchTipRow.get(id)!
    const newestItem = its.find((it) => rowOf.get(it.id) === tipRow)!
    branchIsOpen.set(id, isOpenItem(newestItem))
  }

  // greedy interval-coloring lane assignment, one lane per branch, shared pool
  const byTip = [...branchIds].sort((a, b) => branchTipRow.get(a)! - branchTipRow.get(b)!)
  const laneEnd: number[] = []
  const laneOf = new Map<string, number>()
  for (const id of byTip) {
    const start = branchTipRow.get(id)! - 1
    const end = branchIsOpen.get(id) ? N : branchDivergeRow.get(id)! + 1
    let k = laneEnd.findIndex((e) => e < start)
    if (k === -1) {
      k = laneEnd.length
      laneEnd.push(end)
    } else {
      laneEnd[k] = end
    }
    laneOf.set(id, k + 1) // lane 0 reserved for main
  }

  function branchLaneX(id: string): number {
    return id === MAIN_BRANCH ? TRUNK_X : laneX(laneOf.get(id)!)
  }

  // a parent's rendered line only reaches rowY at its own tip/diverge row — past that it
  // doesn't exist. Anchoring to rowTop/rowBottom is correct for a pass-through row (the
  // parent's line runs straight through), but if the anchor row IS the parent's own real
  // commit row (e.g. a child now shares a row with the parent's tip after grouping), the
  // curve must target that dot's exact center or it lands in empty space past the line's end.
  function parentAnchorY(parentId: string, row: number, edge: 'top' | 'bottom'): number {
    if (parentId !== MAIN_BRANCH && (branchTipRow.get(parentId) === row || branchDivergeRow.get(parentId) === row)) {
      return rowY(row)
    }
    return edge === 'top' ? rowTop(row) : rowBottom(row)
  }

  const branches: GraphBranch[] = branchIds.map((id) => {
    const its = branchItems.get(id)!
    const parent = branchParent.get(id)!
    const divergeRow = branchDivergeRow.get(id)!
    const tipRow = branchTipRow.get(id)!
    const lx = branchLaneX(id)

    const newestItem = its.find((it) => rowOf.get(it.id) === tipRow)!
    const parentAnchorDiverge = anchorRowOnBranch(parent, divergeRow)
    const parentLxAtDiverge = branchLaneX(parent)

    const isOpen = isOpenItem(newestItem)

    const divergePath = bezierS(parentLxAtDiverge, parentAnchorY(parent, parentAnchorDiverge, 'bottom'), lx, rowY(divergeRow))
    const laneLinePath = divergeRow !== tipRow ? `M ${lx},${rowY(divergeRow)} L ${lx},${rowY(tipRow)}` : null

    let closePath: string | null = null
    if (!isOpen) {
      const parentAnchorClose = anchorRowOnBranch(parent, tipRow)
      const parentLxAtClose = branchLaneX(parent)
      closePath = bezierS(lx, rowY(tipRow), parentLxAtClose, parentAnchorY(parent, parentAnchorClose, 'top'))
    }

    // a single-commit open branch whose diverge row was pulled down to its real start
    // month (see rowByMonth above) needs its own visible starting dot there too — the
    // fork shouldn't just trail off into a bare line with nothing marking where it began.
    const dotRows = its.length === 1 && isOpen && divergeRow !== tipRow ? [divergeRow, tipRow] : its.map((it) => rowOf.get(it.id)!)
    const dots = dotRows.map((r, i) => ({ row: r, cx: lx, cy: rowY(r), item: its.length === 1 ? its[0] : its[i] }))

    return { id, track: its[0].track, laneIndex: laneOf.get(id)!, divergePath, laneLinePath, closePath, dots, isOpen }
  })

  const K = laneEnd.length
  const graphWidth = PAD_LEFT + (K + 1) * LANE_PITCH + PAD_LEFT

  return { rows, branches, totalHeight, graphWidth, rowHeight: ROW_HEIGHT }
}
