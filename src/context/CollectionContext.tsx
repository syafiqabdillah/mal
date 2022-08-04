import React, { createContext, useState } from 'react'

import { Anime } from '../Types/Anime'
import { Collection } from '../Types/Collection'

type CollectionContextType = {
  collections: Collection[]
  selectedCollections: Collection[]
  addCollection: (name: string, slug: string) => void
  syncLocalStorage: () => void
  selectCollection: (col: Collection) => void
  unselectCollection: (col: Collection) => void
  bulkAdd: (animeList: Anime[]) => void
}

const CollectionContext = createContext<CollectionContextType | null>(null)

function saveToLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function CollectionProvider(props: { children: React.ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>([
    {
      name: 'Slice of Life',
      slug: 'slice-of-life',
      list: [],
    },
  ])
  const [selectedCollections, setSelectedCollections] = useState<Collection[]>(
    []
  )

  const selectCollection = (col: Collection) => {
    setSelectedCollections((prev) => [...prev, col])
  }

  const unselectCollection = (col: Collection) => {
    let filtered = selectedCollections.filter((item) => item.slug != col.slug)
    setSelectedCollections(filtered)
  }

  const addCollection = (name: string, slug: string) => {
    let newCollection = [...collections, { name, slug, list: [] }]
    setCollections(newCollection)
    saveToLocalStorage('collections', newCollection)
  }

  const bulkAdd = (animeList: Anime[]) => {
    let affectedColSlug = selectedCollections.map((item) => item.slug)
    let affectedCollections: Collection[] = []
    let unaffectedCollections: Collection[] = []
    collections.forEach((col) => {
      let ids: number[] = col.list.map((item) => item.idMal)
      if (affectedColSlug.includes(col.slug)) {
        animeList.forEach((anime) => {
          if (!ids.includes(anime.idMal)) {
            col.list.push(anime)
          }
        })
        affectedCollections.push(col)
      } else {
        unaffectedCollections.push(col)
      }
    })
    const newCollections = [...affectedCollections, ...unaffectedCollections]
    setCollections(newCollections)
    setSelectedCollections([])
    saveToLocalStorage('collections', newCollections)
  }

  const syncLocalStorage = () => {
    const scollections = localStorage.getItem('collections')
    if (scollections) {
      let savedCollections = JSON.parse(scollections)
      setCollections(savedCollections)
    }
  }

  return (
    <CollectionContext.Provider
      value={{
        collections,
        selectedCollections,
        addCollection,
        syncLocalStorage,
        selectCollection,
        unselectCollection,
        bulkAdd,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  )
}

export default CollectionContext
