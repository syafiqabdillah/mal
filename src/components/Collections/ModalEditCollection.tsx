import { useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'

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

function ModalEditCollection(props: { toggleModal: () => void }) {
  const collectionContext = useContext(CollectionContext)

  const [initName, setInitName] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (collectionContext?.selectedCollection) {
      setName(collectionContext.selectedCollection.name)
      setInitName(collectionContext.selectedCollection.name)
    }
  }, [])

  function onChangeInput(s: string) {
    // regex source https://bobbyhadz.com/blog/javascript-check-if-string-contains-special-characters#:~:text=To%20check%20if%20a%20string,special%20character%20and%20false%20otherwise.&text=Copied!
    if (s === '' || !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(s)) {
      setName(s)
    }
  }

  function isInputError() {
    let slug = getSlug(name)
    if (initName === name) return false
    if (colNames.includes(name)) return true
    if (name.length === slug.length) return colSlugs.includes(slug)
    return false
  }

  function getSlug(s: string): string {
    return s.toLowerCase().replace(/ /g, '-')
  }

  function handleSubmit() {
    if (
      name != '' &&
      !isInputError() &&
      collectionContext?.selectedCollection
    ) {
      let updatedCol = {
        ...collectionContext?.selectedCollection,
        name,
        slug: getSlug(name),
      }
      collectionContext?.editCollection(updatedCol)
      props.toggleModal()
    }
  }

  const colNames: string[] = collectionContext
    ? collectionContext?.collections.map((col) => col.name)
    : []

  const colSlugs: string[] = collectionContext
    ? collectionContext.collections.map((col) => col.slug)
    : []

  return (
    <ModalContainer onClick={props.toggleModal}>
      <ModalFormContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Edit Collection</ModalTitle>
        <ModalInput
          autoFocus
          type="text"
          value={name}
          onChange={(e) => onChangeInput(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? handleSubmit() : null)}
        />
        {isInputError() && (
          <ErrorMessage>Same collection name is not allowed</ErrorMessage>
        )}
        <div style={{ display: 'flex' }}>
          <DarkButton
            disabled={isInputError()}
            style={{ marginTop: '15px', width: '100%' }}
            onClick={handleSubmit}
          >
            Save
          </DarkButton>
          <Button
            style={{ width: '100%', marginTop: '10px' }}
            onClick={() => props.toggleModal()}
          >
            Cancel
          </Button>
        </div>
      </ModalFormContainer>
    </ModalContainer>
  )
}

export default ModalEditCollection
