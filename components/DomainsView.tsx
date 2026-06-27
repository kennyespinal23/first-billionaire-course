'use client'

import { DOMAINS } from '@/lib/data'
import { DomainCard } from './DomainCard'

interface Props {
  onOpenDomain: (n: number) => void
  completed: Set<number>
}

export function DomainsView({ onOpenDomain, completed }: Props) {
  return (
    <div className="px-8 md:px-14 py-12">
      <div className="inline-flex items-center gap-2 border border-stone-3/20 rounded-full px-4 py-1.5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF5C2B' }} />
        <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">Complete Curriculum</span>
      </div>
      <h1 className="font-sans font-bold text-[42px] md:text-[52px] text-stone tracking-[-0.03em] mb-2 leading-[0.93]">
        All 23 Domains
      </h1>
      <p className="text-[13px] font-sans text-stone-4 leading-[1.7] max-w-[540px] mb-10">
        No depth limits. Three thinking levels each. Required reading, video assignments, Socratic questions, case studies, and Outside the Box challenges. Click any domain to begin.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {DOMAINS.map((d, i) => (
          <DomainCard key={d.n} domain={d} index={i} onOpen={onOpenDomain} isCompleted={completed.has(d.n)} />
        ))}
      </div>
    </div>
  )
}
