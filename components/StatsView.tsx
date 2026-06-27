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
    <div className="px-8 md:px-12 py-12">
      <div className="inline-flex items-center gap-2 border border-stone/10 rounded-full px-4 py-1.5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#9B3FF4' }} />
        <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">Your Transformation</span>
      </div>

      <h1 className="font-sans font-extrabold text-[46px] md:text-[58px] text-stone tracking-[-0.03em] mb-3 leading-[0.93]">
        Progress & Streaks
      </h1>
      <p className="text-[15px] font-sans font-medium text-stone leading-[1.65] max-w-[520px] mb-2">
        The honest picture of where you are. Updated in real time.
      </p>
      <div className="text-[12px] font-sans font-medium text-stone-4 mb-10">{userEmail}</div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => (
          <div key={s.label} className="rounded-[16px] p-7 text-white" style={{ background: STAT_COLORS[i] }}>
            <div className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase opacity-65 mb-3">{s.label}</div>
            <div className="font-sans font-extrabold text-[44px] leading-none mb-1">{s.val}</div>
            <div className="text-[12px] font-sans font-medium opacity-65">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="inline-flex items-center gap-2 border border-stone/10 rounded-full px-4 py-1.5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#F5A623' }} />
        <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">Milestones</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {MILESTONES.map(m => {
          const earned = milestones.has(m.id)
          return (
            <div
              key={m.id}
              className={`bg-white border border-canvas-3 rounded-[16px] p-6 text-center transition-all ${
                earned ? 'shadow-sm' : 'opacity-35'
              }`}
            >
              <span className="text-3xl block mb-3">{m.icon}</span>
              <div className="text-[13px] font-sans font-extrabold text-stone mb-1">{m.name}</div>
              <div className="text-[11px] font-sans font-medium text-stone leading-[1.5]">{m.desc}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
