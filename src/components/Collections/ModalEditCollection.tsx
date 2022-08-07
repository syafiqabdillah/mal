import { useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSnackbar } from 'react-simple-snackbar'

import Button, { DarkButton } from '../Button'

import CollectionContext from '../../context/CollectionContext'

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
`

const ModalInput = styled.input`
  height: 40px;
  width: 100%;
  padding: 0 1em;
  border-radius: 4px;
  margin-top: 15px;
  border: 1px solid grey;
`

const ErrorMessage = styled.small`
  display: block;
  color: red;
  margin-top: 15px;
`

function ModalEditCollection(props: { afterEdit?: () => void }) {
  const collectionContext = useContext(CollectionContext)

  const [initName, setInitName] = useState('')
  const [name, setName] = useState('')
  const [openSnackbar] = useSnackbar()

  useEffect(() => {
    if (collectionContext?.toBeEditedCollection) {
      const col = collectionContext.toBeEditedCollection
      setName(col.name)
      setInitName(col.name)
    }
  }, [collectionContext?.toBeEditedCollection])

  function onChangeInput(s: string) {
    // regex source https://bobbyhadz.com/blog/javascript-check-if-string-contains-special-characters#:~:text=To%20check%20if%20a%20string,special%20character%20and%20false%20otherwise.&text=Copied!
    if (s === '' || !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(s)) {
      setName(s)
    }
  }

  function isInputError() {
    if (initName === name) return false
    if (colNames.includes(name)) return true
    return false
  }

  function getSlug(s: string): string {
    return s.toLowerCase().replace(/ /g, '-')
  }

  function onClickSave() {
    if (
      name != '' &&
      !isInputError() &&
      collectionContext?.toBeEditedCollection
    ) {
      let updatedCol = {
        ...collectionContext?.toBeEditedCollection,
        name,
        slug: getSlug(name),
      }
      collectionContext?.editCollection(updatedCol)
      collectionContext.selectToBeEditedCollection(null)
      openSnackbar(
        `Editted collection name from \"${initName}\" to \"${name}\"`
      )
      if (props.afterEdit) props.afterEdit()
    }
  }

  function onClickCancel() {
    collectionContext?.selectToBeEditedCollection(null)
  }

  const colNames: string[] = collectionContext
    ? collectionContext?.collections.map((col) => col.name)
    : []

  if (collectionContext?.toBeEditedCollection)
    return (
      <ModalContainer>
        <ModalFormContainer onClick={(e) => e.stopPropagation()}>
          <ModalTitle>Edit Collection</ModalTitle>
          <ModalInput
            autoFocus
            type="text"
            value={name}
            onChange={(e) => onChangeInput(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? onClickSave() : null)}
          />
          {isInputError() && (
            <ErrorMessage>Collection name must be unique</ErrorMessage>
          )}
          <div style={{ display: 'flex' }}>
            <DarkButton
              disabled={isInputError()}
              style={{ marginTop: '15px', width: '100%' }}
              onClick={onClickSave}
            >
              Save
            </DarkButton>
            <Button
              style={{ width: '100%', marginTop: '10px' }}
              onClick={onClickCancel}
            >
              Cancel
            </Button>
          </div>
        </ModalFormContainer>
      </ModalContainer>
    )
  return <div />
}

export default ModalEditCollection
