import React, { useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'

import Button, { DarkButton } from '../Button'

import AnimeContext from '../../context/AnimeContext'
import CollectionContext from '../../context/CollectionContext'

import { Collection } from '../../Types/Collection'

const Container = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  right: 10px;
  transform: translateX(-50%);
  width: 100%;
  max-width: min(90vw, 500px);
  background-color: var(--bg-light);
  color: var(--bg-dark);
  border-radius: 4px;
  padding: 1em;
`

const Title = styled.h4`
  margin: 0;
`

const ListCollection = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 5px;
`

const CollectionItem = styled.div`
  height: 30px;
  border: 1px solid var(--bg-dark);
  padding: 0 0.5em;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`

const InputContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const InputTop = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const Input = styled.input`
  border: 1px solid var(--bg-dark);
  padding: 0.25em 0.5em;
  border-radius: 4px;
  font-size: 14px;
  height: 30px;
  width: 150px;
`

const ErrorMessage = styled.small`
  display: block;
  color: red;
  font-size: 12px;
`

const ButtonSubmit = styled(DarkButton)`
  margin-top: 20px;
  width: 100%;
`

const ButtonCancel = styled(Button)`
  width: 100%;
  color: var(--bg-grey);
`

function BulkAddForm() {
  const animeContext = useContext(AnimeContext)
  const collectionContext = useContext(CollectionContext)

  const [newColName, setNewColName] = useState('')

  useEffect(() => {
    animeContext?.unselectAllAnime()
  }, [])

  function isNewColNameValid() {
    let colNames = collectionContext?.collections.map((col) => col.name)
    let colSlug = collectionContext?.collections.map((col) => col.slug)
    return (
      newColName != '' &&
      !colNames?.includes(newColName) &&
      !colSlug?.includes(getSlug(newColName)) &&
      !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newColName)
    )
  }

  function getSlug(s: string): string {
    return s.toLowerCase().replace(/ /g, '-')
  }

  function isSelectedCol(col: Collection) {
    return (
      collectionContext?.selectedCollections.filter(
        (item) => item.slug == col.slug
      ).length == 1
    )
  }

  function onClickCollection(col: Collection) {
    let slugs = collectionContext?.selectedCollections.map((item) => item.slug)
    if (slugs?.includes(col.slug)) {
      collectionContext?.unselectCollection(col)
    } else {
      collectionContext?.selectCollection(col)
    }
  }

  function onClickSubmit() {
    if (isFormValid() && animeContext) {
      collectionContext?.bulkAdd(animeContext?.selectedAnime)
      animeContext?.unselectAllAnime()
    }
  }

  function onClickCancel() {
    animeContext?.unselectAllAnime()
  }

  function onClickAddCollection() {
    if (isNewColNameValid()) {
      collectionContext?.addCollection(newColName, getSlug(newColName))
      setNewColName('')
    }
  }

  function isFormValid() {
    if (collectionContext && animeContext) {
      return (
        collectionContext.selectedCollections.length > 0 &&
        animeContext.selectedAnime.length > 0
      )
    }
    return false
  }

  if (animeContext?.selectedAnime.length === 0) return <div />
  return (
    <Container>
      <Title>
        Add {animeContext?.selectedAnime.length} selected titles into these
        collections
      </Title>
      <ListCollection>
        {collectionContext?.collections.map((col) => (
          <CollectionItem
            key={col.slug}
            style={
              isSelectedCol(col)
                ? {
                    backgroundColor: 'var(--bg-grey)',
                    color: 'var(--bg-light)',
                  }
                : {}
            }
            onClick={() => onClickCollection(col)}
          >
            {col.name}
          </CollectionItem>
        ))}
      </ListCollection>
      <InputContainer>
        <InputTop>
          <Input
            type="text"
            placeholder="Add Collection"
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
          />
          {isNewColNameValid() && (
            <FaPlus
              style={{ height: '100%' }}
              onClick={() => onClickAddCollection()}
            />
          )}
        </InputTop>
        {newColName != '' && !isNewColNameValid() && (
          <ErrorMessage>collection name must be unique</ErrorMessage>
        )}
      </InputContainer>
      <ButtonSubmit onClick={onClickSubmit}>SUBMIT</ButtonSubmit>
      <ButtonCancel onClick={onClickCancel}>Cancel</ButtonCancel>
    </Container>
  )
}

export default BulkAddForm
