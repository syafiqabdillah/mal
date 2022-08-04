export type Anime = {
  idMal: number
  bannerImage: string
  description: string
  genres: string[]
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
  averageScore: number
}
