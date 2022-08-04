import styled from '@emotion/styled'
import { useContext, useEffect, useState } from 'react'
import { FaPlus, FaTrashAlt, FaPen } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import ModalAddCollection from './ModalAddCollection'

import BannerImg from '../BannerImg'
import Button from '../Button'
import Container from '../Container'
import Content from '../Content'

import CollectionContext from '../../context/CollectionContext'
import { Collection } from '../../Types/Collection'
import ModalRemoveCollection from './ModalRemoveCollection'
import ModalEditCollection from './ModalEditCollection'

const CollectionList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  gap: 10px;
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
  align-items: flex-start;
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  flex: 1;
`

const RemoveButtonContainer = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-right: 1em;
  font-size: 12px;
  margin-top: auto;
  cursor: pointer;
`

const EditButtonContainer = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-right: 1em;
  font-size: 12px;
  margin-top: auto;
  cursor: pointer;
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
    <Button style={{ marginLeft: 'auto' }} onClick={props.onClick}>
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
      <FaPen /> edit
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
    collectionContext?.selectOneCollection(col)
    toggleModalEdit()
  }

  function goToCollectionDetail(slug: string): void {
    navigate(`/collection/${slug}`)
  }

  useEffect(() => {
    setShowModalRemove(false)
    setToBeRemovedCollection(null)
  }, [])

  return (
    <Container>
      <BannerImg
        full
        src="/images/yurucamp.jpg"
        alt="Banner"
        text="My Collections"
      />
      {showModalAdd && <ModalAddCollection toggleModalAdd={toggleModalAdd} />}
      {showModalRemove && (
        <ModalRemoveCollection
          toggleModal={toggleModalRemove}
          collection={toBeRemovedCollection}
        />
      )}
      {showModalEdit && <ModalEditCollection toggleModal={toggleModalEdit} />}
      <Content>
        <AddButton onClick={toggleModalAdd} />
        <CollectionList>
          {collectionContext?.collections.map((collection) => (
            <CollItem
              onClick={() => goToCollectionDetail(collection.slug)}
              key={collection.name}
            >
              <Image src={getImage(collection)} alt={collection.name} />
              <Info>
                {collection.name} ({collection.list.length})
              </Info>
              <EditButton onClick={() => onClickPencil(collection)} />
              <RemoveButton onClick={() => onClickTrashcan(collection)} />
            </CollItem>
          ))}
        </CollectionList>
      </Content>
    </Container>
  )
}

export default Collections
