create table submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  business_name text not null,
  industry text not null,
  help_text text not null,
  ai_summary text,
  ai_category text,
  created_at timestamp with time zone default now()
);

alter table submissions enable row level security;

create policy "Allow public insert" on submissions
  for insert with check (true);

create policy "Allow public read" on submissions
  for select using (true);
