create table visitors (
  id uuid default uuid_generate_v4() primary key,
  ip_address text,
  city text,
  country text,
  visited_at timestamp with time zone default timezone('utc'::text, now())
);