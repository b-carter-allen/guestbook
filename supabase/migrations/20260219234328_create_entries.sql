create table entries (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text not null,
  message    text not null
);
