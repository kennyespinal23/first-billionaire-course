'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { fmt } from '@/lib/data'
import type { AppView, UserProgress } from '@/lib/types'

interface Props {
  view: AppView
  onNavigate: (v: AppView) => void
  onOpenDomain: (n: number) => void
  progress: UserProgress
  kPct: number
  levelName: string
  activeDomainN: number | null
}

const NAV_ITEMS: { id: AppView; n: string; label: string; color: string }[] = [
  { id: 'dash',    n: '01', label: 'Command\nCenter',      color: '#4B6CF7' },
  { id: 'domains', n: '02', label: '23\nDomains',          color: '#F5A623' },
  { id: 'review',  n: '03', label: 'Daily\nReview',        color: '#E63B3B' },
  { id: 'journal', n: '04', label: 'Application\nJournal', color: '#2DC97E' },
  { id: 'stats',   n: '05', label: 'Progress\n& Streaks',  color: '#9B3FF4' },
]

export function Sidebar({ view, onNavigate, progress, kPct }: Props) {
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const activeView = view === 'domain' ? null : view

  return (
    <nav
      className="w-[170px] min-w-[170px] flex flex-col fixed top-0 left-0 bottom-0 z-50 overflow-hidden"
      style={{ background: '#EDE8DF' }}
    >
      {/* Logo — dark text on cream bg, same as units.gr */}
      <div className="px-4 pt-5 pb-4 flex-shrink-0">
        <div className="font-sans font-black text-[22px] leading-none tracking-[-0.04em] text-stone">TFB.</div>
        <div className="text-[8px] font-sans font-semibold tracking-[0.12em] uppercase mt-[3px] leading-[1.3] text-stone-4">
          The First<br />Billionaire Course
        </div>
      </div>

      {/* Nav cards — flex-1 fills height, cream bg shows between as gaps */}
      <div className="flex flex-col flex-1 min-h-0 px-2 gap-[5px]">
        {NAV_ITEMS.map(item => {
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex-1 flex flex-col justify-between p-3 text-left transition-all duration-150 rounded-[12px] relative group"
              style={{
                background: item.color,
                opacity: isActive ? 1 : 0.78,
                boxShadow: isActive ? `0 2px 12px ${item.color}60` : 'none',
              }}
            >
              {/* Number + arrow */}
              <div className="flex items-start justify-between">
                <span className="font-sans font-bold text-[13px] leading-none text-white opacity-90">{item.n}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-70 group-hover:opacity-100 transition-opacity">
                  <path d="M1 11L11 1M11 1H4M11 1V8" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {/* Label */}
              <div className="font-sans font-bold text-[12.5px] leading-[1.18] text-white" style={{ whiteSpace: 'pre-line' }}>
                {item.label}
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom — cream bg with dark text */}
      <div className="flex-shrink-0 px-4 pt-4 pb-5" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        {/* MNW */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-sans font-bold tracking-[0.1em] uppercase text-stone-4">MNW</span>
            <span className="font-sans font-bold text-[13px] text-stone">{fmt(progress.knowledge_mnw)}</span>
          </div>
          <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${kPct}%`, background: '#F5A623' }}
            />
          </div>
        </div>

        {/* Streak + sign out */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px]">🔥</span>
            <span className="font-sans font-bold text-[13px] text-stone">{progress.streak}</span>
          </div>
          <button
            onClick={signOut}
            className="text-[9px] font-sans font-bold tracking-[0.1em] uppercase text-stone-4 hover:text-stone transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
