'use client'

import { useState } from 'react'
import { fmt } from '@/lib/data'
import type { JournalEntry } from '@/lib/types'

interface Props {
  entries: JournalEntry[]
  onAdd: (text: string) => Promise<void>
}

export function JournalView({ entries, onAdd }: Props) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!input.trim() || loading) return
    setLoading(true)
    await onAdd(input.trim())
    setInput('')
    setLoading(false)
  }

  return (
    <div className="px-6 md:px-16 py-10 border-b border-border">
      <div className="label text-gold mb-3 flex items-center gap-3">
        <span className="inline-block w-[22px] h-px bg-gold" />
        Applied Net Worth Engine
      </div>
      <h1 className="font-serif text-[40px] font-light text-cream tracking-[-0.02em] mb-2 leading-[1.1]">
        Application <em className="not-italic text-gold-2">Journal</em>
      </h1>
      <p className="text-[13px] text-cream-2 leading-[1.7] max-w-[560px] mb-8">
        Every time you use something you learned in a real decision — log it here. This is how your Applied Net Worth grows. Reality-confirmed knowledge earns at 4× the rate of studied knowledge.
      </p>

      <div className="flex gap-[10px] mb-4 max-w-[680px]">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="I used [concept] when making [decision] and it [result]..."
          className="flex-1 bg-ink-2 border border-border-2 rounded-sm px-4 py-3 text-cream font-body text-[13px] outline-none focus:border-gold transition-colors placeholder-cream-5"
        />
        <button
          onClick={submit}
          disabled={loading || !input.trim()}
          className="font-display font-bold text-[10px] tracking-[0.08em] uppercase px-[18px] py-3 rounded-sm bg-ink-3 border border-border-2 text-cream-2 hover:bg-gold hover:text-ink hover:border-gold whitespace-nowrap transition-all disabled:opacity-50"
        >
          {loading ? 'Logging...' : 'Log Application +$2,000'}
        </button>
      </div>

      <div className="flex flex-col gap-2 max-w-[680px]">
        {entries.length === 0 ? (
          <div className="text-[13px] text-cream-4 italic py-2">
            No entries yet. Every time you use something you learned in a real decision — log it here.
          </div>
        ) : (
          entries.map(e => (
            <div key={e.id} className="bg-ink-2 border border-border rounded-sm px-4 py-[14px] flex items-start gap-3">
              <div className="w-[5px] h-[5px] rounded-full bg-gold flex-shrink-0 mt-[7px]" />
              <div className="flex-1 text-[13px] text-cream-2 leading-[1.6]">{e.text}</div>
              <div className="text-right flex-shrink-0">
                <div className="font-mono text-[8px] text-cream-5">
                  {new Date(e.created_at).toLocaleDateString()}
                </div>
                <div className="font-mono text-[9px] text-success-light mt-0.5">+{fmt(e.mnw_earned)} Applied</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
