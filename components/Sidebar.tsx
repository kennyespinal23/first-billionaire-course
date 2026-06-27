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

const NAV_ITEMS: { id: AppView; icon: string; label: string }[] = [
  { id: 'dash',    icon: '◈', label: 'Command Center' },
  { id: 'domains', icon: '⬡', label: '23 Domains' },
  { id: 'review',  icon: '◎', label: 'Daily Review' },
  { id: 'journal', icon: '✦', label: 'Application Journal' },
  { id: 'stats',   icon: '△', label: 'Progress & Streaks' },
]

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
    <nav className="w-[272px] min-w-[272px] bg-ink-2 border-r border-border flex flex-col fixed top-0 left-0 bottom-0 overflow-y-auto z-50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Logo */}
      <div className="px-[22px] py-7 border-b border-border">
        <div className="label text-gold mb-1">The First</div>
        <div className="font-serif text-[20px] font-semibold text-cream leading-[1.15] tracking-[-0.01em]">
          Billionaire<br />Course
        </div>
        <div className="label text-cream-5 mt-[5px]">Edition 1 · v1.0 · Ceiling $100K</div>
      </div>

      {/* MNW mini */}
      <div className="mx-[14px] mt-[14px] bg-ink-3 border border-border-2 rounded-sm p-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="label text-cream-4">Mental Net Worth</span>
          <span className="font-serif text-lg font-semibold text-gold-2">{fmt(progress.knowledge_mnw)}</span>
        </div>
        <div className="h-[2px] bg-ink-5 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-gradient-to-r from-gold to-gold-3 rounded-full transition-all duration-500"
            style={{ width: `${kPct}%` }}
          />
        </div>
        <div className="flex justify-between">
          <span className="label text-cream-4">{levelName}</span>
          <span className="label text-cream-4">{Math.round(kPct)}% of ceiling</span>
        </div>
      </div>

      {/* Nav section */}
      <div className="px-[14px] pt-4 pb-1">
        <div className="label text-cream-5 mb-[6px] px-2">Navigate</div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-[9px] px-[10px] py-[9px] rounded-sm mb-px border transition-all duration-100 text-left ${
              activeView === item.id
                ? 'bg-ink-3 border-border-2 text-cream'
                : 'border-transparent hover:bg-ink-3 text-cream-2'
            }`}
          >
            <span className={`text-[13px] w-[18px] text-center flex-shrink-0 ${activeView === item.id ? 'opacity-100' : 'opacity-60'}`}>
              {item.icon}
            </span>
            <span className="text-[12px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="h-px bg-border mx-[14px] my-[10px]" />

      {/* Domains list */}
      <div className="px-[14px] pb-1">
        <div className="label text-cream-5 mb-[6px] px-2">Domains</div>
        <div className="space-y-px">
          {DOMAINS.map(d => (
            <button
              key={d.n}
              onClick={() => onOpenDomain(d.n)}
              className={`w-full flex items-center gap-2 px-2 py-[6px] rounded-sm transition-all duration-100 text-left ${
                activeDomainN === d.n ? 'bg-ink-3' : 'hover:bg-ink-3'
              }`}
            >
              <div className="w-1 h-[14px] rounded-full flex-shrink-0" style={{ background: d.c, opacity: activeDomainN === d.n ? 1 : 0.5 }} />
              <span className={`text-[11px] flex-1 leading-[1.3] ${activeDomainN === d.n ? 'text-cream-2' : 'text-cream-4'}`}>{d.name}</span>
              <span className="label text-cream-5">{String(d.n).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto p-[14px] border-t border-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🔥</span>
          <div>
            <div className="font-serif text-xl font-semibold text-gold-2 leading-none">{progress.streak}</div>
            <div className="label text-cream-4 mt-0.5">Day Streak</div>
          </div>
        </div>
        <div className="bg-ink-3 border border-border-2 rounded-sm px-3 py-[10px] text-center mb-3">
          <div className="label text-cream-5 mb-[2px]">Current Edition</div>
          <div className="text-[12px] font-semibold text-gold-2">Edition 1 — The Foundation</div>
        </div>
        <button
          onClick={signOut}
          className="w-full label text-cream-4 hover:text-cream-3 transition-colors text-center py-1"
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}
