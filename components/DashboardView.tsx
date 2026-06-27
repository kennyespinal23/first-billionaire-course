'use client'

import { useState } from 'react'
import { CEILING, DOMAINS, fmt, getLevel, KNOWLEDGE_LEVELS, APPLIED_LEVELS } from '@/lib/data'
import { DomainCard } from './DomainCard'
import type { UserProgress } from '@/lib/types'

interface Props {
  progress: UserProgress
  kPct: number
  levelName: string
  onOpenDomain: (n: number) => void
  onUpdateRealNW: (val: number) => void
  completed: Set<number>
}

const EDITIONS = [
  { n: '01', name: 'The Foundation',  ceiling: '$100K',  desc: '23 domains · Core mental models · First principles across all entrepreneurial disciplines', status: 'active' as const },
  { n: '02', name: 'The Operator',    ceiling: '$250K',  desc: 'Advanced modules · Real case studies · Cross-domain mastery · Applied frameworks',          status: 'locked' as const },
  { n: '03', name: 'The Architect',   ceiling: '$1M',    desc: 'Market creation · Capital allocation · Organizational design · Legacy thinking',            status: 'locked' as const },
  { n: '04', name: 'The Builder',     ceiling: '$10M',   desc: 'Advanced capital · Global markets · Platform thinking · Ecosystem design',                  status: 'locked' as const },
  { n: '05', name: 'The Visionary',   ceiling: '$100M',  desc: 'Civilization thinking · Historical patterns · Paradigm creation · Legacy architecture',     status: 'locked' as const },
  { n: '06', name: 'Billionaire Mind',ceiling: '∞',      desc: 'By invitation only · Built individually · No ceiling · Priced accordingly',                 status: 'invite' as const },
]

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SectionLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 border border-stone-3/20 rounded-full px-4 py-1.5 mb-8">
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">{children}</span>
    </div>
  )
}

