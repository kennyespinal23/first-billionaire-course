import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
import { AppShell } from '@/components/AppShell'
import type { UserProgress, JournalEntry, ReviewCard, MilestoneRecord, CompletedModule } from '@/lib/types'
import { SEED_REVIEW_CARDS } from '@/lib/data'

const DEFAULT_PROGRESS: UserProgress = {
  knowledge_mnw: 0,
  applied_mnw: 0,
  real_nw: 0,
  streak: 0,
  concepts: 0,
  modules: 0,
  applications: 0,
  last_visit_date: null,
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Parallel data fetch
  const [progressRes, journalRes, reviewRes, milestonesRes, completedRes] = await Promise.all([
    supabase.from('user_progress').select('*').eq('user_id', user.id).single(),
    supabase.from('journal_entries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(50),
    supabase.from('review_cards').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
    supabase.from('milestones').select('milestone_id, earned_at').eq('user_id', user.id),
    supabase.from('completed_modules').select('domain_number, mnw_earned, completed_at').eq('user_id', user.id),
  ])

  const progress: UserProgress = progressRes.data ?? DEFAULT_PROGRESS
  const journalEntries: JournalEntry[] = (journalRes.data ?? []) as JournalEntry[]
  const milestones: MilestoneRecord[] = (milestonesRes.data ?? []) as MilestoneRecord[]
  const completed: CompletedModule[] = (completedRes.data ?? []) as CompletedModule[]

  // Seed starter review cards if user has none
  let reviewCards: ReviewCard[] = (reviewRes.data ?? []) as ReviewCard[]
  if (reviewCards.length === 0) {
    const seeds = SEED_REVIEW_CARDS.map(c => ({ ...c, user_id: user.id }))
    const { data: seeded } = await supabase.from('review_cards').insert(seeds).select()
    reviewCards = (seeded ?? []) as ReviewCard[]
  }

  // Ensure progress row exists (first visit)
  if (!progressRes.data) {
    await supabase.from('user_progress').insert({ user_id: user.id })
  }

  return (
    <AppShell
      userId={user.id}
      userEmail={user.email ?? ''}
      initialProgress={progress}
      initialJournal={journalEntries}
      initialReviewCards={reviewCards}
      initialMilestones={milestones}
      initialCompleted={completed}
    />
  )
}
