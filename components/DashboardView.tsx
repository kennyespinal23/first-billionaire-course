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

export function DashboardView({ progress, kPct, levelName, onOpenDomain, onUpdateRealNW, completed }: Props) {
  const [realNWInput, setRealNWInput] = useState(progress.real_nw > 0 ? String(progress.real_nw) : '')

  const aPct = Math.min((progress.applied_mnw / CEILING) * 100, 100)
  const trueMNW = Math.min(progress.knowledge_mnw, progress.applied_mnw)
  const gap = progress.knowledge_mnw - progress.applied_mnw

  const kLevel = getLevel(KNOWLEDGE_LEVELS, progress.knowledge_mnw)
  const aLevel = getLevel(APPLIED_LEVELS, progress.applied_mnw)

  let diagTitle = 'Begin Your Journey'
  let diagText = 'Start Domain 1 to begin building your Mental Net Worth. Knowledge grows as you learn. Applied grows as you use what you learn in the real world on your projects.'
  let diagIcon = '🎯'

  if (progress.knowledge_mnw === 0) {
    // defaults above
  } else if (gap > progress.knowledge_mnw * 0.5) {
    diagIcon = '⚠️'
    diagTitle = 'Execution Gap Detected'
    diagText = `Your Knowledge Net Worth (${fmt(progress.knowledge_mnw)}) is significantly ahead of your Applied Net Worth (${fmt(progress.applied_mnw)}). You understand more than you have tested. Your priority right now is not more study — it is applying what you know to real decisions. Log every application in your journal. Close the gap.`
  } else if (gap < progress.knowledge_mnw * 0.2 && progress.knowledge_mnw > 10000) {
    diagIcon = '🚀'
    diagTitle = 'Knowledge Ceiling Approaching'
    diagText = `Your Applied Net Worth (${fmt(progress.applied_mnw)}) is close to your Knowledge Net Worth (${fmt(progress.knowledge_mnw)}). You are executing at your ceiling. Time to go deeper — complete more modules and raise your knowledge ceiling.`
  } else if (progress.knowledge_mnw > 0) {
    diagIcon = '✅'
    diagTitle = 'Balanced Progression'
    diagText = `Knowledge (${fmt(progress.knowledge_mnw)}) and Applied (${fmt(progress.applied_mnw)}) are progressing in balance. Keep learning. Keep applying. You are building the compound curve.`
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative px-6 md:px-16 py-14 border-b border-border overflow-hidden">
        <div className="pointer-events-none absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute right-12 bottom-5 font-serif text-[160px] font-bold text-white/[0.012] leading-none select-none">TFB</div>

        <div className="label text-gold mb-5 flex items-center gap-3">
          <span className="inline-block w-7 h-px bg-gold" />
          The First Billionaire Course · Edition 1 · Active
        </div>
        <h1 className="font-serif text-5xl md:text-[58px] font-light leading-[1.0] text-cream tracking-[-0.03em] mb-2 max-w-[620px]">
          Build the mind<br />of a <em className="not-italic text-gold-2">billionaire.</em><br /><strong className="font-semibold">From scratch.</strong>
        </h1>
        <p className="text-[14px] text-cream-2 leading-[1.8] max-w-[480px] mt-5 mb-9">
          Not a course. A complete cognitive rewiring. 23 domains. 9 pillars. Three levels of thinking. A dual-track Mental Net Worth system that tells you exactly where you are — and exactly what to do next.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onOpenDomain(1)}
            className="font-display font-bold text-[11px] tracking-[0.1em] uppercase px-6 py-3 rounded-sm bg-gold hover:bg-gold-2 text-ink transition-all hover:-translate-y-px"
          >
            Begin Domain 1 →
          </button>
          <button
            onClick={() => onOpenDomain(2)}
            className="font-display font-bold text-[11px] tracking-[0.1em] uppercase px-6 py-3 rounded-sm border border-border-3 text-cream-2 hover:border-cream-3 hover:text-cream transition-all"
          >
            All 23 Domains
          </button>
        </div>
      </div>

      {/* MNW Panel */}
      <div className="px-6 md:px-16 py-10 border-b border-border bg-ink-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">
          {[
            { label: 'Knowledge Net Worth', val: progress.knowledge_mnw, color: 'text-gold-2', sub: 'What you understand · What you can explain' },
            { label: 'Applied Net Worth',   val: progress.applied_mnw,   color: 'text-success-light', sub: 'What you\'ve used · What reality has confirmed' },
            { label: 'True Level (Lower)',  val: trueMNW,                color: 'text-cream',  sub: 'Your honest level · Cannot exceed applied' },
          ].map(c => (
            <div key={c.label} className="bg-ink-3 border border-border-2 rounded-[10px] p-6">
              <div className="label text-cream-4 mb-1">{c.label}</div>
              <div className={`font-serif text-4xl font-semibold leading-none mb-2 ${c.color}`}>{fmt(c.val)}</div>
              <div className="text-[11px] text-cream-2 leading-[1.6]">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-5">
          {[
            { label: 'Knowledge Track — Edition 1 Ceiling: $100,000', pct: kPct, bar: 'from-gold to-gold-3' },
            { label: 'Applied Track — Closes with real-world use',    pct: aPct, bar: 'from-success to-success-light' },
          ].map(t => (
            <div key={t.label}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="label text-cream-4">{t.label}</span>
                <span className="font-mono text-[10px] text-gold-2">{Math.round(t.pct)}%</span>
              </div>
              <div className="h-[6px] bg-ink-5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${t.bar} rounded-full transition-all duration-700`} style={{ width: `${t.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Diagnosis */}
        <div className="bg-ink-3 border border-border-2 rounded-[10px] p-5 flex items-start gap-4 mb-5">
          <span className="text-2xl flex-shrink-0 mt-0.5">{diagIcon}</span>
          <div>
            <div className="text-[13px] font-semibold text-cream mb-1">{diagTitle}</div>
            <div className="text-[12px] text-cream-2 leading-[1.75]">{diagText}</div>
            {progress.knowledge_mnw === 0 && (
              <button onClick={() => onOpenDomain(1)} className="label text-gold-2 hover:text-gold-3 mt-2 transition-colors inline-block">
                Start Domain 1 →
              </button>
            )}
          </div>
        </div>

        {/* Real NW input */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="label text-cream-4 whitespace-nowrap">Your Real Net Worth ($)</span>
          <input
            type="number"
            value={realNWInput}
            onChange={e => setRealNWInput(e.target.value)}
            placeholder="e.g. 45000"
            className="bg-ink-4 border border-border-2 rounded-sm px-[14px] py-2 text-cream font-mono text-[12px] w-[160px] outline-none focus:border-gold transition-colors"
          />
          <button
            onClick={() => onUpdateRealNW(parseFloat(realNWInput) || 0)}
            className="font-display font-bold text-[10px] tracking-[0.08em] uppercase px-4 py-2 rounded-sm bg-ink-4 border border-border-2 text-cream-2 hover:bg-ink-3 hover:text-cream transition-all"
          >
            Update
          </button>
          {progress.real_nw > 0 && (
            <span className="text-[11px] text-cream-3">
              Real NW: {fmt(progress.real_nw)} ·{' '}
              {progress.knowledge_mnw > progress.real_nw
                ? 'Knowledge ahead — apply more aggressively'
                : 'Results approaching ceiling — level up'}
            </span>
          )}
        </div>
      </div>

      {/* Edition Ladder */}
      <div className="px-6 md:px-16 py-10 border-b border-border">
        <div className="label text-gold mb-3 flex items-center gap-3">
          <span className="inline-block w-[22px] h-px bg-gold" />
          The Progression
        </div>
        <h2 className="font-serif text-[40px] font-light text-cream tracking-[-0.02em] mb-2 leading-[1.1]">
          Edition <em className="not-italic text-gold-2">Ladder</em>
        </h2>
        <p className="text-[13px] text-cream-2 leading-[1.7] max-w-[540px] mb-8">
          Each edition raises your ceiling. Your Mental Net Worth tells you when you're ready for the next one.
        </p>
        <div className="border border-border rounded-[10px] overflow-hidden divide-y divide-border">
          {EDITIONS.map(ed => (
            <div
              key={ed.n}
              className={`bg-ink-2 px-7 py-5 flex flex-wrap sm:flex-nowrap items-center gap-5 transition-colors hover:bg-ink-3 ${
                ed.status === 'active' ? 'border-l-[3px] border-gold' : ''
              } ${ed.status === 'locked' || ed.status === 'invite' ? 'opacity-40' : ''}`}
            >
              <span className="font-mono text-[10px] tracking-[0.1em] text-cream-5 w-[60px] flex-shrink-0">Ed. {ed.n}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-cream mb-0.5">{ed.name}</div>
                <div className="text-[11px] text-cream-2 leading-[1.5]">{ed.desc}</div>
              </div>
              <span className="font-serif text-xl font-semibold text-gold-2 w-[80px] text-right flex-shrink-0">{ed.ceiling}</span>
              <div className="w-[80px] text-right flex-shrink-0">
                <span className={`font-mono text-[8px] tracking-[0.12em] uppercase px-[10px] py-1 rounded-full ${
                  ed.status === 'active' ? 'bg-gold/15 text-gold-2' : 'bg-ink-4 text-cream-5'
                }`}>
                  {ed.status === 'active' ? 'Active' : ed.status === 'invite' ? 'Invite Only' : 'Locked'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured domains */}
      <div className="px-6 md:px-16 py-10 border-t border-border">
        <div className="label text-gold mb-3 flex items-center gap-3">
          <span className="inline-block w-[22px] h-px bg-gold" />
          Start Here
        </div>
        <h2 className="font-serif text-[40px] font-light text-cream tracking-[-0.02em] mb-2 leading-[1.1]">
          Foundation <em className="not-italic text-gold-2">Domains</em>
        </h2>
        <p className="text-[13px] text-cream-2 leading-[1.7] mb-8">The first six form the bedrock. Every other domain builds on these.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DOMAINS.slice(0, 6).map((d, i) => (
            <DomainCard key={d.n} domain={d} index={i} onOpen={onOpenDomain} isCompleted={completed.has(d.n)} />
          ))}
        </div>
      </div>
    </div>
  )
}
