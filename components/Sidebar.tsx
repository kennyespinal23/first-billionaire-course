'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { DOMAINS, fmt } from '@/lib/data'
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
  { id: 'dash',    n: '01', label: 'Command Center',      color: '#4B6CF7' },
  { id: 'domains', n: '02', label: '23 Domains',          color: '#FF5C2B' },
  { id: 'review',  n: '03', label: 'Daily Review',        color: '#E63B3B' },
  { id: 'journal', n: '04', label: 'Application Journal', color: '#2DC97E' },
  { id: 'stats',   n: '05', label: 'Progress & Streaks',  color: '#9B3FF4' },
]

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function Sidebar({ view, onNavigate, onOpenDomain, progress, kPct, levelName, activeDomainN }: Props) {
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
      className="w-[272px] min-w-[272px] flex flex-col fixed top-0 left-0 bottom-0 overflow-y-auto z-50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ background: '#0A0909' }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <div className="text-white font-sans font-bold text-[26px] leading-none tracking-[-0.04em] mb-1">TFB.</div>
        <div className="text-[9px] font-sans font-semibold tracking-[0.14em] uppercase text-white/35">
          The First Billionaire Course
        </div>
      </div>

      {/* Colored nav cards */}
      <div className="px-3 flex flex-col gap-[5px]">
        {NAV_ITEMS.map(item => {
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative w-full rounded-[10px] p-[13px] flex flex-col justify-between text-left transition-all duration-150 hover:opacity-100 group"
              style={{
                background: item.color,
                minHeight: '86px',
                opacity: isActive ? 1 : 0.78,
                boxShadow: isActive ? `0 0 0 2px white, 0 0 0 4px ${item.color}` : 'none',
              }}
            >
              <div className="flex items-start justify-between">
                <span className="text-white font-sans font-bold text-[12px] leading-none opacity-80">{item.n}</span>
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                  <ArrowIcon />
                </span>
              </div>
              <div className="text-white font-sans font-bold text-[12.5px] leading-[1.2]">{item.label}</div>
            </button>
          )
        })}
      </div>

      <div className="h-px mx-3 my-4" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* Domains list */}
      <div className="px-3 pb-1">
        <div className="text-[9px] font-sans font-bold tracking-[0.16em] uppercase mb-2 px-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
          Domains
        </div>
        <div className="space-y-px">
          {DOMAINS.map(d => (
            <button
              key={d.n}
              onClick={() => onOpenDomain(d.n)}
              className="w-full flex items-center gap-2 px-2 py-[5px] rounded-[6px] text-left transition-all"
              style={{ background: activeDomainN === d.n ? 'rgba(255,255,255,0.07)' : undefined }}
              onMouseEnter={e => { if (activeDomainN !== d.n) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { if (activeDomainN !== d.n) (e.currentTarget as HTMLElement).style.background = '' }}
            >
              <div
                className="w-[3px] h-[11px] rounded-full flex-shrink-0"
                style={{ background: d.c, opacity: activeDomainN === d.n ? 1 : 0.4 }}
              />
              <span
                className="text-[10.5px] font-sans flex-1 leading-[1.3]"
                style={{ color: activeDomainN === d.n ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }}
              >
                {d.name}
              </span>
              <span className="text-[9px] font-sans" style={{ color: 'rgba(255,255,255,0.22)' }}>
                {String(d.n).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto px-3 pb-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {/* MNW mini */}
        <div
          className="rounded-[10px] p-4 mb-3"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <div className="flex justify-between items-center mb-[10px]">
            <span className="text-[9px] font-sans font-bold tracking-[0.12em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Mental Net Worth
            </span>
            <span className="text-white font-sans font-bold text-[14px]">{fmt(progress.knowledge_mnw)}</span>
          </div>
          <div className="h-[3px] rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${kPct}%`, background: '#FFB200' }}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] font-sans" style={{ color: 'rgba(255,255,255,0.28)' }}>{levelName}</span>
            <span className="text-[9px] font-sans" style={{ color: 'rgba(255,255,255,0.28)' }}>{Math.round(kPct)}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[15px]">🔥</span>
            <span className="text-white font-sans font-bold text-[13px]">{progress.streak}</span>
            <span className="text-[9px] font-sans font-semibold tracking-[0.08em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
              day streak
            </span>
          </div>
          <button
            onClick={signOut}
            className="text-[9px] font-sans font-semibold tracking-[0.12em] uppercase transition-colors"
            style={{ color: 'rgba(255,255,255,0.28)' }}
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
