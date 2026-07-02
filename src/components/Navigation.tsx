import { useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'certs', label: 'Certs' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const socialLinks = [
  { label: 'Mail', href: 'mailto:sriram.mannam10@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/srirammannam' },
  { label: 'GitHub', href: 'https://github.com/manamsriram' },
]

export function Navigation() {
  const activeSection = useActiveSection()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-terminal">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          <button
            onClick={() => scrollToSection('hero')}
            className="font-mono text-sm text-primary hover:text-accent transition-colors"
          >
            <span className="text-muted-foreground">$</span> sri-ram-mannam
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'font-mono text-sm transition-colors relative',
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden font-mono text-sm text-primary"
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            {mobileMenuOpen ? '[ close ]' : '[ menu ]'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-terminal bg-background/95 px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'block font-mono text-sm w-full text-left py-1',
                  activeSection === item.id ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-terminal flex gap-4">
              {socialLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Side dot rail (desktop) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            aria-label={`Scroll to ${item.label}`}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              activeSection === item.id ? 'bg-accent scale-125' : 'bg-muted hover:bg-muted-foreground/50',
            )}
          />
        ))}
      </div>
    </>
  )
}

