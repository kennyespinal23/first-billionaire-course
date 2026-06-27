-- Enable RLS everywhere and enforce user isolation

CREATE TABLE IF NOT EXISTS user_progress (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  knowledge_mnw    INTEGER NOT NULL DEFAULT 0,
  applied_mnw      INTEGER NOT NULL DEFAULT 0,
  real_nw          INTEGER NOT NULL DEFAULT 0,
  streak           INTEGER NOT NULL DEFAULT 0,
  concepts         INTEGER NOT NULL DEFAULT 0,
  modules          INTEGER NOT NULL DEFAULT 0,
  applications     INTEGER NOT NULL DEFAULT 0,
  last_visit_date  DATE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journal_entries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text        TEXT NOT NULL,
  mnw_earned  INTEGER NOT NULL DEFAULT 2000,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS completed_modules (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  domain_number   INTEGER NOT NULL,
  mnw_earned      INTEGER,
  completed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, domain_number)
);

CREATE TABLE IF NOT EXISTS review_cards (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  domain          TEXT NOT NULL,
  domain_color    TEXT NOT NULL DEFAULT '#b8963e',
  concept         TEXT NOT NULL,
  body            TEXT NOT NULL,
  interval_days   INTEGER NOT NULL DEFAULT 1,
  next_review_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS milestones (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  milestone_id  TEXT NOT NULL,
  earned_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, milestone_id)
);

CREATE TABLE IF NOT EXISTS feed_config (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email         TEXT,
  kindle_email  TEXT,
  send_time     TIME NOT NULL DEFAULT '07:00',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS policies
ALTER TABLE user_progress    ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries  ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_cards     ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones       ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_config      ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own their progress"       ON user_progress    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their journal"        ON journal_entries  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their completions"    ON completed_modules FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their review cards"   ON review_cards     FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their milestones"     ON milestones       FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their feed config"    ON feed_config      FOR ALL USING (auth.uid() = user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_feed_config_updated_at
  BEFORE UPDATE ON feed_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
