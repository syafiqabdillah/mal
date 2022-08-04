import { useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import ModalAddCollection from './ModalAddCollection'

import BannerImg from '../BannerImg'
import Button from '../Button'
import Container from '../Container'
import Content from '../Content'

import CollectionContext from '../../context/CollectionContext'

const CollectionList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  gap: 10px;
`

const CollItem = styled(Link)`
  width: 100%;
  border: 1px solid var(--bg-light);
  border-radius: 4px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  text-decoration: none;
  color: var(--bg-light);
`

function AddButton(props: { onClick: () => void }) {
  return (
    <Button style={{ marginLeft: 'auto' }} onClick={props.onClick}>
      <span>
        <FaPlus />
      </span>
      Add Collection
    </Button>
  )
}

function Collections() {
  const collectionContext = useContext(CollectionContext)

  const [showModalAdd, setShowModalAdd] = useState(false)

  function toggleModalAdd() {
    setShowModalAdd((prev) => !prev)
  }

  return (
    <Container>
      <BannerImg
        full
        src="/images/yurucamp.jpg"
        alt="Banner"
        text="My Collections"
      />
      {showModalAdd && <ModalAddCollection toggleModalAdd={toggleModalAdd} />}
      <Content>
        <AddButton onClick={toggleModalAdd} />
        <CollectionList>
          {collectionContext?.collections.map((collection) => (
            <CollItem
              to={`/collection/${collection.slug}`}
              key={collection.name}
            >
              <div>{collection.name}</div>
              <div>{collection.list.length}</div>
            </CollItem>
          ))}
        </CollectionList>
      </Content>
    </Container>
  )
}

export default Collections
