-- Discover · schema utenti
-- Esegui questo script una sola volta in Supabase → SQL Editor.
-- Crea una tabella "profiles" pubblica, collegata 1:1 a auth.users
-- (che Supabase gestisce automaticamente per email/password, sessioni, ecc.),
-- e la popola in automatico ad ogni nuova registrazione.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- Nome mostrato nell'app (card dei trip, header, ecc.). Nullable perché non
-- c'è ancora una UI per impostarlo: finché è vuoto, il codice mostra la
-- parte dell'email prima della "@" (vedi src/lib/trips/format.ts). "add
-- column if not exists" invece di metterla dentro il create table qui sopra,
-- così lo script resta idempotente anche per chi ha già la tabella.
alter table public.profiles
  add column if not exists display_name text;

alter table public.profiles enable row level security;

-- Il profilo (nome + email) deve essere visibile a chiunque sia loggato,
-- non solo al proprietario: serve per mostrare "chi ha creato questo trip"
-- nel feed della dashboard.
drop policy if exists "Profiles are viewable by their owner" on public.profiles;
drop policy if exists "Profiles are viewable by authenticated users" on public.profiles;
create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

drop policy if exists "Profiles are editable by their owner" on public.profiles;
create policy "Profiles are editable by their owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Ad ogni signup in auth.users, crea automaticamente la riga profiles corrispondente.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill: utenti registrati PRIMA che questa tabella/trigger esistessero
-- non hanno ancora una riga profiles (il trigger scatta solo sui nuovi
-- signup). Senza questo, quegli utenti non riuscirebbero a creare un trip
-- (vedi il vincolo trips_user_id_profiles_fkey più sotto). Sicuro da
-- rieseguire: aggiunge solo le righe mancanti.
insert into public.profiles (id, email)
select u.id, u.email
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;


-- Discover · schema "trip" (i post mostrati come card nella dashboard)
-- Chiamata "trips" (non "posts") perché nel progetto Supabase risulta già
-- presente una tabella "posts" indipendente/non collegata a questa app:
-- per non entrarci in conflitto, i post di Discover vivono in "trips".

do $$
begin
  if not exists (select 1 from pg_type where typname = 'trip_activity_type') then
    create type public.trip_activity_type as enum ('cinema', 'concert');
  end if;
end $$;

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  activity_type public.trip_activity_type not null,
  -- Luogo scelto dall'utente (in futuro autocompletato con Google Places o
  -- simili). "location" è il testo mostrato nel bubble #where; le colonne
  -- place_id/lat/lng sono opzionali, pronte per quando colleghiamo
  -- l'autocomplete e/o una mappa.
  location text not null,
  location_place_id text,
  location_lat double precision,
  location_lng double precision,
  -- Giorno/periodo in cui si svolge l'attività → bubble #when.
  scheduled_for timestamptz not null,
  -- Con quante persone l'utente vuole fare l'attività → badge in basso a
  -- destra della card.
  participants_wanted integer not null default 1 check (participants_wanted >= 1),
  created_at timestamptz not null default now()
);

-- Seconda foreign key (oltre a auth.users) verso profiles: serve solo per
-- permettere a Supabase/PostgREST di fare l'embed "trips -> creator profile"
-- in un'unica query (select *, creator:profiles(...)).
alter table public.trips
  drop constraint if exists trips_user_id_profiles_fkey;
alter table public.trips
  add constraint trips_user_id_profiles_fkey
  foreign key (user_id) references public.profiles (id) on delete cascade;

create index if not exists trips_created_at_idx on public.trips (created_at desc);

alter table public.trips enable row level security;

-- Feed pubblico (tra utenti loggati): tutti possono vedere tutti i trip,
-- ma solo il creatore può crearli/modificarli/cancellarli.
drop policy if exists "Trips are viewable by authenticated users" on public.trips;
create policy "Trips are viewable by authenticated users"
  on public.trips for select
  to authenticated
  using (true);

