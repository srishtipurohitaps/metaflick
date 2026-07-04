export const OMDB_KEY = 'KEY'; 

export async function omdbSearch(query, page = 1) {
  const url = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`;
  const res  = await fetch(url);
  const data = await res.json();
  return data;
}


