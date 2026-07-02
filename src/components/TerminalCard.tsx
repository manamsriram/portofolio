import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TerminalCardProps {
  label?: string
  children: ReactNode
  className?: string
}

export function TerminalCard({ label = 'terminal', children, className }: TerminalCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-terminal border border-terminal shadow-[0_0_40px_-15px_hsl(var(--primary)/0.4)] overflow-hidden',
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-terminal bg-black/40">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-xs font-mono text-muted-foreground">{label}</span>
      </div>
      <div className="p-5 font-mono text-sm text-foreground/90">{children}</div>
    </div>
  )
}
