import { useState, useEffect } from 'react'

const sections = ['hero', 'about', 'timeline', 'certs', 'projects', 'contact']

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const compute = () => {
      // Trigger point: 30% down from top of viewport
      const trigger = window.innerHeight * 0.3
      let current = sections[0]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= trigger) {
          current = id
        } else {
          break
        }
      }
      // Bottom of page: force last section
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = sections[sections.length - 1]
      }
      setActiveSection((prev) => (prev === current ? prev : current))
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  return activeSection
}
