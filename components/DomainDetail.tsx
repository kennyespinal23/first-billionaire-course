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

  // Only Domain 1 has full content right now
  if (domainN !== 1) {
    return (
      <div className="max-w-[800px] px-6 md:px-16 py-14 pb-24">
        <button onClick={onBack} className="flex items-center gap-2 font-mono text-[9px] tracking-[0.1em] text-cream-4 hover:text-cream-3 transition-colors mb-11 bg-none border-none cursor-pointer">
          ← Back to Domains
        </button>
        <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-3" style={{ color: d.c }}>
          Domain {String(d.n).padStart(2, '0')} · {d.name}
        </div>
        <h1 className="font-serif text-[48px] font-light text-cream tracking-[-0.03em] leading-[1.05] mb-3">{d.name}</h1>
        <p className="text-[15px] text-cream-2 leading-[1.65] mb-8 max-w-[560px]">{d.desc}</p>
        <div className="bg-ink-2 border border-border rounded-[10px] p-8 max-w-[500px]">
          <div className="font-mono text-[8px] tracking-[0.2em] uppercase mb-3" style={{ color: d.c }}>Coming in Next Build</div>
          <p className="text-[13px] text-cream-2 leading-[1.7]">
            Full content for this domain — all three thinking levels, required reading, video assignments, case studies, Socratic questions, and Outside the Box challenges — is being built out at complete depth. No limits, no summaries. The real thing.
          </p>
          <div className="font-mono text-[8px] text-cream-5 mt-4">{d.mods} · Three thinking levels · Full reading list · Case studies</div>
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
    <div className="max-w-[800px] px-6 md:px-16 py-14 pb-24">
      <button onClick={onBack} className="flex items-center gap-2 font-mono text-[9px] tracking-[0.1em] text-cream-4 hover:text-cream-3 transition-colors mb-11 bg-none border-none cursor-pointer">
        ← Back to Domains
      </button>

      <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-3" style={{ color: d.c }}>
        Domain 01 · {d.name}
      </div>
      <h1 className="font-serif text-[48px] font-light text-cream tracking-[-0.03em] leading-[1.05] mb-[10px]">{L.title}</h1>
      <p className="text-[15px] text-cream-2 leading-[1.65] mb-8 max-w-[560px]">{L.subtitle}</p>

      {/* Meta row */}
      <div className="flex flex-wrap gap-0 border-t border-b border-border mb-12">
        {[
          { label: 'Depth', val: L.time },
          { label: 'Levels', val: L.level, color: d.c },
          { label: 'Phase', val: L.phase },
          { label: 'MNW Earn', val: `+${fmt(L.mnwEarn)}`, color: '#6ab880' },
        ].map((m, i) => (
          <div key={i} className="py-[14px] pr-6 mr-6 border-r border-border last:border-r-0 last:mr-0">
            <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-cream-4 mb-[3px]">{m.label}</div>
            <div className="text-[12px] font-semibold" style={{ color: m.color || 'inherit' }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      {L.sections.map((s, i) => (
        <div key={i} className="mb-11">
          <div className="font-mono text-[8px] tracking-[0.22em] uppercase mb-1" style={{ color: d.c }}>{s.label}</div>
          <div className="h-[1.5px] w-6 rounded mb-4" style={{ background: d.c }} />
          <h3 className="font-serif text-2xl font-semibold text-cream mb-4 tracking-[-0.02em] leading-[1.2]">{s.heading}</h3>
          <div className="reading-body">
            {s.body.map((p, j) => <p key={j}>{p}</p>)}
          </div>
        </div>
      ))}

      {/* Three levels of thinking */}
      <div className="mb-11">
        <div className="font-mono text-[8px] tracking-[0.22em] uppercase mb-1" style={{ color: d.c }}>Three Levels of Thinking</div>
        <div className="h-[1.5px] w-6 rounded mb-4" style={{ background: d.c }} />
        <h3 className="font-serif text-2xl font-semibold text-cream mb-5 tracking-[-0.02em] leading-[1.2]">How this domain looks at each level of wealth</h3>

        <div className="flex gap-[2px] border-b border-border mb-7">
          {LEVEL_TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setLevel(t.id)}
              className={`font-mono text-[8px] tracking-[0.15em] uppercase px-[14px] py-[10px] border-b-2 mb-[-1px] transition-all ${
                level === t.id ? 'border-current' : 'border-transparent text-cream-4 hover:text-cream-3'
              }`}
              style={level === t.id ? { color: d.c, borderBottomColor: d.c } : {}}
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
      <div className="rounded-[10px] p-7 mb-7 relative" style={{ background: `${d.c}10` }}>
        <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[2px]" style={{ background: d.c }} />
        <div className="font-mono text-[8px] tracking-[0.2em] uppercase mb-[10px]" style={{ color: d.c }}>The One Thing To Carry</div>
        <blockquote className="font-serif text-[21px] font-semibold text-cream leading-[1.5] mb-5 italic">
          &ldquo;{L.carry}&rdquo;
        </blockquote>
        <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-cream-4 mb-[6px]">Question to sit with</div>
        <div className="text-[13px] text-cream-2 italic leading-[1.7]">{L.question}</div>
      </div>

      {/* Required reading */}
      <div className="bg-ink-3 border border-border-2 rounded-[10px] p-6 mb-7">
        <div className="font-mono text-[8px] tracking-[0.15em] uppercase px-[10px] py-1 rounded-full inline-block mb-3" style={{ background: `${d.c}18`, color: d.c }}>
          📖 Required Reading
        </div>
        <div className="text-[14px] font-bold text-cream mb-[3px]">{L.reading.title}</div>
        <div className="font-mono text-[9px] text-cream-5 mb-[10px]">by {L.reading.author}</div>
        <div className="text-[12px] text-cream-2 leading-[1.7]">{L.reading.why}</div>
      </div>

      {/* Socratic Engine */}
      <div className="bg-ink-3 border border-border-2 rounded-[10px] p-7 mb-7">
        <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-cream-4 mb-[14px]">
          Socratic Engine · Domain 01 · No right answer — only depth of thinking
        </div>
        <blockquote className="font-serif text-[19px] font-normal text-cream leading-[1.55] mb-5 italic">
          &ldquo;{L.quiz}&rdquo;
        </blockquote>
        <textarea
          value={socraticInput}
          onChange={e => setSocraticInput(e.target.value)}
          placeholder="Think before you write. Take your time. The struggle to articulate is the learning itself. Write what you actually think — not what sounds right..."
          className="w-full bg-ink-2 border border-border-2 rounded-sm px-4 py-3 text-cream font-body text-[13px] leading-[1.6] resize-y min-h-[110px] outline-none focus:border-gold transition-colors placeholder-cream-5 mb-[10px]"
        />
        <button
          onClick={submitSocratic}
          disabled={socraticLoading || !socraticInput.trim()}
          className="font-display font-bold text-[10px] tracking-[0.1em] uppercase px-5 py-[10px] rounded-sm bg-gold hover:bg-gold-2 text-ink transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {socraticLoading ? 'Thinking...' : 'Submit Answer →'}
        </button>
        {socraticResponse && (
          <div className="mt-4 bg-ink-2 border border-border-2 rounded-sm p-[18px]">
            <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-gold-2 mb-[10px]">Mentor Response</div>
            <div className="text-[13px] text-cream-2 leading-[1.75]">{socraticResponse}</div>
          </div>
        )}
      </div>

      {/* OTB Challenge */}
      <div className="bg-gradient-to-br from-gold/[0.07] to-gold/[0.02] border border-gold/20 rounded-[10px] p-7 mb-7">
        <div className="font-mono text-[8px] tracking-[0.25em] uppercase text-gold-2 mb-3">⚡ Outside The Box Challenge</div>
        <div className="font-serif text-xl font-normal text-cream leading-[1.55] mb-[14px] italic">&ldquo;{L.otb}&rdquo;</div>
        <div className="text-[12px] text-cream-2 leading-[1.7]">
          No Googling. No looking at what others have done. Your raw first-principles thinking on the page. Come back with your actual answer and we will pressure test it together in the mentorship session.
        </div>
      </div>

      {/* Complete button */}
      <div className="bg-ink-2 border border-border rounded-[10px] p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-cream-4 mb-1">Complete This Module</div>
          <div className="text-[13px] text-cream-2">
            Mark complete to earn +{fmt(L.mnwEarn)} Knowledge Net Worth and unlock your concept card
          </div>
        </div>
        <button
          onClick={handleComplete}
          disabled={completed}
          className={`font-display font-bold text-[11px] tracking-[0.1em] uppercase px-6 py-3 rounded-sm transition-all ${
            completed
              ? 'bg-success text-ink cursor-default'
              : 'bg-gold hover:bg-gold-2 text-ink hover:-translate-y-px'
          }`}
        >
          {completed ? '✓ Complete' : `Mark Complete +${fmt(L.mnwEarn)} →`}
        </button>
      </div>
    </div>
  )
}
