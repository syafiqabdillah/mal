import { useContext } from 'react'
import styled from '@emotion/styled'

import Button, { DarkButton } from '../Button'

import CollectionContext from '../../context/CollectionContext'

import { Collection } from '../../Types/Collection'

type ModalRemoveCollectionType = {
  toggleModal: () => void
  collection: Collection | null
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalFormContainer = styled.div`
  background-color: var(--bg-light);
  padding: 1em;
  color: var(--bg-dark);
  width: 300px;
  border-radius: 4px;
`

const ModalTitle = styled.h2`
  margin: 0;
  text-align: center;
`

const Confirmation = styled.p`
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
`

const Options = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`

function ModalRemoveCollection(props: ModalRemoveCollectionType) {
  const collectionContext = useContext(CollectionContext)

  function onClickYesRemove(col: Collection | null) {
    if (col) {
      collectionContext?.removeCollection(col)
      props.toggleModal()
    }
  }

  function onClickNoCancel() {
    props.toggleModal()
  }

  return (
    <ModalContainer onClick={props.toggleModal}>
      <ModalFormContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Remove Collection</ModalTitle>
        <Confirmation>
          Are you sure want to remove collection{' '}
          <strong>{props.collection?.name}</strong>?
        </Confirmation>
        <Options>
          <Button onClick={() => onClickYesRemove(props.collection)}>
            Yes
          </Button>
          <DarkButton onClick={() => onClickNoCancel()}>
            No, bring me back
          </DarkButton>
        </Options>
      </ModalFormContainer>
    </ModalContainer>
  )
}

export default ModalRemoveCollection
