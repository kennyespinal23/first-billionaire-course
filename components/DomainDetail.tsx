'use client'

import { useState } from 'react'
import { DOMAINS, DOMAIN_1, fmt } from '@/lib/data'
import type { ThinkingLevel } from '@/lib/types'

interface Props {
  domainN: number
  onBack: () => void
  onComplete: (n: number, earn: number) => void
  onEarnKnowledge: (amount: number, title: string, sub: string) => void
  isCompleted: boolean
}

export function DomainDetail({ domainN, onBack, onComplete, onEarnKnowledge, isCompleted }: Props) {
  const d = DOMAINS.find(x => x.n === domainN)!
  const [level, setLevel] = useState<ThinkingLevel>('millionaire')
  const [socraticInput, setSocraticInput] = useState('')
  const [socraticResponse, setSocraticResponse] = useState('')
  const [socraticLoading, setSocraticLoading] = useState(false)
  const [completed, setCompleted] = useState(isCompleted)

  if (domainN !== 1) {
    return (
      <div className="max-w-[800px] px-8 md:px-14 py-14 pb-24">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] font-sans font-semibold text-stone-4 hover:text-stone-3 transition-colors mb-10"
        >
          ← Back to Domains
        </button>
        <div className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase mb-3" style={{ color: d.c }}>
          Domain {String(d.n).padStart(2, '0')} · {d.name}
        </div>
        <h1 className="font-sans font-bold text-[42px] text-stone tracking-[-0.03em] leading-[0.95] mb-4">{d.name}</h1>
        <p className="text-[15px] font-sans text-stone-4 leading-[1.65] mb-8 max-w-[540px]">{d.desc}</p>
        <div className="bg-white border border-canvas-3 rounded-[14px] p-8 max-w-[500px]">
          <div
            className="text-[9px] font-sans font-bold tracking-[0.18em] uppercase mb-3"
            style={{ color: d.c }}
          >
            Coming in Next Build
          </div>
          <p className="text-[13px] font-sans text-stone-3 leading-[1.7]">
            Full content for this domain — all three thinking levels, required reading, video assignments, case studies, Socratic questions, and Outside the Box challenges — is being built out at complete depth. No limits, no summaries. The real thing.
          </p>
          <div className="text-[10px] font-sans text-stone-5 mt-4">{d.mods} · Three thinking levels · Full reading list · Case studies</div>
        </div>
      </div>
    )
  }

  const L = DOMAIN_1

  function submitSocratic() {
    if (!socraticInput.trim()) return
    setSocraticLoading(true)
    onEarnKnowledge(750, 'Socratic Answer Submitted', 'Interrogation in progress')
    setTimeout(() => {
      setSocraticResponse("Good. You are beginning to think in the right direction. Now I want you to go one level deeper. You described what you would do — but you have not yet explained the psychological mechanism that makes it work. Go back to the Pattern Interruption section. Apply that specific framework to each tactic you named. What pattern are you breaking? Whose prediction are you interrupting? And what does that moment feel like for the person whose thumb stops? Rewrite your answer with that lens applied and resubmit. The first answer is always the surface. The real thinking is in the second draft. That is where the +$1,000 Knowledge bonus lives.")
      setSocraticLoading(false)
    }, 1400)
  }

  function handleComplete() {
    if (completed) return
    setCompleted(true)
    onComplete(domainN, L.mnwEarn)
  }

  const LEVEL_TABS: { id: ThinkingLevel; label: string }[] = [
    { id: 'millionaire',     label: 'Millionaire Mind' },
    { id: 'decamillionaire', label: 'Decamillionaire Mind' },
    { id: 'billionaire',     label: 'Billionaire Mind' },
  ]

  return (
    <div className="max-w-[800px] px-8 md:px-14 py-14 pb-24">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[11px] font-sans font-semibold text-stone-4 hover:text-stone-3 transition-colors mb-10"
      >
        ← Back to Domains
      </button>

      <div className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase mb-3" style={{ color: d.c }}>
        Domain 01 · {d.name}
      </div>
      <h1 className="font-sans font-bold text-[42px] text-stone tracking-[-0.03em] leading-[0.95] mb-3">{L.title}</h1>
      <p className="text-[15px] font-sans text-stone-4 leading-[1.65] mb-8 max-w-[560px]">{L.subtitle}</p>

      {/* Meta row */}
      <div className="flex flex-wrap gap-0 border-t border-b border-canvas-3 mb-12">
        {[
          { label: 'Depth',   val: L.time },
          { label: 'Levels',  val: L.level,           color: d.c },
          { label: 'Phase',   val: L.phase },
          { label: 'MNW Earn',val: `+${fmt(L.mnwEarn)}`, color: '#2DC97E' },
        ].map((m, i) => (
          <div key={i} className="py-4 pr-6 mr-6 border-r border-canvas-3 last:border-r-0 last:mr-0">
            <div className="text-[9px] font-sans font-bold tracking-[0.16em] uppercase text-stone-5 mb-1">{m.label}</div>
            <div className="text-[12px] font-sans font-bold" style={{ color: m.color || '#363532' }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      {L.sections.map((s, i) => (
        <div key={i} className="mb-11">
          <div className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase mb-1" style={{ color: d.c }}>{s.label}</div>
          <div className="h-[2px] w-6 rounded mb-4" style={{ background: d.c }} />
          <h3 className="font-sans font-bold text-[22px] text-stone mb-4 tracking-[-0.02em] leading-[1.2]">{s.heading}</h3>
          <div className="reading-body">
            {s.body.map((p, j) => <p key={j}>{p}</p>)}
          </div>
        </div>
      ))}

      {/* Three levels of thinking */}
      <div className="mb-11">
        <div className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase mb-1" style={{ color: d.c }}>Three Levels of Thinking</div>
        <div className="h-[2px] w-6 rounded mb-4" style={{ background: d.c }} />
        <h3 className="font-sans font-bold text-[22px] text-stone mb-5 tracking-[-0.02em] leading-[1.2]">
          How this domain looks at each level of wealth
        </h3>

        <div className="flex gap-px border-b border-canvas-3 mb-7">
          {LEVEL_TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setLevel(t.id)}
              className="text-[10px] font-sans font-bold tracking-[0.12em] uppercase px-4 py-3 border-b-2 mb-[-1px] transition-all"
              style={
                level === t.id
                  ? { color: d.c, borderBottomColor: d.c }
                  : { color: '#A09C96', borderBottomColor: 'transparent' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="reading-body">
          {L.levels[level].map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>

      {/* Carry block */}
      <div className="rounded-[14px] p-7 mb-7 relative" style={{ background: `${d.c}0D` }}>
        <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[2px]" style={{ background: d.c }} />
        <div className="text-[9px] font-sans font-bold tracking-[0.18em] uppercase mb-3" style={{ color: d.c }}>
          The One Thing To Carry
        </div>
        <blockquote className="font-serif text-[21px] font-semibold text-stone leading-[1.5] mb-5 italic">
          &ldquo;{L.carry}&rdquo;
        </blockquote>
        <div className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4 mb-2">Question to sit with</div>
        <div className="text-[13px] font-sans text-stone-3 italic leading-[1.7]">{L.question}</div>
      </div>

      {/* Required reading */}
      <div className="bg-white border border-canvas-3 rounded-[14px] p-6 mb-7">
        <div
          className="text-[9px] font-sans font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full inline-block mb-4"
          style={{ background: `${d.c}15`, color: d.c }}
        >
          📖 Required Reading
        </div>
        <div className="text-[15px] font-sans font-bold text-stone mb-1">{L.reading.title}</div>
        <div className="text-[11px] font-sans text-stone-5 mb-3">by {L.reading.author}</div>
        <div className="text-[13px] font-sans text-stone-3 leading-[1.7]">{L.reading.why}</div>
      </div>

      {/* Socratic Engine */}
      <div className="bg-white border border-canvas-3 rounded-[14px] p-7 mb-7">
        <div className="text-[9px] font-sans font-bold tracking-[0.18em] uppercase text-stone-5 mb-4">
          Socratic Engine · Domain 01 · No right answer — only depth of thinking
        </div>
        <blockquote className="font-serif text-[19px] font-normal text-stone leading-[1.55] mb-5 italic">
          &ldquo;{L.quiz}&rdquo;
        </blockquote>
        <textarea
          value={socraticInput}
          onChange={e => setSocraticInput(e.target.value)}
          placeholder="Think before you write. Take your time. The struggle to articulate is the learning itself. Write what you actually think — not what sounds right..."
          className="w-full bg-canvas-2 border border-canvas-3 rounded-[10px] px-4 py-3 text-stone font-sans text-[13px] leading-[1.6] resize-y min-h-[110px] outline-none focus:border-stone-3 transition-colors placeholder-stone-5 mb-3"
        />
        <button
          onClick={submitSocratic}
          disabled={socraticLoading || !socraticInput.trim()}
          className="font-sans font-bold text-[11px] tracking-[0.08em] uppercase px-6 py-3 rounded-full text-white transition-all disabled:opacity-40"
          style={{ background: d.c }}
        >
          {socraticLoading ? 'Thinking...' : 'Submit Answer →'}
        </button>
        {socraticResponse && (
          <div className="mt-4 bg-canvas-2 border border-canvas-3 rounded-[10px] p-5">
            <div
              className="text-[9px] font-sans font-bold tracking-[0.16em] uppercase mb-3"
              style={{ color: d.c }}
            >
              Mentor Response
            </div>
            <div className="text-[13px] font-sans text-stone-3 leading-[1.75]">{socraticResponse}</div>
          </div>
        )}
      </div>

      {/* OTB Challenge */}
      <div className="bg-white border border-canvas-3 rounded-[14px] p-7 mb-7" style={{ borderLeftWidth: '3px', borderLeftColor: '#FFB200' }}>
        <div className="text-[9px] font-sans font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#CC8800' }}>
          ⚡ Outside The Box Challenge
        </div>
        <div className="font-serif text-[20px] font-normal text-stone leading-[1.55] mb-4 italic">
          &ldquo;{L.otb}&rdquo;
        </div>
        <div className="text-[12px] font-sans text-stone-4 leading-[1.7]">
          No Googling. No looking at what others have done. Your raw first-principles thinking on the page. Come back with your actual answer and we will pressure test it together in the mentorship session.
        </div>
      </div>

      {/* Complete button */}
      <div className="bg-white border border-canvas-3 rounded-[14px] p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-sans font-bold tracking-[0.14em] uppercase text-stone-5 mb-1">Complete This Module</div>
          <div className="text-[13px] font-sans text-stone-3">
            Mark complete to earn +{fmt(L.mnwEarn)} Knowledge Net Worth and unlock your concept card
          </div>
        </div>
        <button
          onClick={handleComplete}
          disabled={completed}
          className="font-sans font-bold text-[11px] tracking-[0.08em] uppercase px-7 py-3 rounded-full text-white transition-all disabled:opacity-70"
          style={{ background: completed ? '#2DC97E' : d.c }}
        >
          {completed ? '✓ Complete' : `Mark Complete +${fmt(L.mnwEarn)} →`}
        </button>
      </div>
    </div>
  )
}
