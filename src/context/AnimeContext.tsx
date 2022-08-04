import React, { createContext, useState } from 'react'

import { Anime } from '../Types/Anime'

type AnimeContextType = {
  selectedAnime: Anime[]
  selectAnime: (anime: Anime) => void
  unselectAnime: (anime: Anime) => void
  unselectAllAnime: () => void
}

const AnimeContext = createContext<AnimeContextType | null>(null)

export function AnimeProvider(props: { children: React.ReactNode }) {
  const [selectedAnime, setSelectedAnime] = useState<Anime[]>([])

  const selectAnime = (anime: Anime) => {
    setSelectedAnime((prev) => [...prev, anime])
  }

  const unselectAnime = (anime: Anime) => {
    let filtered = selectedAnime.filter((cur) => cur.idMal != anime.idMal)
    setSelectedAnime(filtered)
  }

  const unselectAllAnime = () => {
    setSelectedAnime([])
  }

  return (
    <AnimeContext.Provider
      value={{ selectedAnime, selectAnime, unselectAnime, unselectAllAnime }}
    >
      {props.children}
    </AnimeContext.Provider>
  )
}

export default AnimeContext
