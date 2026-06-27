'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'
import { DashboardView } from './DashboardView'
import { DomainsView } from './DomainsView'
import { DomainDetail } from './DomainDetail'
import { ReviewView } from './ReviewView'
import { JournalView } from './JournalView'
import { StatsView } from './StatsView'
import { MNWToast } from './MNWToast'
import { createClient } from '@/lib/supabase/client'
import { CEILING, MILESTONES, fmt, getLevel, KNOWLEDGE_LEVELS } from '@/lib/data'
import type {
  UserProgress, JournalEntry, ReviewCard, MilestoneRecord,
  CompletedModule, AppView,
} from '@/lib/types'

interface Props {
  userId: string
  userEmail: string
  initialProgress: UserProgress
  initialJournal: JournalEntry[]
  initialReviewCards: ReviewCard[]
  initialMilestones: MilestoneRecord[]
  initialCompleted: CompletedModule[]
}

interface Toast {
  amount: number
  title: string
  sub: string
  type: 'knowledge' | 'applied'
}

export function AppShell({
  userId, userEmail,
  initialProgress, initialJournal, initialReviewCards,
  initialMilestones, initialCompleted,
}: Props) {
  const [view, setView] = useState<AppView>('dash')
  const [activeDomainN, setActiveDomainN] = useState<number | null>(null)
  const [progress, setProgress] = useState<UserProgress>(initialProgress)
  const [journal, setJournal] = useState<JournalEntry[]>(initialJournal)
  const [reviewCards, setReviewCards] = useState<ReviewCard[]>(initialReviewCards)
  const [milestones, setMilestones] = useState<Set<string>>(new Set(initialMilestones.map(m => m.milestone_id)))
  const [completed, setCompleted] = useState<Set<number>>(new Set(initialCompleted.map(m => m.domain_number)))
  const [toast, setToast] = useState<Toast | null>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const supabase = createClient()

  // Debounced server sync
  const syncProgress = useCallback((next: UserProgress) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      })
    }, 1000)
  }, [])

  // Check and update streak on mount
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    if (progress.last_visit_date === today) return

    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
    const newStreak = progress.last_visit_date === yesterday
      ? progress.streak + 1
      : progress.last_visit_date === null ? 1 : 1

    const updated = { ...progress, streak: newStreak, last_visit_date: today }
    setProgress(updated)
    syncProgress(updated)
    earnKnowledge(50, 'Daily Visit', 'Keep the streak alive', updated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function showToast(amount: number, title: string, sub: string, type: 'knowledge' | 'applied' = 'knowledge') {
    setToast({ amount, title, sub, type })
  }

  function earnKnowledge(amount: number, title: string, sub: string, base?: UserProgress) {
    setProgress(prev => {
      const cur = base ?? prev
      const next = { ...cur, knowledge_mnw: cur.knowledge_mnw + amount }
      syncProgress(next)
      return next
    })
    showToast(amount, title, sub, 'knowledge')
    checkMilestones()
  }

  function earnApplied(amount: number, title: string, sub: string) {
    setProgress(prev => {
      const next = { ...prev, applied_mnw: prev.applied_mnw + amount, applications: prev.applications + 1 }
      syncProgress(next)
      return next
    })
    showToast(amount, title, sub, 'applied')
    checkMilestones()
  }

  function checkMilestones() {
    setProgress(p => {
      const toEarn: string[] = []
      if (!milestones.has('first_open')) toEarn.push('first_open')
      if (p.concepts > 0 && !milestones.has('first_concept')) toEarn.push('first_concept')
      if (p.streak >= 7 && !milestones.has('day7')) toEarn.push('day7')
      if (p.modules > 0 && !milestones.has('first_module')) toEarn.push('first_module')
      if (p.applications > 0 && !milestones.has('first_app')) toEarn.push('first_app')
      if (p.streak >= 30 && !milestones.has('day30')) toEarn.push('day30')
      if (p.applied_mnw >= 25000 && !milestones.has('applied25k')) toEarn.push('applied25k')
      if (p.streak >= 90 && !milestones.has('day90')) toEarn.push('day90')

      if (toEarn.length > 0) {
        const next = new Set([...Array.from(milestones), ...toEarn])
        setMilestones(next)
        toEarn.forEach(id => {
          supabase.from('milestones').upsert({ user_id: userId, milestone_id: id }).then()
          // Streak bonuses
          if (id === 'day7') earnKnowledge(2500, '7-Day Streak Bonus!', 'Fire kept burning')
          if (id === 'day30') earnKnowledge(15000, '30-Day Streak Bonus!', 'One month straight')
          if (id === 'day90') earnKnowledge(50000, '90-Day Streak Bonus!', 'You are not the same person')
        })
      }
      return p
    })
  }

  function addJournalEntry(text: string): Promise<void> {
    return fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, mnw_earned: 2000 }),
    })
      .then(r => r.json())
      .then((entry: JournalEntry) => {
        setJournal(prev => [entry, ...prev])
        earnApplied(2000, 'Application Logged', 'Real-world use confirmed')
        setProgress(prev => {
          const next = { ...prev, concepts: prev.concepts + 1 }
          syncProgress(next)
          return next
        })
      })
  }

  function completeModule(domainN: number, mnwEarn: number) {
    if (completed.has(domainN)) return
    setCompleted(prev => new Set([...Array.from(prev), domainN]))
    supabase.from('completed_modules').upsert({ user_id: userId, domain_number: domainN, mnw_earned: mnwEarn }).then()
    setProgress(prev => {
      const next = { ...prev, modules: prev.modules + 1, concepts: prev.concepts + 5 }
      syncProgress(next)
      return next
    })
    earnKnowledge(mnwEarn, 'Module Complete', `Domain ${domainN} knowledge earned`)
    // Add a review card
    const card = {
      user_id: userId,
      domain: 'Social Media Marketing',
      domain_color: '#e8547a',
      concept: 'Attention as Currency',
      body: 'Social media is a marketplace with one currency: attention. Not views, not likes, not followers. Attention is the moment someone stops scrolling because what you made spoke to what they were already feeling. Every piece of content either earns this moment or it does not.',
      interval_days: 1,
      next_review_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }
    supabase.from('review_cards').insert(card).select().single().then(({ data }) => {
      if (data) setReviewCards(prev => [...prev, data as ReviewCard])
    })
    checkMilestones()
  }

  function rateReviewCard(cardId: string, rating: 'easy' | 'hard' | 'again') {
    const multipliers = { easy: 2.5, hard: 1.2, again: 0 }
    setReviewCards(prev => prev.map(c => {
      if (c.id !== cardId) return c
      const newInterval = rating === 'again' ? 1 : Math.round(c.interval_days * multipliers[rating])
      const nextReview = new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000).toISOString()
      supabase.from('review_cards').update({ interval_days: newInterval, next_review_at: nextReview }).eq('id', cardId).then()
      return { ...c, interval_days: newInterval, next_review_at: nextReview }
    }))
    const earn = rating === 'easy' ? 500 : rating === 'hard' ? 300 : 100
    const title = rating === 'easy' ? 'Strong Recall!' : rating === 'hard' ? 'Good Effort' : 'Keep Practicing'
    earnKnowledge(earn, title, 'Spaced repetition session')
  }

  function updateRealNW(val: number) {
    setProgress(prev => {
      const next = { ...prev, real_nw: val }
      syncProgress(next)
      return next
    })
  }

  function openDomain(n: number) {
    setActiveDomainN(n)
    setView('domain')
    window.scrollTo(0, 0)
  }

  const kPct = Math.min((progress.knowledge_mnw / CEILING) * 100, 100)
  const level = getLevel(KNOWLEDGE_LEVELS, progress.knowledge_mnw)

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          view={view}
          onNavigate={v => { setView(v); setActiveDomainN(null) }}
          onOpenDomain={openDomain}
          progress={progress}
          kPct={kPct}
          levelName={level.name}
          activeDomainN={activeDomainN}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 min-h-screen lg:ml-[272px] pb-20 lg:pb-0 bg-canvas">
        {view === 'dash' && (
          <DashboardView
            progress={progress}
            kPct={kPct}
            levelName={level.name}
            onOpenDomain={openDomain}
            onUpdateRealNW={updateRealNW}
            completed={completed}
          />
        )}
        {view === 'domains' && (
          <DomainsView onOpenDomain={openDomain} completed={completed} />
        )}
        {view === 'domain' && activeDomainN !== null && (
          <DomainDetail
            domainN={activeDomainN}
            onBack={() => setView('domains')}
            onComplete={completeModule}
            onEarnKnowledge={earnKnowledge}
            isCompleted={completed.has(activeDomainN)}
          />
        )}
        {view === 'review' && (
          <ReviewView
            cards={reviewCards}
            onReveal={id => earnKnowledge(200, 'Card Revealed', 'Spaced repetition session')}
            onRate={rateReviewCard}
          />
        )}
        {view === 'journal' && (
          <JournalView entries={journal} onAdd={addJournalEntry} />
        )}
        {view === 'stats' && (
          <StatsView progress={progress} milestones={milestones} userEmail={userEmail} />
        )}
      </main>

      {/* Mobile bottom nav */}
      <div className="lg:hidden">
        <MobileNav
          view={view}
          onNavigate={v => { setView(v); setActiveDomainN(null) }}
        />
      </div>

      {/* Toast notification */}
      {toast && (
        <MNWToast
          key={`${toast.title}-${Date.now()}`}
          amount={toast.amount}
          title={toast.title}
          sub={toast.sub}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  )
}
