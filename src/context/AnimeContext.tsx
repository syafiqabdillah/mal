import React, { createContext, useState } from 'react'

import { Anime } from '../Types/Anime'

type AnimeContextType = {
  toBeRemovedAnime: Anime | null
  selectedAnime: Anime[]
  selectAnime: (anime: Anime) => void
  unselectAnime: (anime: Anime) => void
  unselectAllAnime: () => void
  selectToBeRemovedAnime: (anime: Anime | null) => void
}

const AnimeContext = createContext<AnimeContextType | null>(null)

export function AnimeProvider(props: { children: React.ReactNode }) {
  const [selectedAnime, setSelectedAnime] = useState<Anime[]>([])
  const [toBeRemovedAnime, setToBeRemovedAnime] = useState<Anime | null>(null)

  const selectAnime = (anime: Anime) => {
    setSelectedAnime((prev) => [...prev, anime])
  }

  const unselectAnime = (anime: Anime) => {
    let filtered = selectedAnime.filter((cur) => cur.idMal !== anime.idMal)
    setSelectedAnime(filtered)
  }

  const unselectAllAnime = () => {
    setSelectedAnime([])
  }

  const selectToBeRemovedAnime = (anime: Anime | null) => {
    setToBeRemovedAnime(anime)
  }

  return (
    <AnimeContext.Provider
      value={{
        selectedAnime,
        toBeRemovedAnime,
        selectAnime,
        unselectAnime,
        unselectAllAnime,
        selectToBeRemovedAnime,
      }}
    >
      {props.children}
    </AnimeContext.Provider>
  )
}

export default AnimeContext
