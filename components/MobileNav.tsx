'use client'

import type { AppView } from '@/lib/types'

interface Props {
  view: AppView
  onNavigate: (v: AppView) => void
}

const NAV: { id: AppView; icon: string; label: string; color: string }[] = [
  { id: 'dash',    icon: '◈', label: 'Home',    color: '#4B6CF7' },
  { id: 'domains', icon: '⬡', label: 'Domains', color: '#FF5C2B' },
  { id: 'review',  icon: '◎', label: 'Review',  color: '#E63B3B' },
  { id: 'journal', icon: '✦', label: 'Journal', color: '#2DC97E' },
  { id: 'stats',   icon: '△', label: 'Progress',color: '#9B3FF4' },
]

export function MobileNav({ view, onNavigate }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-canvas-3 z-50 flex">
      {NAV.map(item => {
        const active = view === item.id
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
          >
            <span
              className="text-[15px] transition-colors"
              style={{ color: active ? item.color : '#A09C96' }}
            >
              {item.icon}
            </span>
            <span
              className="text-[9px] font-sans font-bold tracking-[0.08em] uppercase transition-colors"
              style={{ color: active ? item.color : '#A09C96' }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
