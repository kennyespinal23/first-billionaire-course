'use client'

import type { Domain } from '@/lib/types'

interface Props {
  domain: Domain
  index: number
  onOpen: (n: number) => void
  isCompleted: boolean
}

export function DomainCard({ domain: d, index, onOpen, isCompleted }: Props) {
  return (
    <button
      onClick={() => onOpen(d.n)}
      className="bg-white border border-canvas-3 rounded-[14px] p-6 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 relative overflow-hidden group"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {/* Color top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: d.c }}
      />

      <div className="text-[9px] font-sans font-bold tracking-[0.14em] uppercase text-stone-5 mb-4">
        Domain {String(d.n).padStart(2, '0')}
      </div>
      <div
        className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[17px] mb-4 flex-shrink-0"
        style={{ background: `${d.c}18`, color: d.c }}
      >
        {d.i}
      </div>
      <div className="text-[13px] font-sans font-bold text-stone mb-1.5 leading-[1.25]">{d.name}</div>
      <div className="text-[11px] font-sans text-stone-4 leading-[1.65] mb-5">{d.desc}</div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-sans text-stone-5">{d.mods}</span>
        <span
          className="text-[9px] font-sans font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
          style={{
            background: isCompleted ? `${d.c}15` : '#E2E2DA',
            color: isCompleted ? d.c : '#A09C96',
          }}
        >
          {isCompleted ? '✓ Complete' : 'Phase 01'}
        </span>
      </div>
    </button>
  )
}
