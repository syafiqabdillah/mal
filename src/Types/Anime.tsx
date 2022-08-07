export type Anime = {
  id: number
  idMal: number
  bannerImage: string
  description: string
  genres: string[]
  season?: string
  seasonYear?: number
  averageScore: number
  episodes?: number
  duration?: number
  status?: string
  hastag?: string[]
  trailer?: {
    id: number
    site: string
    thumbnail: string
  }
  coverImage: {
    medium: string
    large: string
    extraLarge: string
  }
  title: {
    english?: string
    romaji?: string
    native?: string
  }
  rankings?: {
    id: number
    type: string
    rank: number
    format: string
    allTime: boolean
  }
}
