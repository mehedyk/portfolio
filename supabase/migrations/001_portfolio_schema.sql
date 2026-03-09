-- ============================================================
-- Portfolio Builder - Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PORTFOLIO META (Hero section + global settings)
-- ============================================================
CREATE TABLE IF NOT EXISTS portfolio_meta (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'S.M. Mehedy Kawser',
  tagline TEXT DEFAULT 'Full Stack Developer',
  greeting TEXT DEFAULT 'Hey, I''m Mahdi Kawser',
  description TEXT DEFAULT 'With expertise in cutting-edge technologies...',
  photo_url TEXT,
  cv_url TEXT,
  email TEXT DEFAULT 'kawser2305341202@diu.edu.bd',
  phone TEXT,
  location TEXT DEFAULT 'Dhaka, Bangladesh',
  stat_experience TEXT DEFAULT '3+',
  stat_projects TEXT DEFAULT '20+',
  stat_clients TEXT DEFAULT '15+',
  stat_awards TEXT DEFAULT '5+',
  github_url TEXT DEFAULT 'https://github.com/mehedyk',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/mehedyk/',
  facebook_url TEXT DEFAULT 'https://www.facebook.com/mahdi.kawser',
  codeforces_url TEXT DEFAULT 'https://codeforces.com/profile/mehedyk',
  leetcode_url TEXT DEFAULT 'https://leetcode.com/mehedyk',
  twitter_url TEXT,
  instagram_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default row
INSERT INTO portfolio_meta (id) VALUES (uuid_generate_v4()) ON CONFLICT DO NOTHING;

-- ============================================================
-- PROJECTS
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Web Apps',
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SKILLS
-- ============================================================
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INTEGER DEFAULT 80 CHECK (level >= 0 AND level <= 100),
  sort_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TIMELINE
-- ============================================================
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  organization TEXT,
  description TEXT,
  event_type TEXT DEFAULT 'education' CHECK (event_type IN ('education', 'work', 'achievement')),
  visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOG POSTS
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  external_url TEXT,
  read_time TEXT DEFAULT '5 min',
  published BOOLEAN DEFAULT TRUE,
  visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SERVICES
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT DEFAULT 'Code',
  features TEXT[] DEFAULT '{}',
  visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  default_theme TEXT DEFAULT 'true-classic',
  available_themes TEXT[] DEFAULT ARRAY['true-classic','monochrome','classical','cyber','red-alert','purple','ocean','sunset','pink','lime','ice','gold','blade-runner','cli'],
  default_language TEXT DEFAULT 'en',
  available_languages TEXT[] DEFAULT ARRAY['en', 'bn'],
  loader_enabled BOOLEAN DEFAULT TRUE,
  particles_enabled BOOLEAN DEFAULT TRUE,
  cursor_trail_enabled BOOLEAN DEFAULT TRUE,
  default_cursor_effect TEXT DEFAULT 'beacon',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES (uuid_generate_v4()) ON CONFLICT DO NOTHING;

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_portfolio_meta_updated_at BEFORE UPDATE ON portfolio_meta FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_timeline_updated_at BEFORE UPDATE ON timeline_events FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_blog_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Everyone can read, only authenticated (admin) can write
-- ============================================================
ALTER TABLE portfolio_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read portfolio_meta" ON portfolio_meta FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (visible = true);
CREATE POLICY "Public read skill_categories" ON skill_categories FOR SELECT USING (visible = true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (visible = true);
CREATE POLICY "Public read timeline_events" ON timeline_events FOR SELECT USING (visible = true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (visible = true AND published = true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (visible = true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (visible = true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

-- Auth write policies (admin only)
CREATE POLICY "Auth write portfolio_meta" ON portfolio_meta FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write skill_categories" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write timeline_events" ON timeline_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA (optional defaults)
-- ============================================================
INSERT INTO skill_categories (title, sort_order) VALUES
  ('Frontend', 1), ('Backend', 2), ('Security', 3), ('DevOps & Cloud', 4);

INSERT INTO timeline_events (year, title, organization, description, event_type, sort_order) VALUES
  ('2024', 'Software Engineering Student', 'Daffodil International University', 'Enrolled in SE 331, working on Portfolio Builder SaaS and other projects.', 'education', 1),
  ('2023', 'Full Stack Developer', 'Freelance', 'Built multiple web applications using React, Node.js, and various databases.', 'work', 2),
  ('2022', 'Started Software Engineering', 'Daffodil International University', 'Began the journey into software engineering.', 'education', 3);

INSERT INTO services (title, description, icon_name, features, sort_order) VALUES
  ('Web Development', 'Building responsive, performant web applications with modern frameworks.', 'Code', ARRAY['Full-stack development','API design','UI/UX implementation','Performance optimization'], 1),
  ('Security Auditing', 'Comprehensive security assessments to identify vulnerabilities.', 'Shield', ARRAY['Penetration testing','Code review','OWASP compliance','Security training'], 2),
  ('Backend Architecture', 'Designing scalable, reliable backend systems.', 'Database', ARRAY['Database design','RESTful/GraphQL APIs','Microservices','Performance tuning'], 3),
  ('DevOps & Cloud', 'Setting up CI/CD pipelines and cloud infrastructure.', 'Cloud', ARRAY['Docker/Kubernetes','AWS/Azure setup','Automated deployment','Monitoring & logging'], 4),
  ('Performance Optimization', 'Analyzing and optimizing applications for maximum speed.', 'Zap', ARRAY['Code profiling','Load optimization','Caching strategies','CDN setup'], 5),
  ('Technical Consulting', 'Expert guidance on technology stack and architecture.', 'Terminal', ARRAY['Tech stack advice','Code review','Architecture planning','Team training'], 6);
