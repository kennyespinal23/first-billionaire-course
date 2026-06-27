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
    <div className="px-8 md:px-14 py-12">
      {/* Header */}
      <div className="inline-flex items-center gap-2 border border-stone-3/20 rounded-full px-4 py-1.5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#2DC97E' }} />
        <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">Applied Net Worth Engine</span>
      </div>

      <h1 className="font-sans font-bold text-[42px] md:text-[52px] text-stone tracking-[-0.03em] mb-2 leading-[0.93]">
        Application Journal
      </h1>
      <p className="text-[13px] font-sans text-stone-4 leading-[1.7] max-w-[520px] mb-10">
        Every time you use something you learned in a real decision — log it here. Reality-confirmed knowledge earns at 4× the rate of studied knowledge.
      </p>

      {/* Input */}
      <div className="flex gap-3 mb-6 max-w-[680px]">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="I used [concept] when making [decision] and it [result]..."
          className="flex-1 bg-white border border-canvas-3 rounded-full px-5 py-3.5 text-stone font-sans text-[13px] outline-none focus:border-stone-3 transition-colors placeholder-stone-5"
        />
        <button
          onClick={submit}
          disabled={loading || !input.trim()}
          className="font-sans font-bold text-[11px] tracking-[0.06em] uppercase px-6 py-3.5 rounded-full whitespace-nowrap transition-all disabled:opacity-40"
          style={{ background: '#2DC97E', color: 'white' }}
        >
          {loading ? 'Logging...' : 'Log +$2,000'}
        </button>
      </div>

      {/* Entries */}
      <div className="flex flex-col gap-2 max-w-[680px]">
        {entries.length === 0 ? (
          <div className="bg-white border border-canvas-3 rounded-[14px] p-8 text-center">
            <div className="text-3xl mb-3">✦</div>
            <div className="text-[13px] font-sans font-bold text-stone mb-1">No entries yet</div>
            <div className="text-[12px] font-sans text-stone-4">
              Every time you use something you learned — log it here. Each entry earns $2,000 in Applied Net Worth.
            </div>
          </div>
        ) : (
          entries.map(e => (
            <div key={e.id} className="bg-white border border-canvas-3 rounded-[14px] px-5 py-4 flex items-start gap-4">
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-[6px]" style={{ background: '#2DC97E' }} />
              <div className="flex-1 text-[13px] font-sans text-stone-3 leading-[1.65]">{e.text}</div>
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] font-sans text-stone-5">
                  {new Date(e.created_at).toLocaleDateString()}
                </div>
                <div className="text-[10px] font-sans font-bold mt-0.5" style={{ color: '#2DC97E' }}>
                  +{fmt(e.mnw_earned)} Applied
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
