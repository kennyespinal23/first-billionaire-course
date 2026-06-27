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
      className="bg-ink-2 border border-border rounded-[10px] p-[22px] text-left hover:border-opacity-60 hover:-translate-y-0.5 hover:bg-ink-3 transition-all duration-150 relative overflow-hidden group"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {/* Top color accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: d.c }} />

      <div className="font-mono text-[8px] tracking-[0.12em] text-cream-5 mb-3">Domain {String(d.n).padStart(2, '0')}</div>
      <div className="w-[38px] h-[38px] rounded-lg flex items-center justify-center text-[17px] mb-3 flex-shrink-0" style={{ background: `${d.c}18`, color: d.c }}>
        {d.i}
      </div>
      <div className="text-[12px] font-bold text-cream mb-[5px] leading-[1.3] tracking-[0.01em]">{d.name}</div>
      <div className="text-[11px] text-cream-2 leading-[1.65] mb-[14px]">{d.desc}</div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] text-cream-5">{d.mods}</span>
        <span className="font-mono text-[8px] px-2 py-0.5 rounded-full" style={{ background: `${d.c}18`, color: d.c }}>
          {isCompleted ? '✓ Complete' : 'Phase 01'}
        </span>
      </div>
    </button>
  )
}
