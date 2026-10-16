-- VERDANT & VEIL DEMO WEBSITE
-- Run this entire file in Supabase Dashboard > SQL Editor > New query.
-- The public website can read published services and opening hours.
-- Only authenticated users listed in the admin allow-list can edit site content or view enquiries.

create extension if not exists pgcrypto;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  description text not null check (char_length(description) between 5 and 500),
  price integer not null check (price >= 0),
  duration_minutes integer not null default 60 check (duration_minutes between 5 and 600),
  image_key text not null default 'facial' check (image_key in ('facial','silk-press','manicure','brows')),
  sort_order integer not null default 1,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.opening_hours (
  id uuid primary key default gen_random_uuid(),
  day_key text not null unique check (day_key in ('monday','tuesday','wednesday','thursday','friday','saturday','sunday')),
  day_label text not null,
  open_time time,
  close_time time,
  is_closed boolean not null default false,
  sort_order integer not null unique,
  check (is_closed or (open_time is not null and close_time is not null and close_time > open_time))
);

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 200),
  topic text not null default 'General enquiry',
  message text not null check (char_length(message) between 10 and 2000),
  status text not null default 'new' check (status in ('new','in_progress','resolved')),
  created_at timestamptz not null default now()
);

-- Explicit allow-list: only add the UUID of your own administrator account here.
create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;
alter table public.opening_hours enable row level security;
alter table public.contact_enquiries enable row level security;
alter table public.site_admins enable row level security;

-- RLS is active, but Postgres still needs explicit table privileges for the authenticated role.
-- The admin allow-list is queried inside the service policy, so the admin role must be able to read it.
grant usage on schema public to anon, authenticated;
grant select on public.services to anon, authenticated;
grant insert, update, delete on public.services to authenticated;
grant select on public.opening_hours to anon, authenticated;
grant insert, update, delete on public.opening_hours to authenticated;
grant select on public.contact_enquiries to authenticated;
grant insert on public.contact_enquiries to anon, authenticated;
grant update on public.contact_enquiries to authenticated;
grant select on public.site_admins to authenticated;

-- Public visitors may read only published services.
drop policy if exists "Anyone can read published services" on public.services;
create policy "Anyone can read published services" on public.services for select to anon, authenticated using (is_published = true or exists (select 1 from public.site_admins where user_id = (select auth.uid())));

drop policy if exists "Admins manage services" on public.services;
create policy "Admins manage services" on public.services for all to authenticated using (exists (select 1 from public.site_admins where user_id = (select auth.uid()))) with check (exists (select 1 from public.site_admins where user_id = (select auth.uid())));

drop policy if exists "Anyone can read opening hours" on public.opening_hours;
create policy "Anyone can read opening hours" on public.opening_hours for select to anon, authenticated using (true);

drop policy if exists "Admins manage opening hours" on public.opening_hours;
create policy "Admins manage opening hours" on public.opening_hours for all to authenticated using (exists (select 1 from public.site_admins where user_id = (select auth.uid()))) with check (exists (select 1 from public.site_admins where user_id = (select auth.uid())));

-- Public visitors may submit an enquiry, but cannot read or edit enquiries.
drop policy if exists "Visitors can submit enquiries" on public.contact_enquiries;
create policy "Visitors can submit enquiries" on public.contact_enquiries for insert to anon, authenticated with check (status = 'new');

drop policy if exists "Admins read enquiries" on public.contact_enquiries;
create policy "Admins read enquiries" on public.contact_enquiries for select to authenticated using (exists (select 1 from public.site_admins where user_id = (select auth.uid())));
drop policy if exists "Admins update enquiries" on public.contact_enquiries;
create policy "Admins update enquiries" on public.contact_enquiries for update to authenticated using (exists (select 1 from public.site_admins where user_id = (select auth.uid()))) with check (exists (select 1 from public.site_admins where user_id = (select auth.uid())));

drop policy if exists "Admins read own admin record" on public.site_admins;
create policy "Admins read own admin record" on public.site_admins for select to authenticated using (user_id = (select auth.uid()));

-- Seed the demonstration content once. Re-running the script will not duplicate these rows.
insert into public.services (name, description, price, duration_minutes, image_key, sort_order, is_published) values
('The Signature Facial','A considered skin ritual with a gentle cleanse, exfoliation and a replenishing mask.',28000,60,'facial',1,true),
('Silk Press & Finish','A smooth, polished finish with soft movement and a healthy-looking sheen.',35000,90,'silk-press',2,true),
('The Veil Manicure','Thoughtful nail care, detailed shaping and a beautifully understated finish.',18000,45,'manicure',3,true),
('Brow Shape & Define','A tailored brow tidy designed to complement your natural features.',12000,30,'brows',4,true)
on conflict do nothing;

insert into public.opening_hours (day_key, day_label, open_time, close_time, is_closed, sort_order) values
('monday','Monday','09:00','18:00',false,1),
('tuesday','Tuesday','09:00','18:00',false,2),
('wednesday','Wednesday','09:00','18:00',false,3),
('thursday','Thursday','09:00','19:00',false,4),
('friday','Friday','09:00','19:00',false,5),
('saturday','Saturday','10:00','17:00',false,6),
('sunday','Sunday',null,null,true,7)
on conflict do nothing;
