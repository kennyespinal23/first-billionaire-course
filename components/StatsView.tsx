'use client'

import { MILESTONES } from '@/lib/data'
import type { UserProgress } from '@/lib/types'

interface Props {
  progress: UserProgress
  milestones: Set<string>
  userEmail: string
}

export function StatsView({ progress, milestones, userEmail }: Props) {
  const stats = [
    { label: 'Day Streak',         val: progress.streak,      sub: 'Consecutive days' },
    { label: 'Concepts Owned',     val: progress.concepts,    sub: 'In permanent memory' },
    { label: 'Modules Complete',   val: progress.modules,     sub: 'Of 23 domains' },
    { label: 'Applications Logged',val: progress.applications,sub: 'Real-world uses' },
  ]

  return (
    <div className="px-6 md:px-16 py-10 border-b border-border">
      <div className="label text-gold mb-3 flex items-center gap-3">
        <span className="inline-block w-[22px] h-px bg-gold" />
        Your Transformation
      </div>
      <h1 className="font-serif text-[40px] font-light text-cream tracking-[-0.02em] mb-2 leading-[1.1]">
        Progress <em className="not-italic text-gold-2">&amp;</em> Streaks
      </h1>
      <p className="text-[13px] text-cream-2 leading-[1.7] max-w-[560px] mb-8">
        The honest picture of where you are. Updated in real time as you learn and apply.
      </p>

      <div className="text-[11px] text-cream-4 font-mono mb-8">{userEmail}</div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-ink-2 border border-border rounded-[10px] p-5">
            <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-cream-4 mb-2">{s.label}</div>
            <div className="font-serif text-4xl font-semibold text-cream leading-none mb-1">{s.val}</div>
            <div className="text-[11px] text-cream-2">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="label text-gold mb-4 flex items-center gap-3">
        <span className="inline-block w-[22px] h-px bg-gold" />
        Milestones
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[10px]">
        {MILESTONES.map(m => {
          const earned = milestones.has(m.id)
          return (
            <div
              key={m.id}
              className={`bg-ink-2 border rounded-[10px] p-4 text-center transition-all ${
                earned ? 'border-border-3 bg-ink-3' : 'border-border opacity-35'
              }`}
            >
              <span className="text-2xl block mb-2">{m.icon}</span>
              <div className="text-[11px] font-bold text-cream mb-[3px]">{m.name}</div>
              <div className="text-[10px] text-cream-4 leading-[1.5]">{m.desc}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
