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
    <div className="px-8 md:px-12 py-12">
      <div className="inline-flex items-center gap-2 border border-stone/10 rounded-full px-4 py-1.5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#E63B3B' }} />
        <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">Spaced Repetition</span>
      </div>

      <h1 className="font-sans font-extrabold text-[46px] md:text-[58px] text-stone tracking-[-0.03em] mb-3 leading-[0.93]">
        Daily Review
      </h1>
      <p className="text-[15px] font-sans font-medium text-stone leading-[1.65] max-w-[520px] mb-10">
        These concept cards are due for retrieval practice today. Trying to recall before you reveal is the entire mechanism. The struggle is the learning.
      </p>

      {due.length === 0 ? (
        <div className="bg-white border border-canvas-3 rounded-[16px] p-10 text-center max-w-[440px]">
          <div className="text-4xl mb-4">✓</div>
          <div className="text-[18px] font-sans font-extrabold text-stone mb-2">All caught up</div>
          <div className="text-[14px] font-sans font-medium text-stone">
            No cards due today. Complete more modules to build your review queue.
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-[680px]">
          {due.map(c => {
            const isRevealed = revealed.has(c.id)
            return (
              <div
                key={c.id}
                onClick={() => !isRevealed && reveal(c.id)}
                className={`bg-white border border-canvas-3 rounded-[16px] p-7 transition-all duration-150 ${
                  !isRevealed ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[10px] font-sans font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                    style={{ color: c.domain_color, background: `${c.domain_color}15` }}
                  >
                    {c.domain}
                  </span>
                  <span className="text-[11px] font-sans font-medium text-stone-4">Review #{c.interval_days}</span>
                </div>
                <div className="font-sans font-extrabold text-[20px] text-stone mb-2 leading-[1.2]">{c.concept}</div>
                {!isRevealed ? (
                  <div className="text-[13px] font-sans font-medium text-stone-4 italic">Click to reveal — try to recall first</div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-canvas-3">
                    <div className="text-[14px] font-sans font-medium text-stone leading-[1.75] mb-4">{c.body}</div>
                    <div className="flex flex-wrap gap-2" onClick={e => e.stopPropagation()}>
                      {[
                        { rating: 'easy'  as const, label: 'Remembered Easily', bg: 'rgba(45,201,126,0.1)',  color: '#2DC97E' },
                        { rating: 'hard'  as const, label: 'Struggled a Bit',   bg: 'rgba(245,166,35,0.12)', color: '#C47800' },
                        { rating: 'again' as const, label: 'Forgot — Again',    bg: 'rgba(230,59,59,0.1)',   color: '#E63B3B' },
                      ].map(btn => (
                        <button
                          key={btn.rating}
                          onClick={() => onRate(c.id, btn.rating)}
                          className="font-sans font-bold text-[11px] tracking-[0.06em] uppercase px-5 py-2 rounded-full transition-opacity hover:opacity-75"
                          style={{ background: btn.bg, color: btn.color }}
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
