import type { Domain, Level, Milestone, ReviewCard, DomainDetail } from './types'

export const CEILING = 100_000

export const KNOWLEDGE_LEVELS: Level[] = [
  { min: 0,      name: 'Student',            desc: 'You are beginning. This is exactly right.' },
  { min: 5000,   name: 'Informed',           desc: 'You know the vocabulary. You can have the conversation.' },
  { min: 20000,  name: 'Educated',           desc: 'You understand the systems most people only experience.' },
  { min: 45000,  name: 'Knowledgeable',      desc: 'You see patterns. Your thinking is visibly different.' },
  { min: 75000,  name: 'Scholar',            desc: 'Deep cross-domain understanding forming.' },
  { min: 100000, name: 'Edition 1 Complete', desc: 'You have hit the Edition 1 ceiling. Time to apply.' },
]

export const APPLIED_LEVELS: Level[] = [
  { min: 0,     name: 'Untested',      desc: 'No real-world application yet. Go build.' },
  { min: 3000,  name: 'Experimenting', desc: 'You are beginning to test what you know.' },
  { min: 15000, name: 'Practicing',    desc: 'Regular application to real decisions.' },
  { min: 40000, name: 'Competent',     desc: 'Consistent results from real application.' },
  { min: 80000, name: 'Proficient',    desc: 'Application is becoming instinct.' },
]

export const DOMAINS: Domain[] = [
  { n: 1,  c: '#e8547a', i: '📡', name: 'Social Media Marketing',         desc: 'How distribution works at scale. Why some ideas spread and others die. How to build owned audiences that compound forever.',                                                                                  mods: '12 modules' },
  { n: 2,  c: '#7c7ff5', i: '🎯', name: 'Branding & Positioning',          desc: 'How perception becomes reality. How the greatest brands engineered specific associations in millions of minds across decades.',                                                                                    mods: '10 modules' },
  { n: 3,  c: '#f0a030', i: '🧠', name: 'Human Psychology',                desc: 'The complete operating manual for human decision-making — cognitive biases, motivation architecture, and behavior change at scale.',                                                                              mods: '14 modules' },
  { n: 4,  c: '#34c990', i: '💡', name: 'Creative Thinking',               desc: 'How the greatest creative minds generated breakthroughs consistently — the systems behind seemingly effortless genius.',                                                                                          mods: '11 modules' },
  { n: 5,  c: '#50d070', i: '💰', name: 'Money & Finance',                  desc: 'How capital actually works — allocation, compounding, leverage, and the real difference between how broke and wealthy people think about every dollar.',                                                          mods: '13 modules' },
  { n: 6,  c: '#e84040', i: '🔥', name: 'Entrepreneurship',                desc: 'How to identify and exploit market inefficiencies. How to build organizations that scale beyond you. How the greatest founders actually decided.',                                                                mods: '15 modules' },
  { n: 7,  c: '#30b8f0', i: '🗣️', name: 'Sales & Persuasion',              desc: 'The complete architecture of human influence — from one-on-one negotiation to mass persuasion to building movements that outlast you.',                                                                          mods: '12 modules' },
  { n: 8,  c: '#a070f8', i: '⚙️', name: 'Business Models & Economics',     desc: 'The mechanics of value creation and capture. Why some businesses print money and others work hard and stay poor forever.',                                                                                       mods: '11 modules' },
  { n: 9,  c: '#f87030', i: '📱', name: 'Product Thinking & Retention',    desc: 'How to build something people cannot live without — habit formation, network effects, and compounding product value.',                                                                                            mods: '13 modules' },
  { n: 10, c: '#c8a060', i: '⚖️', name: 'The Philosophical Foundation',    desc: 'Marcus Aurelius. Machiavelli. Seneca. Sun Tzu. Not historical curiosities — operating manuals for someone building something never done before.',                                                                mods: '9 modules'  },
  { n: 11, c: '#60c8a0', i: '✍️', name: 'Communication & Writing',         desc: 'Written, verbal, and strategic communication. How to make people feel something with words. The meta-skill that multiplies every other skill.',                                                                   mods: '12 modules' },
  { n: 12, c: '#48b870', i: '📊', name: 'Financial Intelligence',           desc: 'Read a P&L and feel where the business is bleeding. Understand cash flow vs profit. Know your margins before your accountant tells you.',                                                                        mods: '10 modules' },
  { n: 13, c: '#e06090', i: '🤝', name: 'Negotiation',                     desc: 'Structure deals so you walk away with maximum value without destroying the relationship. Every significant thing you build requires this.',                                                                        mods: '9 modules'  },
  { n: 14, c: '#5090e8', i: '👥', name: 'Leadership & People',             desc: 'Hire, inspire, delegate, and build a culture where exceptional people do the best work of their lives for your vision.',                                                                                          mods: '13 modules' },
  { n: 15, c: '#e89030', i: '📜', name: 'Legal & Intellectual Property',   desc: 'Contracts, equity, IP protection, trademarks. One bad agreement early can haunt a company for a decade. Basic legal literacy is protection.',                                                                    mods: '8 modules'  },
  { n: 16, c: '#70c840', i: '💼', name: 'Fundraising & Capital',           desc: 'How money flows into businesses. Angel, venture, bootstrapping, strategic partnerships. Understand the game before you play it.',                                                                                mods: '10 modules' },
  { n: 17, c: '#c850e0', i: '🌐', name: 'Network & Relationship Architecture', desc: 'Your network is your net worth — but the way most people think about networking is completely wrong. Build relationships above your level.',                                                                mods: '8 modules'  },
  { n: 18, c: '#40c0d0', i: '🏗️', name: 'Operations & Systems',           desc: 'Build a business that runs without you in every decision. Systematize, scale. The difference between a founder and an entrepreneur.',                                                                            mods: '11 modules' },
  { n: 19, c: '#e85030', i: '⚡', name: 'Health, Energy & Performance',    desc: 'Bezos prioritizes 8 hours of sleep because his decisions are his primary contribution. Your physical state is a competitive advantage.',                                                                         mods: '9 modules'  },
  { n: 20, c: '#8060d0', i: '📜', name: 'History & Pattern Recognition',   desc: 'The dynamics that built and destroyed the Roman Empire are operating in your industry right now. The person who sees those patterns wins.',                                                                       mods: '12 modules' },
  { n: 21, c: '#d0a040', i: '🦁', name: 'Contrarian Courage & Conviction', desc: 'The trained relationship with being right when everyone else says you are wrong. Bezos built AWS when every analyst said focus on retail.',                                                                      mods: '8 modules'  },
  { n: 22, c: '#50d0b0', i: '🎨', name: 'Taste, Aesthetics & Quality',    desc: 'Jobs said taste separated Apple from everyone else. The ability to know what is excellent before the market tells you. This can be developed.',                                                                   mods: '9 modules'  },
  { n: 23, c: '#e06040', i: '⏱️', name: 'Timing & Market Cycles',          desc: 'The graveyard of history is full of brilliant people right about everything except when. Reading where a market is in its cycle is a skill.',                                                                    mods: '10 modules' },
]

