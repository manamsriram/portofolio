import { useEffect, useRef } from 'react'

// Antigravity-style cursor swarm: dev glyphs orbit and trail the pointer,
// each with its own lag so the cloud flows behind cursor movement instead
// of snapping to it. Idles into a loose ambient drift when the pointer is
// away. Colors pulled from design tokens (--primary, --accent) only.
const GLYPHS = ['</>', '{}', '()', '[]', '=>', '&&', '||', ';', '#', '_']

type Node = {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  orbitAngle: number
  orbitRadius: number
  orbitSpeed: number
  lag: number // easing factor toward target; lower = trails further behind
  size: number
  opacity: number
  color: 'primary' | 'accent'
  glyph: string
  rotation: number
  rotationSpeed: number
}

const COUNT = 180
const POINTER_ACTIVE_RADIUS = 220 // just outside orbit band: nodes get picked up/dropped as cursor passes

export function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerRef = useRef({ x: -9999, y: -9999, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const styles = getComputedStyle(document.documentElement)
    const colorVars = {
      primary: styles.getPropertyValue('--primary').trim(),
      accent: styles.getPropertyValue('--accent').trim(),
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true }
    }
    const onLeave = () => (pointerRef.current = { ...pointerRef.current, active: false })
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    const nodes: Node[] = Array.from({ length: COUNT }, () => {
      const depth = Math.random()
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRadius: 70 + Math.random() * 90,
        orbitSpeed: (Math.random() - 0.5) * 0.02,
        lag: 0.015 + depth * 0.09, // near/large nodes catch up faster, far ones trail
        size: 6 + depth * 16,
        opacity: 0.22 + depth * 0.45,
        color: Math.random() < 0.6 ? 'primary' : 'accent',
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.004,
      }
    })

    let animId = 0
    let hidden = false

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: px, y: py, active } = pointerRef.current

      for (const n of nodes) {
        n.orbitAngle += n.orbitSpeed
        n.rotation += n.rotationSpeed

        let targetX: number
        let targetY: number

        if (active) {
          const dx = n.baseX - px
          const dy = n.baseY - py
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < POINTER_ACTIVE_RADIUS) {
            // swarm around the cursor at each node's own orbit radius/angle
            targetX = px + Math.cos(n.orbitAngle) * n.orbitRadius
            targetY = py + Math.sin(n.orbitAngle) * n.orbitRadius
          } else {
            targetX = n.baseX
            targetY = n.baseY
          }
        } else {
          // idle ambient drift
          n.baseX += n.vx
          n.baseY += n.vy
          if (n.baseX < -40) n.baseX = canvas.width + 40
          if (n.baseX > canvas.width + 40) n.baseX = -40
          if (n.baseY < -40) n.baseY = canvas.height + 40
          if (n.baseY > canvas.height + 40) n.baseY = -40
          targetX = n.baseX
          targetY = n.baseY
        }

        n.x += (targetX - n.x) * n.lag
        n.y += (targetY - n.y) * n.lag

        const rgb = colorVars[n.color]
        ctx.save()
        ctx.translate(n.x, n.y)
        ctx.rotate(n.rotation)
        ctx.globalAlpha = n.opacity
        ctx.font = `${n.size}px monospace`
        ctx.fillStyle = `hsl(${rgb})`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(n.glyph, 0, 0)
        ctx.restore()
      }

      if (!hidden) animId = requestAnimationFrame(step)
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const n of nodes) {
        const rgb = colorVars[n.color]
        ctx.save()
        ctx.translate(n.x, n.y)
        ctx.globalAlpha = n.opacity
        ctx.font = `${n.size}px monospace`
        ctx.fillStyle = `hsl(${rgb})`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(n.glyph, 0, 0)
        ctx.restore()
      }
    }

    if (reduceMotion) {
      drawStatic()
    } else {
      step()
    }

    const onVisibility = () => {
      hidden = document.hidden
      if (!hidden && !reduceMotion) step()
      else cancelAnimationFrame(animId)
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-radial-cyan" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
