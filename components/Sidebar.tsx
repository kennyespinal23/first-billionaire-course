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
      className="w-[160px] min-w-[160px] flex flex-col fixed top-0 left-0 bottom-0 z-50 overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 flex-shrink-0">
        <div className="text-white font-sans font-bold text-[22px] leading-none tracking-[-0.04em]">TFB.</div>
        <div
          className="text-[8px] font-sans font-semibold tracking-[0.12em] uppercase mt-[3px] leading-[1.3]"
          style={{ color: 'rgba(255,255,255,0.32)' }}
        >
          Unique Student<br />of Billions
        </div>
      </div>

      {/* Nav cards — flex-1 so they fill all available height */}
      <div className="flex flex-col flex-1 min-h-0">
        {NAV_ITEMS.map(item => {
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex-1 flex flex-col justify-between p-3 text-left transition-opacity duration-150 relative"
              style={{
                background: item.color,
                opacity: isActive ? 1 : 0.72,
                outline: isActive ? '2px solid white' : 'none',
                outlineOffset: isActive ? '-3px' : '0',
              }}
            >
              {/* Top row: number + arrow */}
              <div className="flex items-start justify-between">
                <span
                  className="font-sans font-bold leading-none"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}
                >
                  {item.n}
                </span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ opacity: 0.75 }}>
                  <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Bottom: label */}
              <div
                className="font-sans font-bold leading-[1.15]"
                style={{ fontSize: '13px', color: 'white', whiteSpace: 'pre-line' }}
              >
                {item.label}
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom — MNW + sign out */}
      <div
        className="flex-shrink-0 px-4 py-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* MNW */}
        <div className="mb-3">
          <div className="flex justify-between items-baseline mb-1">
            <span
              className="font-sans font-semibold"
              style={{ fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)' }}
            >
              MNW
            </span>
            <span className="font-sans font-bold text-white" style={{ fontSize: '13px' }}>
              {fmt(progress.knowledge_mnw)}
            </span>
          </div>
          <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${kPct}%`, background: '#F5A623' }}
            />
          </div>
        </div>

        {/* Streak + sign out */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span style={{ fontSize: '12px' }}>🔥</span>
            <span className="font-sans font-bold text-white" style={{ fontSize: '12px' }}>{progress.streak}</span>
          </div>
          <button
            onClick={signOut}
            className="font-sans font-semibold transition-colors"
            style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}
