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
      className="bg-white border border-canvas-3 rounded-[16px] p-8 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 relative overflow-hidden flex flex-col min-h-[280px] group"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {/* Colored top border */}
      <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: d.c }} />

      {/* Domain label */}
      <div className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-5 mb-5">
        Domain {String(d.n).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-[12px] flex items-center justify-center text-[26px] mb-5 flex-shrink-0"
        style={{ background: `${d.c}18` }}
      >
        {d.i}
      </div>

      {/* Title */}
      <div className="text-[19px] font-sans font-extrabold text-stone mb-3 leading-[1.2] tracking-[-0.01em]">
        {d.name}
      </div>

      {/* Description — near black, not grey */}
      <div className="text-[13px] font-sans text-stone-2 leading-[1.65] flex-1">
        {d.desc}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-canvas-3">
        <span className="text-[11px] font-sans text-stone-4">{d.mods}</span>
        <span
          className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full border"
          style={
            isCompleted
              ? { color: d.c, borderColor: `${d.c}40`, background: `${d.c}0D` }
              : { color: '#A09C96', borderColor: '#D8D8D0', background: 'transparent' }
          }
        >
          {isCompleted ? '✓ Complete' : 'Phase 01'}
        </span>
      </div>
    </button>
  )
}