export const MILESTONES: Milestone[] = [
  { id: 'first_open',    icon: '🌅', name: 'Day One',          desc: 'You showed up. Most people never start.' },
  { id: 'first_concept', icon: '💡', name: 'First Concept',    desc: 'Your first permanent mental model.' },
  { id: 'day7',          icon: '🔥', name: '7-Day Streak',     desc: 'Seven consecutive days of learning.' },
  { id: 'first_module',  icon: '📚', name: 'Module Complete',  desc: 'First full module finished.' },
  { id: 'first_app',     icon: '⚡', name: 'First Application',desc: 'You used knowledge in the real world.' },
  { id: 'top20',         icon: '🧠', name: 'Top 20%',          desc: 'Ahead of 80% in entrepreneurial thinking.' },
  { id: 'day30',         icon: '🗓️', name: '30-Day Streak',    desc: 'A month of daily learning.' },
  { id: 'first_domain',  icon: '🎓', name: 'Domain Master',    desc: 'First complete domain finished.' },
  { id: 'applied25k',    icon: '🔨', name: 'Proven Thinker',   desc: '$25K in applied net worth earned.' },
  { id: 'day90',         icon: '💎', name: '90-Day Streak',    desc: 'Ninety days. You are not the same person.' },
  { id: 'halfway',       icon: '🌍', name: 'Halfway There',    desc: '12 of 23 domains complete.' },
  { id: 'billion_mind',  icon: '👑', name: 'Billionaire Mind', desc: 'All 23 domains. Level 3 complete. The destination.' },
]

