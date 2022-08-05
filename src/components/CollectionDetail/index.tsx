import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'

import ModalEditCollection from '../Collections/ModalEditCollection'
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

const EditColContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.7);
  color: var(--bg-dark);
  padding: 0.25em 0.65em;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`

function EmptyState() {
  return (
    <EmptyStateContainer>
      There is no anime in this collection. <br />
      <br /> Try adding some!
    </EmptyStateContainer>
  )
}

function EditButton(props: { onClick: () => void }) {
  return <EditColContainer onClick={props.onClick}>edit</EditColContainer>
}

function CollectionDetail() {
  let { id } = useParams()
  const collectionContext = useContext(CollectionContext)
  const [collection, setCollection] = useState<Collection | null>(null)
  const [bannerImage, setBannerImage] = useState('/images/yurucamp.jpg')

  function getCollection(): void {
    let collections = collectionContext?.collections
    if (collections) {
      for (let i = 0; i < collections.length; i++) {
        let col = collections[i]
        if (col.id === id) {
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

  function onClickEdit() {
    if (collection) {
      collectionContext?.selectToBeEditedCollection(collection)
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
          <EditButton onClick={onClickEdit} />
          <Content style={{ paddingTop: '15px' }}>
            <Back />
            {collection.list.length == 0 && <EmptyState />}
            {collection.list.length > 0 && <AnimeList list={collection.list} />}
          </Content>
        </React.Fragment>
      )}
      <ModalEditCollection afterEdit={() => getCollection()} />
      <ModalRemoveAnime collection={collection} />
    </Container>
  )
}

export default CollectionDetail
