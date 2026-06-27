'use client'

import { useState } from 'react'
import type { ReviewCard } from '@/lib/types'

interface Props {
  cards: ReviewCard[]
  onReveal: (id: string) => void
  onRate: (id: string, rating: 'easy' | 'hard' | 'again') => void
}

export function ReviewView({ cards, onReveal, onRate }: Props) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const due = cards.filter(c => new Date(c.next_review_at) <= new Date())

  function reveal(id: string) {
    if (revealed.has(id)) return
    setRevealed(prev => new Set([...Array.from(prev), id]))
    onReveal(id)
  }

  return (
    <div className="px-6 md:px-16 py-10">
      <div className="label text-gold mb-3 flex items-center gap-3">
        <span className="inline-block w-[22px] h-px bg-gold" />
        Spaced Repetition
      </div>
      <h1 className="font-serif text-[40px] font-light text-cream tracking-[-0.02em] mb-2 leading-[1.1]">
        Daily <em className="not-italic text-gold-2">Review</em>
      </h1>
      <p className="text-[13px] text-cream-2 leading-[1.7] max-w-[560px] mb-8">
        These concept cards are due for retrieval practice today. Trying to recall before you reveal is the entire mechanism. The struggle is the learning.
      </p>

      {due.length === 0 ? (
        <div className="text-[14px] text-cream-2 py-5">
          No cards due today. Come back after completing more modules — or go learn something new.
        </div>
      ) : (
        <div className="flex flex-col gap-[10px] max-w-[680px]">
          {due.map(c => {
            const isRevealed = revealed.has(c.id)
            return (
              <div
                key={c.id}
                onClick={() => !isRevealed && reveal(c.id)}
                className={`bg-ink-2 border border-border rounded-[10px] p-6 transition-all duration-150 ${
                  !isRevealed ? 'hover:border-border-3 hover:bg-ink-3 cursor-pointer' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-[10px]">
                  <span className="font-mono text-[8px] tracking-[0.12em] uppercase" style={{ color: c.domain_color }}>
                    {c.domain}
                  </span>
                  <span className="font-mono text-[8px] text-cream-5">Review #{c.interval_days}</span>
                </div>
                <div className="font-serif text-xl font-semibold text-cream mb-[6px] leading-[1.2]">{c.concept}</div>
                {!isRevealed ? (
                  <div className="text-[12px] text-cream-4 italic">Click to reveal — try to recall first</div>
                ) : (
                  <div className="mt-[14px] pt-[14px] border-t border-border">
                    <div className="text-[13px] text-cream-2 leading-[1.7] mb-[14px]">{c.body}</div>
                    <div className="flex flex-wrap gap-2" onClick={e => e.stopPropagation()}>
                      {[
                        { rating: 'easy' as const, label: 'Remembered Easily', color: 'bg-success/15 text-success-light hover:bg-success/25' },
                        { rating: 'hard' as const, label: 'Struggled a Bit',   color: 'bg-gold/12 text-gold-2 hover:bg-gold/20' },
                        { rating: 'again' as const, label: 'Forgot — Again',   color: 'bg-danger/12 text-danger hover:bg-danger/20' },
                      ].map(btn => (
                        <button
                          key={btn.rating}
                          onClick={() => onRate(c.id, btn.rating)}
                          className={`font-display font-bold text-[10px] tracking-[0.08em] uppercase px-4 py-2 rounded-sm transition-all ${btn.color}`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
