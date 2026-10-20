// This publishable key permits only the SELECT policy defined in supabase/schema.sql.
export const presentersDatabase = {
  url: 'https://leqgkgrnctunqoimaqfl.supabase.co',
  key: 'sb_publishable_znOC-BY9sJhK2itmSTqzuA_zVLs2rce',
  editor: 'https://supabase.com/dashboard/project/leqgkgrnctunqoimaqfl/editor',
};
export const presentersCacheKey = 'grupo4:presenters:v1';

export function parsePresenters(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length !== 6) return null;
  const names: string[] = [];
  for (let chapter = 1; chapter <= 6; chapter++) {
    const matches = value.filter(row => row && typeof row === 'object' && row.chapter === chapter);
    if (matches.length !== 1) return null;
    const name: unknown = matches[0].name;
    if (typeof name !== 'string' || name !== name.trim() || !name.length || [...name].length > 40 || /\p{Cc}/u.test(name)) return null;
    names.push(name);
  }
  return names;
}

export async function fetchPresenters(signal: AbortSignal): Promise<string[]> {
  const response = await fetch(`${presentersDatabase.url}/rest/v1/presenters?select=chapter,name&order=chapter.asc`, {
    headers: { apikey: presentersDatabase.key }, signal, cache: 'no-store',
  });
  if (!response.ok) throw new Error('Não foi possível consultar os integrantes.');
  const names = parsePresenters(await response.json());
  if (!names) throw new Error('A lista precisa conter os seis capítulos e nomes válidos.');
  return names;
}