export const SEED_REVIEW_CARDS: Omit<ReviewCard, 'id' | 'user_id'>[] = [
  {
    domain: 'Social Media Marketing',
    domain_color: '#e8547a',
    concept: 'Pattern Interruption',
    body: 'The brain is a prediction machine. Attention is involuntarily triggered when a pattern breaks. Content that confirms expectations gets scrolled past. Content that breaks a belief stops the thumb. Your hook is not decoration — it is the entire game.',
    interval_days: 1,
    next_review_at: new Date().toISOString(),
  },
  {
    domain: 'Human Psychology',
    domain_color: '#f0a030',
    concept: 'System 1 vs System 2',
    body: 'System 1 is fast, emotional, automatic. System 2 is slow, deliberate, rational. System 1 runs almost all the time. Most decisions — including purchases — are made by System 1 before System 2 is ever consulted. You are never persuading logic. You are always speaking to emotion first.',
    interval_days: 1,
    next_review_at: new Date().toISOString(),
  },
  {
    domain: 'Money & Finance',
    domain_color: '#50d070',
    concept: 'Income vs Wealth',
    body: 'Income is what you earn. Wealth is what you keep and put to work. Rich means high income. Wealthy means assets generating income without active involvement. You can earn $300K and be broke. You can earn $40K and be building wealth. The gap between income and expenses — and where that gap goes — is the only number that matters.',
    interval_days: 1,
    next_review_at: new Date().toISOString(),
  },
]

