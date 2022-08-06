import { useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSnackbar } from 'react-simple-snackbar'

import Button, { DarkButton } from '../Button'

import AnimeContext from '../../context/AnimeContext'
import CollectionContext from '../../context/CollectionContext'

import { getTitle } from '../../utils/anime'

import { Anime } from '../../Types/Anime'
import { Collection } from '../../Types/Collection'
import ModalEditCollection from '../Collections/ModalEditCollection'

type ModalRemoveAnimeType = {
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

function ModalRemoveAnime(props: ModalRemoveAnimeType) {
  const animeContext = useContext(AnimeContext)
  const collectionContext = useContext(CollectionContext)
  const [openSnackbar] = useSnackbar()

  const [anime, setAnime] = useState<Anime | null>(null)

  function onClickYesRemove() {
    if (collectionContext && anime && props.collection) {
      collectionContext?.removeAnimeFromCollection(anime, props.collection)
      closeModal()
      openSnackbar(
        `Removed \"${getTitle(anime)}\" from collection \"${
          props.collection.name
        }\"`
      )
    }
  }

  function onClickNoCancel() {
    closeModal()
  }

  function closeModal() {
    setAnime(null)
    animeContext?.selectToBeRemovedAnime(null)
  }

  useEffect(() => {
    if (animeContext?.toBeRemovedAnime) {
      setAnime(animeContext.toBeRemovedAnime)
    }
  }, [animeContext?.toBeRemovedAnime])

  if (anime)
    return (
      <ModalContainer onClick={() => onClickNoCancel()}>
        <ModalFormContainer onClick={(e) => e.stopPropagation()}>
          <ModalTitle>Remove Anime</ModalTitle>
          <Confirmation>
            Are you sure want to remove <strong>{getTitle(anime)}</strong> from
            collection <strong>{props.collection?.name}</strong> ?
          </Confirmation>
          <Options>
            <Button onClick={() => onClickYesRemove()}>Yes</Button>
            <DarkButton onClick={() => onClickNoCancel()}>
              No, bring me back
            </DarkButton>
          </Options>
        </ModalFormContainer>
      </ModalContainer>
    )
  return <div />
}

export default ModalRemoveAnime
