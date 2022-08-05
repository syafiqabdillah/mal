import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'

import ModalRemoveAnime from './ModalRemoveAnime'

import Back from '../Back'
import BannerImg from '../BannerImg'
import Container from '../Container'
import Content from '../Content'

import AnimeList from '../Home/AnimeList'

import CollectionContext from '../../context/CollectionContext'

import { Collection } from '../../Types/Collection'

const EmptyStateContainer = styled.div`
  height: 300px;
  width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

function EmptyState() {
  return (
    <EmptyStateContainer>
      There is no anime in this collection. <br />
      <br /> Try adding some!
    </EmptyStateContainer>
  )
}

function CollectionDetail() {
  let { slug } = useParams()
  const collectionContext = useContext(CollectionContext)
  const [collection, setCollection] = useState<Collection | null>(null)
  const [bannerImage, setBannerImage] = useState('/images/yurucamp.jpg')

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

  function getBannerImage(): void {
    if (collection) {
      let bannerImages: string[] = []
      for (let i = 0; i < collection.list.length; i++) {
        if (collection.list[i].bannerImage)
          bannerImages.push(collection.list[i].bannerImage)
      }
      if (bannerImages.length > 0) {
        setBannerImage(
          bannerImages[Math.floor(Math.random() * bannerImages.length)]
        )
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getBannerImage()
  }, [collection])

  useEffect(() => {
    getCollection()
  }, [collectionContext])

  return (
    <Container>
      {collection && (
        <React.Fragment>
          <Helmet>
            <title>Collection | {collection.name}</title>
          </Helmet>
          <BannerImg src={bannerImage} text={collection.name} />
          <Content style={{ paddingTop: '15px' }}>
            <Back />
            {collection.list.length == 0 && <EmptyState />}
            {collection.list.length > 0 && <AnimeList list={collection.list} />}
          </Content>
        </React.Fragment>
      )}
      <ModalRemoveAnime collection={collection} />
    </Container>
  )
}

export default CollectionDetail
