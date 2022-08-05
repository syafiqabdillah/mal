import styled from '@emotion/styled'
import { useContext, useEffect, useState } from 'react'
import { FaPlus, FaTrashAlt, FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import ModalAddCollection from './ModalAddCollection'
import ModalEditCollection from './ModalEditCollection'
import ModalRemoveCollection from './ModalRemoveCollection'

import BannerImg from '../BannerImg'
import Button from '../Button'
import Container from '../Container'
import Content from '../Content'

import CollectionContext from '../../context/CollectionContext'

import { Collection } from '../../Types/Collection'

const CollectionList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  gap: 5px;
`

const CollItem = styled.div`
  width: 100%;
  border: 1px solid var(--bg-grey);
  border-radius: 4px;
  height: 120px;
  overflow: hidden;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--bg-light);
  cursor: pointer;
`

const Image = styled.img`
  width: 150px;
  height: 100%;
  object-fit: cover;
`

const Info = styled.div`
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  flex: 1;
`

const Title = styled.h4`
  margin: 0;
`

const Actionables = styled.div`
  display: flex;
  justify-content: flex-end;
`

const RemoveButtonContainer = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  margin-top: auto;
  cursor: pointer;
`

const EditButtonContainer = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-right: 1em;
  font-size: 12px;
  margin-top: auto;
  cursor: pointer;
`

const EmptyState = styled.div`
  width: 250px;
  height: 300px;
  margin: 0 auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

function getImage(col: Collection) {
  let image = '/images/yurucamp.jpg'
  if (col.list.length == 0) return image
  for (let i = 0; i < col.list.length; i++) {
    if (col.list[i].coverImage.large) {
      image = col.list[i].coverImage.large
      break
    }
  }
  return image
}

function AddButton(props: { onClick: () => void }) {
  return (
    <Button
      style={{ marginLeft: 'auto', marginTop: '20px' }}
      onClick={props.onClick}
    >
      <span>
        <FaPlus />
      </span>
      Add a Collection
    </Button>
  )
}

function EditButton(props: { onClick: () => void }) {
  return (
    <EditButtonContainer
      onClick={(e) => {
        e.stopPropagation()
        props.onClick()
      }}
    >
      <FaPen /> <div>edit</div>
    </EditButtonContainer>
  )
}

function RemoveButton(props: { onClick: () => void }) {
  return (
    <RemoveButtonContainer
      onClick={(e) => {
        e.stopPropagation()
        props.onClick()
      }}
    >
      <FaTrashAlt /> remove
    </RemoveButtonContainer>
  )
}

function Collections() {
  const collectionContext = useContext(CollectionContext)
  const navigate = useNavigate()

  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalRemove, setShowModalRemove] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [bannerImage, setBannerImage] = useState('/images/yurucamp.jpg')

  const [toBeRemovedCollection, setToBeRemovedCollection] =
    useState<Collection | null>(null)

  function toggleModalAdd() {
    setShowModalAdd((prev) => !prev)
  }

  function toggleModalRemove() {
    setShowModalRemove((prev) => !prev)
  }

  function toggleModalEdit() {
    setShowModalEdit((prev) => !prev)
  }

  function onClickTrashcan(col: Collection) {
    setToBeRemovedCollection(col)
    toggleModalRemove()
  }

  function onClickPencil(col: Collection) {
    collectionContext?.selectToBeEditedCollection(col)
  }

  function goToCollectionDetail(col: Collection): void {
    navigate(`/collection/${col.id}/${col.slug}`)
  }

  function getBannerImage() {
    let images: string[] = []
    if (collectionContext?.collections) {
      const colls = collectionContext.collections
      for (let i = 0; i < colls.length; i++) {
        for (let j = 0; j < colls[i].list.length; j++) {
          if (colls[i].list[j].bannerImage) {
            images.push(colls[i].list[j].bannerImage)
          }
        }
      }
      if (images.length > 0)
        setBannerImage(images[Math.floor(Math.random() * images.length)])
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setShowModalRemove(false)
    setToBeRemovedCollection(null)
    getBannerImage()
  }, [])

  return (
    <Container>
      <Helmet>
        <title>My Collections</title>
      </Helmet>
      <BannerImg full src={bannerImage} alt="Banner" text="My Collections" />
      {showModalAdd && <ModalAddCollection toggleModalAdd={toggleModalAdd} />}
      {showModalRemove && (
        <ModalRemoveCollection
          toggleModal={toggleModalRemove}
          collection={toBeRemovedCollection}
        />
      )}
      <ModalEditCollection />
      <Content>
        <AddButton onClick={toggleModalAdd} />
        {collectionContext?.collections.length === 0 && (
          <EmptyState>No collections</EmptyState>
        )}
        <CollectionList>
          {collectionContext?.collections.map((collection) => (
            <CollItem
              onClick={() => goToCollectionDetail(collection)}
              key={collection.name}
            >
              <Image src={getImage(collection)} alt={collection.name} />
              <Info>
                <Title>
                  {collection.name} ({collection.list.length})
                </Title>
                <Actionables>
                  <EditButton onClick={() => onClickPencil(collection)} />
                  <RemoveButton onClick={() => onClickTrashcan(collection)} />
                </Actionables>
              </Info>
            </CollItem>
          ))}
        </CollectionList>
      </Content>
    </Container>
  )
}

export default Collections