export function DashboardView({ progress, kPct, levelName, onOpenDomain, onUpdateRealNW, completed }: Props) {
  const [realNWInput, setRealNWInput] = useState(progress.real_nw > 0 ? String(progress.real_nw) : '')

  const aPct = Math.min((progress.applied_mnw / CEILING) * 100, 100)
  const trueMNW = Math.min(progress.knowledge_mnw, progress.applied_mnw)
  const gap = progress.knowledge_mnw - progress.applied_mnw

  let diagTitle = 'Begin Your Journey'
  let diagText = 'Start Domain 1 to begin building your Mental Net Worth. Knowledge grows as you learn. Applied grows as you use what you learn in the real world on your projects.'
  let diagIcon = '🎯'

  if (progress.knowledge_mnw === 0) {
    // defaults above
  } else if (gap > progress.knowledge_mnw * 0.5) {
    diagIcon = '⚠️'
    diagTitle = 'Execution Gap Detected'
    diagText = `Your Knowledge Net Worth (${fmt(progress.knowledge_mnw)}) is significantly ahead of your Applied Net Worth (${fmt(progress.applied_mnw)}). You understand more than you have tested. Your priority right now is not more study — it is applying what you know to real decisions.`
  } else if (gap < progress.knowledge_mnw * 0.2 && progress.knowledge_mnw > 10000) {
    diagIcon = '🚀'
    diagTitle = 'Knowledge Ceiling Approaching'
    diagText = `Your Applied Net Worth (${fmt(progress.applied_mnw)}) is close to your Knowledge Net Worth (${fmt(progress.knowledge_mnw)}). Time to go deeper — complete more modules and raise your knowledge ceiling.`
  } else if (progress.knowledge_mnw > 0) {
    diagIcon = '✅'
    diagTitle = 'Balanced Progression'
    diagText = `Knowledge (${fmt(progress.knowledge_mnw)}) and Applied (${fmt(progress.applied_mnw)}) are progressing in balance. Keep learning. Keep applying. You are building the compound curve.`
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative px-8 md:px-14 py-16 border-b border-canvas-3 overflow-hidden bg-white">
        <div className="pointer-events-none absolute right-12 bottom-6 font-sans font-bold text-[160px] text-stone/[0.028] leading-none select-none tracking-[-0.06em]">01</div>

        <SectionLabel color="#4B6CF7">Edition 1 · The Foundation · Active</SectionLabel>

        <h1 className="font-sans font-bold text-[52px] md:text-[66px] leading-[0.92] text-stone tracking-[-0.035em] mb-6 max-w-[700px]">
          Build the mind<br />of a billionaire.
        </h1>
        <p className="text-[15px] font-sans text-stone-4 leading-[1.7] max-w-[460px] mb-10">
          23 domains. 9 pillars. Three levels of thinking. A dual-track Mental Net Worth system that tells you exactly where you are — and exactly what to do next.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onOpenDomain(1)}
            className="inline-flex items-center gap-2.5 bg-stone text-white font-sans font-bold text-[12px] tracking-[0.05em] uppercase px-7 py-[14px] rounded-full hover:bg-stone-2 transition-all"
          >
            Begin Domain 1
            <ArrowIcon />
          </button>
          <button
            onClick={() => onOpenDomain(2)}
            className="inline-flex items-center gap-2.5 border border-stone-3/25 text-stone-3 font-sans font-bold text-[12px] tracking-[0.05em] uppercase px-7 py-[14px] rounded-full hover:border-stone hover:text-stone transition-all"
          >
            All 23 Domains
          </button>
        </div>
      </div>

      {/* MNW Panel */}
      <div className="px-8 md:px-14 py-12 border-b border-canvas-3">
        <SectionLabel color="#4B6CF7">Mental Net Worth</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Knowledge Net Worth', val: progress.knowledge_mnw, color: '#4B6CF7', sub: 'What you understand · What you can explain' },
            { label: 'Applied Net Worth',   val: progress.applied_mnw,   color: '#2DC97E', sub: 'What you\'ve used · Reality has confirmed' },
            { label: 'True Level (Lower)',  val: trueMNW,                color: '#0A0909', sub: 'Your honest level · Cannot exceed applied' },
          ].map(c => (
            <div key={c.label} className="bg-white border border-canvas-3 rounded-[14px] p-6 hover:shadow-sm transition-shadow">
              <div className="text-[10px] font-sans font-semibold tracking-[0.14em] uppercase text-stone-5 mb-3">{c.label}</div>
              <div className="font-sans font-bold text-[36px] leading-none mb-2" style={{ color: c.color }}>{fmt(c.val)}</div>
              <div className="text-[11px] font-sans text-stone-4 leading-[1.5]">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="space-y-5 mb-6">
          {[
            { label: 'Knowledge Track — Edition 1 Ceiling: $100,000', pct: kPct, color: '#4B6CF7' },
            { label: 'Applied Track — Closes with real-world use',     pct: aPct, color: '#2DC97E' },
          ].map(t => (
            <div key={t.label}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[11px] font-sans font-semibold text-stone-4">{t.label}</span>
                <span className="text-[11px] font-sans font-bold text-stone-3">{Math.round(t.pct)}%</span>
              </div>
              <div className="h-[5px] bg-canvas-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${t.pct}%`, background: t.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Diagnosis */}
        <div className="bg-white border border-canvas-3 rounded-[14px] p-5 flex items-start gap-4 mb-5">
          <span className="text-2xl flex-shrink-0 mt-0.5">{diagIcon}</span>
          <div>
            <div className="text-[13px] font-sans font-bold text-stone mb-1.5">{diagTitle}</div>
            <div className="text-[12px] font-sans text-stone-4 leading-[1.75]">{diagText}</div>
            {progress.knowledge_mnw === 0 && (
              <button
                onClick={() => onOpenDomain(1)}
                className="text-[11px] font-sans font-bold mt-2 transition-colors inline-block"
                style={{ color: '#4B6CF7' }}
              >
                Start Domain 1 →
              </button>
            )}
          </div>
        </div>

        {/* Real NW input */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-sans font-semibold text-stone-4 whitespace-nowrap">Your Real Net Worth ($)</span>
          <input
            type="number"
            value={realNWInput}
            onChange={e => setRealNWInput(e.target.value)}
            placeholder="e.g. 45000"
            className="bg-canvas-2 border border-canvas-3 rounded-full px-4 py-2 text-stone font-sans text-[12px] w-[160px] outline-none focus:border-stone-3 transition-colors"
          />
          <button
            onClick={() => onUpdateRealNW(parseFloat(realNWInput) || 0)}
            className="font-sans font-bold text-[11px] tracking-[0.06em] uppercase px-5 py-2 rounded-full bg-stone text-white hover:bg-stone-2 transition-all"
          >
            Update
          </button>
          {progress.real_nw > 0 && (
            <span className="text-[11px] font-sans text-stone-4">
              Real NW: {fmt(progress.real_nw)} ·{' '}
              {progress.knowledge_mnw > progress.real_nw
                ? 'Knowledge ahead — apply more aggressively'
                : 'Results approaching ceiling — level up'}
            </span>
          )}
        </div>
      </div>

      {/* Edition Ladder */}
      <div className="px-8 md:px-14 py-12 border-b border-canvas-3 bg-white">
        <SectionLabel color="#FF5C2B">The Progression</SectionLabel>
        <h2 className="font-sans font-bold text-[42px] md:text-[50px] text-stone tracking-[-0.03em] mb-2 leading-[0.93]">
          Edition Ladder
        </h2>
        <p className="text-[13px] font-sans text-stone-4 leading-[1.7] max-w-[500px] mb-10">
          Each edition raises your ceiling. Your Mental Net Worth tells you when you're ready for the next one.
        </p>
        <div className="border border-canvas-3 rounded-[14px] overflow-hidden divide-y divide-canvas-3">
          {EDITIONS.map(ed => (
            <div
              key={ed.n}
              className={`bg-white px-7 py-5 flex flex-wrap sm:flex-nowrap items-center gap-5 hover:bg-canvas transition-colors ${
                ed.status === 'active' ? 'border-l-[3px] border-[#4B6CF7]' : ''
              } ${ed.status === 'locked' || ed.status === 'invite' ? 'opacity-35' : ''}`}
            >
              <span className="text-[10px] font-sans font-bold tracking-[0.1em] text-stone-5 w-[50px] flex-shrink-0">Ed. {ed.n}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-sans font-bold text-stone mb-0.5">{ed.name}</div>
                <div className="text-[11px] font-sans text-stone-4 leading-[1.5]">{ed.desc}</div>
              </div>
              <span className="font-sans font-bold text-[18px] text-stone-3 w-[70px] text-right flex-shrink-0">{ed.ceiling}</span>
              <div className="w-[80px] text-right flex-shrink-0">
                <span className={`text-[9px] font-sans font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full ${
                  ed.status === 'active'
                    ? 'text-[#4B6CF7]'
                    : 'text-stone-5'
                }`} style={ed.status === 'active' ? { background: 'rgba(75,108,247,0.1)' } : { background: '#E2E2DA' }}>
                  {ed.status === 'active' ? 'Active' : ed.status === 'invite' ? 'Invite Only' : 'Locked'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured domains */}
      <div className="px-8 md:px-14 py-12">
        <SectionLabel color="#2DC97E">Start Here</SectionLabel>
        <h2 className="font-sans font-bold text-[42px] md:text-[50px] text-stone tracking-[-0.03em] mb-2 leading-[0.93]">
          Foundation Domains
        </h2>
        <p className="text-[13px] font-sans text-stone-4 leading-[1.7] mb-10">
          The first six form the bedrock. Every other domain builds on these.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DOMAINS.slice(0, 6).map((d, i) => (
            <DomainCard key={d.n} domain={d} index={i} onOpen={onOpenDomain} isCompleted={completed.has(d.n)} />
          ))}
        </div>
      </div>
    </div>
  )
}
