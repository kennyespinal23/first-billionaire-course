'use client'

import { DOMAINS } from '@/lib/data'
import { DomainCard } from './DomainCard'

interface Props {
  onOpenDomain: (n: number) => void
  completed: Set<number>
}

export function DomainsView({ onOpenDomain, completed }: Props) {
  return (
    <div className="px-6 md:px-16 py-10">
      <div className="label text-gold mb-3 flex items-center gap-3">
        <span className="inline-block w-[22px] h-px bg-gold" />
        Complete Curriculum
      </div>
      <h1 className="font-serif text-[40px] font-light text-cream tracking-[-0.02em] mb-2 leading-[1.1]">
        All <em className="not-italic text-gold-2">23</em> Domains
      </h1>
      <p className="text-[13px] text-cream-2 leading-[1.7] max-w-[560px] mb-8">
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
