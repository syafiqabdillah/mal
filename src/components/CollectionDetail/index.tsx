import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import BannerImg from '../BannerImg'
import Container from '../Container'
import Content from '../Content'

import AnimeList from '../Home/AnimeList'

import CollectionContext from '../../context/CollectionContext'

import { Collection } from '../../Types/Collection'
import { text } from 'stream/consumers'
import Back from '../Back'

function CollectionDetail() {
  let { slug } = useParams()
  const collectionContext = useContext(CollectionContext)
  const [collection, setCollection] = useState<Collection | null>(null)

  function getCollection(): void {
    let collections = collectionContext?.collections
    if (collections) {
      for (let i = 0; i < collections.length; i++) {
        let col = collections[i]
        if (col.slug === slug) {
          setCollection(col)
          break
        }
      }
    }
  }

  function getBannerImage() {
    let image = '/image/yurucamp.jpg'
    if (collection?.list) {
      let bannerImages: string[] = []
      collection.list.forEach((anime) => {
        if (anime.bannerImage) bannerImages.push(anime.bannerImage)
      })
      if (bannerImages.length > 0) {
        return bannerImages[Math.floor(Math.random() * bannerImages.length)]
      }
    }
    return image
  }

  useEffect(() => {
    getCollection()
  }, [collectionContext])

  return (
    <Container>
      {collection && (
        <React.Fragment>
          {collection.list.length > 0 && (
            <BannerImg src={getBannerImage()} text={collection.name} />
          )}
          <Content>
            <Back />
            <AnimeList list={collection.list} />
          </Content>
        </React.Fragment>
      )}
    </Container>
  )
}

export default CollectionDetail
