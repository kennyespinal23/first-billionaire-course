'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV_COLORS = ['#4B6CF7', '#FF5C2B', '#E63B3B', '#2DC97E', '#9B3FF4']

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const supabase = createClient()
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/dashboard')
      router.refresh()
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      })
      if (error) { setError(error.message); setLoading(false); return }
      setSuccess('Check your email to confirm your account.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-canvas flex">
      {/* Left panel — colored card stack (decorative) */}
      <div className="hidden lg:flex flex-col w-[320px] min-h-screen" style={{ background: '#0A0909' }}>
        <div className="px-8 pt-10 pb-8">
          <div className="text-white font-sans font-bold text-[28px] leading-none tracking-[-0.04em] mb-1">TFB.</div>
          <div className="text-[9px] font-sans font-semibold tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
            The First Billionaire Course
          </div>
        </div>

        <div className="px-5 flex flex-col gap-[5px]">
          {[
            { n: '01', label: 'Command Center' },
            { n: '02', label: '23 Domains' },
            { n: '03', label: 'Daily Review' },
            { n: '04', label: 'Application Journal' },
            { n: '05', label: 'Progress & Streaks' },
          ].map((item, i) => (
            <div
              key={item.n}
              className="w-full rounded-[10px] p-[13px] flex flex-col justify-between"
              style={{ background: NAV_COLORS[i], minHeight: '80px', opacity: 0.7 }}
            >
              <div className="flex items-start justify-between">
                <span className="text-white font-sans font-bold text-[12px] leading-none opacity-80">{item.n}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60">
                  <path d="M1 11L11 1M11 1H4M11 1V8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-white font-sans font-bold text-[12px] leading-[1.2]">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-auto px-8 pb-10">
          <div className="text-[11px] font-sans leading-[1.7]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Edition 1 · The Foundation<br />
            Ceiling $100,000 MNW
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[380px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <div className="text-stone font-sans font-bold text-[28px] leading-none tracking-[-0.04em] mb-1">TFB.</div>
            <div className="text-[10px] font-sans font-semibold tracking-[0.14em] uppercase text-stone-4">
              The First Billionaire Course
            </div>
          </div>

          {/* Heading */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 border border-stone-3/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4B6CF7' }} />
              <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase text-stone-4">
                Edition 1 · The Foundation
              </span>
            </div>
            <h1 className="font-sans font-bold text-[40px] leading-[0.93] tracking-[-0.03em] text-stone">
              {mode === 'signin' ? 'Welcome\nback.' : 'Create your\naccount.'}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-sans font-bold tracking-[0.1em] uppercase text-stone-4 block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white border border-canvas-3 rounded-full px-5 py-3.5 text-stone font-sans text-[14px] outline-none focus:border-stone-3 transition-colors placeholder-stone-5"
              />
            </div>
            <div>
              <label className="text-[11px] font-sans font-bold tracking-[0.1em] uppercase text-stone-4 block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-white border border-canvas-3 rounded-full px-5 py-3.5 text-stone font-sans text-[14px] outline-none focus:border-stone-3 transition-colors placeholder-stone-5"
              />
            </div>

            {error && (
              <div className="text-[12px] font-sans bg-white border border-canvas-3 rounded-[10px] px-4 py-3" style={{ color: '#E63B3B' }}>
                {error}
              </div>
            )}
            {success && (
              <div className="text-[12px] font-sans bg-white border border-canvas-3 rounded-[10px] px-4 py-3" style={{ color: '#2DC97E' }}>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-sans font-bold text-[12px] tracking-[0.06em] uppercase py-4 rounded-full text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{ background: '#0A0909' }}
            >
              {loading ? 'Working...' : mode === 'signin' ? 'Enter →' : 'Create Account →'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setMode(m => m === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess('') }}
              className="text-[12px] font-sans font-semibold text-stone-4 hover:text-stone-3 transition-colors"
            >
              {mode === 'signin' ? 'No account? Create one →' : '← Back to sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
