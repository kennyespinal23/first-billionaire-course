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
    <div className="px-8 md:px-12 py-12">
      <div className="inline-flex items-center gap-2 border border-stone/10 rounded-full px-4 py-1.5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#2DC97E' }} />
        <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">Applied Net Worth Engine</span>
      </div>

      <h1 className="font-sans font-extrabold text-[46px] md:text-[58px] text-stone tracking-[-0.03em] mb-3 leading-[0.93]">
        Application Journal
      </h1>
      <p className="text-[15px] font-sans font-medium text-stone leading-[1.65] max-w-[520px] mb-10">
        Every time you use something you learned in a real decision — log it here. Reality-confirmed knowledge earns at 4× the rate of studied knowledge.
      </p>

      <div className="flex gap-3 mb-8 max-w-[680px]">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="I used [concept] when making [decision] and it [result]..."
          className="flex-1 bg-white border border-canvas-3 rounded-full px-5 py-4 text-stone font-sans font-medium text-[14px] outline-none focus:border-stone/30 transition-colors placeholder-stone-4"
        />
        <button
          onClick={submit}
          disabled={loading || !input.trim()}
          className="font-sans font-bold text-[11px] tracking-[0.06em] uppercase px-6 py-4 rounded-full whitespace-nowrap transition-opacity disabled:opacity-40"
          style={{ background: '#2DC97E', color: 'white' }}
        >
          {loading ? 'Logging...' : 'Log +$2,000'}
        </button>
      </div>

      <div className="flex flex-col gap-3 max-w-[680px]">
        {entries.length === 0 ? (
          <div className="bg-white border border-canvas-3 rounded-[16px] p-10 text-center">
            <div className="text-3xl mb-3">✦</div>
            <div className="text-[18px] font-sans font-extrabold text-stone mb-2">No entries yet</div>
            <div className="text-[14px] font-sans font-medium text-stone">
              Every time you apply something you learned — log it here. Each entry earns $2,000 in Applied Net Worth.
            </div>
          </div>
        ) : (
          entries.map(e => (
            <div key={e.id} className="bg-white border border-canvas-3 rounded-[14px] px-6 py-5 flex items-start gap-4">
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-[6px]" style={{ background: '#2DC97E' }} />
              <div className="flex-1 text-[14px] font-sans font-medium text-stone leading-[1.65]">{e.text}</div>
              <div className="text-right flex-shrink-0">
                <div className="text-[11px] font-sans text-stone-4">
                  {new Date(e.created_at).toLocaleDateString()}
                </div>
                <div className="text-[11px] font-sans font-bold mt-0.5" style={{ color: '#2DC97E' }}>
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