drop policy if exists "Users can create their own trips" on public.trips;
create policy "Users can create their own trips"
  on public.trips for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own trips" on public.trips;
create policy "Users can update their own trips"
  on public.trips for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own trips" on public.trips;
create policy "Users can delete their own trips"
  on public.trips for delete
  using (auth.uid() = user_id);


-- Discover · candidature ("apply" al bubble partecipanti di una card) +
-- chat di gruppo del trip (creatore + candidati accettati).

do $$
begin
  if not exists (select 1 from pg_type where typname = 'trip_application_status') then
    create type public.trip_application_status as enum ('pending', 'accepted', 'declined');
  end if;
end $$;

create table if not exists public.trip_applications (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips (id) on delete cascade,
  applicant_id uuid not null references public.profiles (id) on delete cascade,
  status public.trip_application_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (trip_id, applicant_id)
);

create index if not exists trip_applications_trip_id_idx
  on public.trip_applications (trip_id);

alter table public.trip_applications enable row level security;

-- Chi può vedere le candidature di un trip:
-- - il candidato stesso (per sapere se è pending/accepted)
-- - il creatore del trip (per gestirle)
-- - chiunque autenticato, ma solo le candidature GIÀ accettate
--   (serve a mostrare il conteggio 0/2 sulla card a tutti; le pending
--   restano private).
drop policy if exists "Applications are viewable by relevant people" on public.trip_applications;
create policy "Applications are viewable by relevant people"
  on public.trip_applications for select
  to authenticated
  using (
    status = 'accepted'
    or auth.uid() = applicant_id
    or auth.uid() = (select t.user_id from public.trips t where t.id = trip_id)
  );

-- Chiunque (tranne il creatore, controllato lato server action) può
-- candidarsi una sola volta a un trip (vincolo unique sopra).
drop policy if exists "Users can apply to a trip" on public.trip_applications;
create policy "Users can apply to a trip"
  on public.trip_applications for insert
  with check (auth.uid() = applicant_id);

-- Solo il creatore del trip può accettare/rifiutare le candidature.
drop policy if exists "Trip creators manage applications" on public.trip_applications;
create policy "Trip creators manage applications"
  on public.trip_applications for update
  using (auth.uid() = (select t.user_id from public.trips t where t.id = trip_id));

create table if not exists public.trip_messages (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  content text not null check (char_length(trim(content)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists trip_messages_trip_id_created_at_idx
  on public.trip_messages (trip_id, created_at);

alter table public.trip_messages enable row level security;

-- Solo il creatore del trip e i candidati "accepted" possono leggere o
-- scrivere nella chat di gruppo di quel trip.
drop policy if exists "Trip members can read messages" on public.trip_messages;
create policy "Trip members can read messages"
  on public.trip_messages for select
  to authenticated
  using (
    auth.uid() = (select t.user_id from public.trips t where t.id = trip_id)
    or exists (
      select 1 from public.trip_applications a
      where a.trip_id = trip_messages.trip_id
        and a.applicant_id = auth.uid()
        and a.status = 'accepted'
    )
  );

drop policy if exists "Trip members can send messages" on public.trip_messages;
create policy "Trip members can send messages"
  on public.trip_messages for insert
  with check (
    auth.uid() = sender_id
    and (
      auth.uid() = (select t.user_id from public.trips t where t.id = trip_id)
      or exists (
        select 1 from public.trip_applications a
        where a.trip_id = trip_messages.trip_id
          and a.applicant_id = auth.uid()
          and a.status = 'accepted'
      )
    )
  );

-- Abilita gli aggiornamenti realtime sulla chat, così i nuovi messaggi
-- compaiono senza dover ricaricare la pagina. In un blocco "do" perché
-- "alter publication ... add table" non supporta "if not exists" e darebbe
-- errore se rieseguito quando la tabella è già stata aggiunta.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'trip_messages'
  ) then
    alter publication supabase_realtime add table public.trip_messages;
  end if;
end $$;
