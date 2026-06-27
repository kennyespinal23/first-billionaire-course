'use client'

import { useEffect, useState } from 'react'
import { fmt } from '@/lib/data'

interface Props {
  amount: number
  title: string
  sub: string
  type: 'knowledge' | 'applied'
  onDone: () => void
}

export function MNWToast({ amount, title, sub, type, onDone }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => { setVisible(false); setTimeout(onDone, 300) }, 3200)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div
      className={`fixed bottom-24 lg:bottom-6 right-4 lg:right-6 bg-ink-3 border border-border-2 rounded-[10px] px-4 py-3 flex items-center gap-3 z-[1000] shadow-xl transition-all duration-300 max-w-[calc(100vw-32px)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`font-serif text-[22px] font-semibold leading-none ${type === 'applied' ? 'text-success-light' : 'text-gold-2'}`}>
        +{fmt(amount)}
      </div>
      <div>
        <div className="text-[12px] font-semibold text-cream">{title}</div>
        <div className="text-[11px] text-cream-2 mt-0.5">{sub}</div>
      </div>
    </div>
  )
}
