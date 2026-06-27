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

function SectionPill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 border border-stone/10 rounded-full px-4 py-1.5 mb-8">
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
    diagText = `Your Knowledge MNW (${fmt(progress.knowledge_mnw)}) is significantly ahead of your Applied MNW (${fmt(progress.applied_mnw)}). Your priority is applying what you know to real decisions — not more study.`
  } else if (gap < progress.knowledge_mnw * 0.2 && progress.knowledge_mnw > 10000) {
    diagIcon = '🚀'
    diagTitle = 'Knowledge Ceiling Approaching'
    diagText = `Your Applied MNW (${fmt(progress.applied_mnw)}) is close to your Knowledge MNW (${fmt(progress.knowledge_mnw)}). Complete more modules to raise your ceiling.`
  } else if (progress.knowledge_mnw > 0) {
    diagIcon = '✅'
    diagTitle = 'Balanced Progression'
    diagText = `Knowledge (${fmt(progress.knowledge_mnw)}) and Applied (${fmt(progress.applied_mnw)}) are progressing in balance. Keep learning. Keep applying.`
  }

  return (
    <div>
      {/* Hero — split layout */}
      <div className="flex min-h-[420px] border-b border-canvas-3">
        {/* Left: text content */}
        <div className="flex-1 px-8 md:px-12 py-14 bg-white flex flex-col justify-center">
          <SectionPill color="#4B6CF7">Edition 1 · The Foundation · Active</SectionPill>
          <h1 className="font-sans font-extrabold text-[46px] md:text-[58px] leading-[0.92] text-stone tracking-[-0.03em] mb-5 max-w-[560px]">
            Build the mind<br />of a billionaire.
          </h1>
          <p className="text-[15px] font-sans font-medium text-stone leading-[1.65] max-w-[420px] mb-8">
            23 domains. 9 pillars. Three levels of thinking. A dual-track Mental Net Worth system that tells you exactly where you are.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onOpenDomain(1)}
              className="inline-flex items-center gap-2 bg-stone text-white font-sans font-bold text-[12px] tracking-[0.04em] uppercase px-7 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              Begin Domain 1 <ArrowIcon />
            </button>
            <button
              onClick={() => onOpenDomain(2)}
              className="inline-flex items-center gap-2 border border-stone/20 text-stone font-sans font-bold text-[12px] tracking-[0.04em] uppercase px-7 py-4 rounded-full hover:border-stone/40 transition-colors"
            >
              All 23 Domains
            </button>
          </div>
        </div>

        {/* Right: dark panel with MNW */}
        <div className="hidden md:flex w-[320px] flex-shrink-0 flex-col justify-center px-8 py-10" style={{ background: '#0A0909' }}>
          <div className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Mental Net Worth
          </div>
          <div className="font-sans font-extrabold text-[48px] leading-none text-white mb-1">{fmt(progress.knowledge_mnw)}</div>
          <div className="text-[12px] font-sans mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>Knowledge · {levelName}</div>
          <div className="h-[3px] rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${kPct}%`, background: '#F5A623' }} />
          </div>
          <div className="font-sans font-extrabold text-[36px] leading-none mb-1" style={{ color: '#2DC97E' }}>{fmt(progress.applied_mnw)}</div>
          <div className="text-[12px] font-sans" style={{ color: 'rgba(255,255,255,0.35)' }}>Applied · Real-world use</div>
        </div>
      </div>

      {/* MNW Panel */}
      <div className="px-8 md:px-12 py-12 border-b border-canvas-3 bg-canvas">
        <SectionPill color="#4B6CF7">Mental Net Worth Tracker</SectionPill>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Knowledge Net Worth', val: progress.knowledge_mnw, bg: '#4B6CF7', sub: 'What you understand' },
            { label: 'Applied Net Worth',   val: progress.applied_mnw,   bg: '#2DC97E', sub: 'What you\'ve used in real life' },
            { label: 'True Level',          val: trueMNW,                bg: '#0A0909', sub: 'Cannot exceed applied' },
          ].map(c => (
            <div key={c.label} className="rounded-[14px] p-7 text-white" style={{ background: c.bg }}>
              <div className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase opacity-60 mb-3">{c.label}</div>
              <div className="font-sans font-extrabold text-[38px] leading-none mb-2">{fmt(c.val)}</div>
              <div className="text-[12px] font-sans opacity-60">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="space-y-5 mb-6">
          {[
            { label: 'Knowledge Track — Edition 1 Ceiling: $100,000', pct: kPct, color: '#4B6CF7' },
            { label: 'Applied Track — Grows with real-world use',      pct: aPct, color: '#2DC97E' },
          ].map(t => (
            <div key={t.label}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[12px] font-sans font-semibold text-stone">{t.label}</span>
                <span className="text-[12px] font-sans font-bold text-stone">{Math.round(t.pct)}%</span>
              </div>
              <div className="h-[6px] bg-canvas-2 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${t.pct}%`, background: t.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Diagnosis */}
        <div className="bg-white border border-canvas-3 rounded-[14px] p-6 flex items-start gap-4 mb-5">
          <span className="text-2xl flex-shrink-0 mt-0.5">{diagIcon}</span>
          <div>
            <div className="text-[15px] font-sans font-extrabold text-stone mb-2">{diagTitle}</div>
            <div className="text-[13px] font-sans font-medium text-stone leading-[1.75]">{diagText}</div>
            {progress.knowledge_mnw === 0 && (
              <button onClick={() => onOpenDomain(1)} className="text-[12px] font-sans font-bold mt-2 inline-block" style={{ color: '#4B6CF7' }}>
                Start Domain 1 →
              </button>
            )}
          </div>
        </div>

        {/* Real NW */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[12px] font-sans font-semibold text-stone whitespace-nowrap">Your Real Net Worth ($)</span>
          <input
            type="number"
            value={realNWInput}
            onChange={e => setRealNWInput(e.target.value)}
            placeholder="e.g. 45000"
            className="bg-white border border-canvas-3 rounded-full px-4 py-2 text-stone font-sans text-[13px] w-[160px] outline-none focus:border-stone/30 transition-colors"
          />
          <button
            onClick={() => onUpdateRealNW(parseFloat(realNWInput) || 0)}
            className="font-sans font-bold text-[11px] tracking-[0.06em] uppercase px-5 py-2 rounded-full bg-stone text-white hover:opacity-80 transition-opacity"
          >
            Update
          </button>
          {progress.real_nw > 0 && (
            <span className="text-[12px] font-sans font-medium text-stone">
              Real NW: {fmt(progress.real_nw)} · {progress.knowledge_mnw > progress.real_nw ? 'Apply more aggressively' : 'Level up — approaching ceiling'}
            </span>
          )}
        </div>
      </div>

      {/* Edition Ladder */}
      <div className="px-8 md:px-12 py-12 border-b border-canvas-3 bg-white">
        <SectionPill color="#FF5C2B">The Progression</SectionPill>
        <h2 className="font-sans font-extrabold text-[42px] md:text-[52px] text-stone tracking-[-0.03em] mb-3 leading-[0.93]">
          Edition Ladder
        </h2>
        <p className="text-[14px] font-sans font-medium text-stone leading-[1.65] max-w-[500px] mb-10">
          Each edition raises your ceiling. Your Mental Net Worth tells you when you're ready for the next one.
        </p>
        <div className="border border-canvas-3 rounded-[16px] overflow-hidden divide-y divide-canvas-3">
          {EDITIONS.map(ed => (
            <div
              key={ed.n}
              className={`bg-white px-8 py-5 flex flex-wrap sm:flex-nowrap items-center gap-5 hover:bg-canvas transition-colors ${
                ed.status === 'active' ? 'border-l-[4px] border-[#4B6CF7]' : ''
              } ${ed.status === 'locked' || ed.status === 'invite' ? 'opacity-35' : ''}`}
            >
              <span className="text-[10px] font-sans font-bold tracking-[0.1em] text-stone-4 w-[50px] flex-shrink-0">Ed. {ed.n}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-sans font-extrabold text-stone mb-0.5">{ed.name}</div>
                <div className="text-[12px] font-sans font-medium text-stone-2 leading-[1.5]">{ed.desc}</div>
              </div>
              <span className="font-sans font-extrabold text-[18px] text-stone w-[70px] text-right flex-shrink-0">{ed.ceiling}</span>
              <div className="w-[90px] text-right flex-shrink-0">
                <span
                  className="text-[9px] font-sans font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                  style={
                    ed.status === 'active'
                      ? { color: '#4B6CF7', background: 'rgba(75,108,247,0.1)' }
                      : { color: '#A09C96', background: '#E2E2DA' }
                  }
                >
                  {ed.status === 'active' ? 'Active' : ed.status === 'invite' ? 'Invite Only' : 'Locked'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Foundation Domains */}
      <div className="px-8 md:px-12 py-12">
        <SectionPill color="#2DC97E">Start Here</SectionPill>
        <h2 className="font-sans font-extrabold text-[42px] md:text-[52px] text-stone tracking-[-0.03em] mb-3 leading-[0.93]">
          Foundation Domains
        </h2>
        <p className="text-[14px] font-sans font-medium text-stone leading-[1.65] mb-10">
          The first six form the bedrock. Every other domain builds on these.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOMAINS.slice(0, 6).map((d, i) => (
            <DomainCard key={d.n} domain={d} index={i} onOpen={onOpenDomain} isCompleted={completed.has(d.n)} />
          ))}
        </div>
      </div>
    </div>
  )
}
