export interface Domain {
  n: number
  c: string
  i: string
  name: string
  desc: string
  mods: string
}

export interface Level {
  min: number
  name: string
  desc: string
}

export interface Milestone {
  id: string
  icon: string
  name: string
  desc: string
}

export interface ReviewCard {
  id: string
  domain: string
  domain_color: string
  concept: string
  body: string
  interval_days: number
  next_review_at: string
  user_id?: string
}

export interface JournalEntry {
  id: string
  text: string
  mnw_earned: number
  created_at: string
  user_id?: string
}

export interface UserProgress {
  knowledge_mnw: number
  applied_mnw: number
  real_nw: number
  streak: number
  concepts: number
  modules: number
  applications: number
  last_visit_date: string | null
}

export interface MilestoneRecord {
  milestone_id: string
  earned_at: string
}

export interface CompletedModule {
  domain_number: number
  mnw_earned: number
  completed_at: string
}

export interface DomainSection {
  label: string
  heading: string
  body: string[]
}

export interface DomainDetail {
  title: string
  subtitle: string
  time: string
  level: string
  phase: string
  sections: DomainSection[]
  levels: {
    millionaire: string[]
    decamillionaire: string[]
    billionaire: string[]
  }
  carry: string
  question: string
  reading: {
    title: string
    author: string
    why: string
  }
  quiz: string
  otb: string
  mnwEarn: number
}

export type AppView = 'dash' | 'domains' | 'review' | 'journal' | 'stats' | 'domain'
export type ThinkingLevel = 'millionaire' | 'decamillionaire' | 'billionaire'
