'use client'

import type { AppView } from '@/lib/types'

interface Props {
  view: AppView
  onNavigate: (v: AppView) => void
}

const NAV: { id: AppView; icon: string; label: string }[] = [
  { id: 'dash',    icon: '◈', label: 'Home' },
  { id: 'domains', icon: '⬡', label: 'Domains' },
  { id: 'review',  icon: '◎', label: 'Review' },
  { id: 'journal', icon: '✦', label: 'Journal' },
  { id: 'stats',   icon: '△', label: 'Progress' },
]

export function MobileNav({ view, onNavigate }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-ink-2 border-t border-border z-50 flex">
      {NAV.map(item => {
        const active = view === item.id
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
          >
            <span className={`text-[15px] ${active ? 'text-gold-2' : 'text-cream-4'}`}>{item.icon}</span>
            <span className={`text-[9px] font-mono tracking-[0.1em] uppercase ${active ? 'text-gold-2' : 'text-cream-4'}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
