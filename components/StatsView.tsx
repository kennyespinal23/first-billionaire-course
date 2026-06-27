'use client'

import { MILESTONES } from '@/lib/data'
import type { UserProgress } from '@/lib/types'

interface Props {
  progress: UserProgress
  milestones: Set<string>
  userEmail: string
}

const STAT_COLORS = ['#4B6CF7', '#2DC97E', '#FF5C2B', '#9B3FF4']

export function StatsView({ progress, milestones, userEmail }: Props) {
  const stats = [
    { label: 'Day Streak',          val: progress.streak,       sub: 'Consecutive days' },
    { label: 'Concepts Owned',      val: progress.concepts,     sub: 'In permanent memory' },
    { label: 'Modules Complete',    val: progress.modules,      sub: 'Of 23 domains' },
    { label: 'Applications Logged', val: progress.applications, sub: 'Real-world uses' },
  ]

  return (
    <div className="px-8 md:px-14 py-12">
      {/* Header */}
      <div className="inline-flex items-center gap-2 border border-stone-3/20 rounded-full px-4 py-1.5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#9B3FF4' }} />
        <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">Your Transformation</span>
      </div>

      <h1 className="font-sans font-bold text-[42px] md:text-[52px] text-stone tracking-[-0.03em] mb-2 leading-[0.93]">
        Progress & Streaks
      </h1>
      <p className="text-[13px] font-sans text-stone-4 leading-[1.7] max-w-[520px] mb-3">
        The honest picture of where you are. Updated in real time as you learn and apply.
      </p>
      <div className="text-[11px] font-sans text-stone-5 mb-10">{userEmail}</div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="rounded-[14px] p-6 text-white"
            style={{ background: STAT_COLORS[i] }}
          >
            <div className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase opacity-70 mb-3">{s.label}</div>
            <div className="font-sans font-bold text-[40px] leading-none mb-1">{s.val}</div>
            <div className="text-[11px] font-sans opacity-65">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div className="inline-flex items-center gap-2 border border-stone-3/20 rounded-full px-4 py-1.5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FFB200' }} />
        <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">Milestones</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {MILESTONES.map(m => {
          const earned = milestones.has(m.id)
          return (
            <div
              key={m.id}
              className={`bg-white border rounded-[14px] p-5 text-center transition-all ${
                earned ? 'border-canvas-3 shadow-sm' : 'border-canvas-3 opacity-35'
              }`}
            >
              <span className="text-2xl block mb-3">{m.icon}</span>
              <div className="text-[12px] font-sans font-bold text-stone mb-1">{m.name}</div>
              <div className="text-[10px] font-sans text-stone-4 leading-[1.5]">{m.desc}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
