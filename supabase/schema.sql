-- Reference schema, already applied to leqgkgrnctunqoimaqfl.
-- For a NEW project only; never rerun to replace existing names.
begin;
create table public.presenters (
  chapter smallint primary key check (chapter between 1 and 6),
  name text not null check (
    name = btrim(name) and char_length(name) between 1 and 40
    and name !~ '[[:cntrl:]]'
  )
);
alter table public.presenters enable row level security;
revoke all on public.presenters from anon, authenticated;
grant select on public.presenters to anon, authenticated;
create policy "Public presentation names" on public.presenters
for select to anon, authenticated using (true);
insert into public.presenters (chapter,name)
select i, 'Integrante ' || i from generate_series(1,6) i;
comment on table public.presenters is
'Nomes públicos dos seis apresentadores. Edite name pelo Table Editor; chapter define a ordem.';
commit;