export const DOMAIN_1: DomainDetail = {
  title: 'What Attention Actually Is',
  subtitle: 'And why most people are trading the wrong currency — the complete breakdown from regular thinking to billionaire distribution strategy',
  time: 'No limit — go as deep as it demands',
  level: 'All Three Levels · Millionaire → Billionaire',
  phase: 'Phase 01 · Foundation Library · Edition 1',
  mnwEarn: 2500,
  sections: [
    {
      label: 'The Concept',
      heading: 'Attention is not what you think it is',
      body: [
        'Most people think social media is about posting content. It is not. Social media is a marketplace where one currency is traded above all others — attention. And attention is not views, not likes, not followers. Attention is the moment someone stops scrolling because something you made spoke to something they were already feeling.',
        'Here is what that means practically: people are not on their phones looking for your content. They are running from boredom, loneliness, anxiety, or they are chasing a feeling — entertainment, validation, connection, inspiration. Your content either interrupts that scroll because it meets them in that feeling, or it does not. There is no middle ground. A post that gets half-noticed is the same as a post that gets ignored.',
        'This distinction — between content that seeks attention and content that earns it — is the entire game. Everything else is tactics. The strategy is understanding what attention actually is at a neurological level, and then building every piece of content around creating that specific moment of connection.',
      ],
    },
    {
      label: 'Why Most People Get It Wrong',
      heading: 'The bulletin board mistake and three others',
      body: [
        'The number one mistake people make on social media is posting what they want to say instead of what their audience needs to feel. They treat their feed like a bulletin board — announcements, updates, achievements, products. But nobody stops scrolling for an announcement. They stop for something that feels true.',
        'The second mistake is chasing the algorithm before understanding the audience. The algorithm does not create virality — it amplifies it. If nobody is stopping for your content, no algorithm in the world fixes that. The algorithm rewards engagement. Engagement comes from resonance. Resonance comes from knowing your person so well that your words feel written specifically for them.',
        'The third mistake is confusing consistency of output with consistency of voice. You can post every day and still be invisible if every post sounds like a different person. The accounts that compound over time are the ones where every post — regardless of format or topic — sounds unmistakably like the same human being with the same point of view. That consistency is a trust signal. Trust is what converts attention into audience.',
      ],
    },
    {
      label: 'Real World Example',
      heading: 'How Hormozi built millions of followers on brutal honesty',
      body: [
        "Alex Hormozi built an audience of millions in three years posting about business. But he was not posting business tips. He was posting hard truths that most business content is too polished to say out loud. Things like: your offer is the problem, not your ads. He understood that his audience — struggling entrepreneurs — were drowning in generic advice and starving for someone who would just tell them the real thing.",
        "His content stopped the scroll because it felt like a slap of honesty in a feed full of noise. The content was not about him. It was a mirror held up to his audience's exact situation. The strategic insight underneath: Hormozi did not build an audience. He found an existing conversation — the private frustration of entrepreneurs who feel like they are doing everything right and still failing — and became the most honest voice in that conversation.",
        "That is the template. Not be interesting. Find the conversation your specific person is already having inside their own head, and say the thing they are thinking but nobody else is willing to say out loud.",
      ],
    },
    {
      label: 'The Deeper Mechanism',
      heading: 'Pattern interruption — why the brain pays attention at all',
      body: [
        'Attention works through a neurological process called pattern interruption. Your brain is a prediction machine — it is constantly anticipating what comes next so it can conserve energy. When something breaks that pattern, the brain is forced to pay attention. This is why "Why working harder is making you poor" stops more people than "10 tips for productivity." The first breaks a belief. The second confirms what they already expect.',
        'The most powerful social media content does one of three things: it confirms something the audience secretly believed but never heard said out loud, it challenges something they believed but should not have, or it shows them something about themselves they did not know how to articulate. Every piece of content that ever went viral did at least one of these. Most great content does two.',
        'There is also a neurochemical component worth understanding. Novel stimuli trigger a dopamine response — the brain rewards itself for paying attention to something unexpected. This is why the hook is everything. The first sentence, the first frame, the first line. If you do not earn attention in the first three seconds you do not earn it at all. This is not a platform quirk. It is biology.',
      ],
    },
  ],
  levels: {
    millionaire: [
      'At the millionaire level you treat social media as a distribution asset — something that compounds over time and produces returns without proportional ongoing investment. You are not chasing viral moments. You are building a body of work that at sufficient mass creates inbound opportunity automatically.',
      'The shift in thinking: stop asking what should I post today and start asking what body of work am I building, and does today\'s post add to it? Every post is either an asset or noise. Assets accumulate. Noise disappears. You are making that decision before you hit publish.',
      'Practically: one platform. One niche. One point of view. Consistent for 90 days. Not because 90 days is magical but because it is past the point where most people quit — which means at day 91 the competition thins dramatically and the compound curve begins.',
    ],
    decamillionaire: [
      'At the decamillionaire level social media is not about personal brand. It is about owned distribution. A $10M+ thinker is building an audience they own outright: email lists, communities, platforms they control. Social media is the top of a funnel that feeds owned channels — not the destination itself.',
      'The question changes from how do I get more followers to how do I convert attention into relationships I own and can contact forever without paying a platform? This is the difference between renting an audience and owning one. Every algorithm update affects the renter catastrophically. The owner feels nothing.',
      'At this level you also think about distribution as a moat. An audience that trusts you deeply enough to follow you across platforms, buy whatever you recommend, show up for whatever you launch — that audience is a balance sheet asset worth more than most physical assets. You are building it deliberately.',
    ],
    billionaire: [
      'Billionaire-level thinkers do not build audiences. They build platforms that other people build audiences on. They understand that the most scalable distribution is infrastructure — creating the place where attention aggregates rather than competing for attention within someone else\'s place.',
      'This level of thinking asks: what is the infrastructure layer that does not exist yet in my space? What platform would make every creator, every builder, every communicator in my domain more powerful — and would I own the rails they run on? This is how Twitter, TikTok, Substack, and Spotify were conceived. Not as content plays but as distribution infrastructure for other people\'s content.',
      'The billionaire insight about attention: at sufficient scale you do not go to where attention is. You create the place attention comes to. The game is not winning the race. It is owning the track.',
    ],
  },
  carry: 'Attention is not earned by being loud. It is earned by being the most honest voice in a room full of people performing.',
  question: 'Who is the one specific person you are talking to when you post — and what are they feeling at 11pm when they open their phone?',
  reading: {
    title: 'Contagious: Why Things Catch On',
    author: 'Jonah Berger',
    why: "Berger spent years studying why things go viral and identified six specific drivers — Social Currency, Triggers, Emotion, Public, Practical Value, Stories — that explain every piece of content that has ever spread. Read with a pen. Underline every principle that applies to what you're building right now. This one changes how you see every piece of content you create.",
  },
  quiz: 'You are launching with $0 for paid advertising. Based on the principles in this domain — not tactics, principles — walk me through how you would architect a content strategy that builds real distribution. Start from first principles. Do not tell me what you\'ve seen other people do. Tell me what you would do and why, using the mechanisms we covered.',
  otb: 'You have $0, a phone, and 30 days. No paid ads. No existing audience. No connections in the space. You need to get 1,000 people genuinely interested in a faith-based daily companion app. What do you do on day one — and why that specifically? Not what you\'ve seen others do. What you would do from first principles.',
}

export function fmt(n: number): string {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(0) + 'K'
  return '$' + n.toLocaleString()
}

export function getLevel(arr: Level[], val: number): Level {
  let lv = arr[0]
  for (const l of arr) { if (val >= l.min) lv = l }
  return lv
}

