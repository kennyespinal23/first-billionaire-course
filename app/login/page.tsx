'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[120px]" />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="label text-gold mb-2">The First</div>
          <h1 className="font-serif text-4xl font-light text-cream tracking-[-0.02em] leading-tight">
            Billionaire<br />Course
          </h1>
          <div className="label text-cream-4 mt-3">Edition 1 · The Foundation</div>
        </div>

        {/* Card */}
        <div className="bg-ink-2 border border-border rounded-[10px] p-8">
          <div className="label text-gold mb-6">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-ink-3 border border-border-2 rounded-sm px-4 py-3 text-cream text-sm font-body placeholder-cream-4 outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="label block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-ink-3 border border-border-2 rounded-sm px-4 py-3 text-cream text-sm font-body placeholder-cream-4 outline-none focus:border-gold transition-colors"
              />
            </div>

            {error && (
              <div className="text-danger text-xs font-body bg-danger/10 border border-danger/20 rounded-sm px-3 py-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-success-light text-xs font-body bg-success/10 border border-success/20 rounded-sm px-3 py-2">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-2 text-ink font-display font-bold text-xs tracking-[0.1em] uppercase py-3 rounded-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Working...' : mode === 'signin' ? 'Enter →' : 'Create Account →'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => { setMode(m => m === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess('') }}
              className="label text-cream-3 hover:text-cream-2 transition-colors"
            >
              {mode === 'signin' ? 'No account? Create one →' : '← Back to sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
