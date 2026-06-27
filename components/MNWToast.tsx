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

  const color = type === 'applied' ? '#2DC97E' : '#4B6CF7'

  return (
    <div
      className={`fixed bottom-24 lg:bottom-6 right-4 lg:right-6 bg-white border border-canvas-3 rounded-[14px] px-5 py-4 flex items-center gap-4 z-[1000] shadow-xl transition-all duration-300 max-w-[calc(100vw-32px)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div
        className="font-sans font-bold text-[22px] leading-none"
        style={{ color }}
      >
        +{fmt(amount)}
      </div>
      <div>
        <div className="text-[13px] font-sans font-bold text-stone">{title}</div>
        <div className="text-[11px] font-sans text-stone-4 mt-0.5">{sub}</div>
      </div>
    </div>
  )
}
