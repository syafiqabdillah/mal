import React, { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Anime } from '../Types/Anime'
import { Collection } from '../Types/Collection'

type CollectionContextType = {
  collections: Collection[]
  selectedCollections: Collection[]
  selectedCollection: Collection | null
  selectOneCollection: (col: Collection | null) => void
  addCollection: (name: string, slug: string) => void
  removeCollection: (collection: Collection) => void
  editCollection: (collection: Collection) => void
  syncLocalStorage: () => void
  selectCollection: (col: Collection) => void
  unselectCollection: (col: Collection) => void
  bulkAdd: (animeList: Anime[]) => void
  removeAnimeFromCollection: (anime: Anime, collection: Collection) => void
}

const CollectionContext = createContext<CollectionContextType | null>(null)

export function CollectionProvider(props: { children: React.ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>([])
  const [selectedCollections, setSelectedCollections] = useState<Collection[]>(
    []
  )
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null)

  function saveToLocalStorage(colls: Collection[]): void {
    localStorage.setItem('collections', JSON.stringify(colls))
  }

  const selectCollection = (col: Collection) => {
    setSelectedCollections((prev) => [...prev, col])
  }

  const selectOneCollection = (col: Collection | null) => {
    setSelectedCollection(col)
  }

  const unselectCollection = (col: Collection) => {
    let filtered = selectedCollections.filter((item) => item.slug !== col.slug)
    setSelectedCollections(filtered)
  }

  const addCollection = (name: string, slug: string) => {
    let newCollection = [...collections, { name, slug, list: [], id: uuidv4() }]
    setCollections(newCollection)
    saveToLocalStorage(newCollection)
  }

  const removeCollection = (col: Collection) => {
    let filtered = collections.filter((item) => item.id !== col.id)
    setCollections(filtered)
    saveToLocalStorage(filtered)
  }

  const editCollection = (col: Collection) => {
    let filtered = collections.filter((item) => item.id !== col.id)
    let newCollections = [...filtered, col]
    setCollections(newCollections)
    saveToLocalStorage(newCollections)
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
    saveToLocalStorage(newCollections)
  }

  const removeAnimeFromCollection = (anime: Anime, collection: Collection) => {
    const otherCollections = collections.filter(
      (item) => item.id != collection.id
    )
    const filterredAnimeList = collection.list.filter(
      (item) => item.idMal != anime.idMal
    )
    const updatedCollection = Object.assign(collection, {
      list: filterredAnimeList,
    })
    setCollections([...otherCollections, updatedCollection])
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
        selectedCollection,
        selectOneCollection,
        addCollection,
        removeCollection,
        editCollection,
        syncLocalStorage,
        selectCollection,
        unselectCollection,
        bulkAdd,
        removeAnimeFromCollection,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  )
}

export default CollectionContext
