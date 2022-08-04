import { Anime } from '../Types/Anime'

type MediaTitle = {
  english?: string
  romaji?: string
  native?: string
}

export function getTitle(anime: Anime): string {
  let title = anime.title
  if (title.english) return title.english
  if (title.romaji) return title.romaji
  if (title.native) return title.native
  return '(untitled)'
}
