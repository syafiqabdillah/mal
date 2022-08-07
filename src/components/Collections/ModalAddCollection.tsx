import { useContext, useState } from 'react'
import styled from '@emotion/styled'
import { useSnackbar } from 'react-simple-snackbar'

import { DarkButton } from '../Button'

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

function ModalAddCollection(props: { toggleModalAdd: () => void }) {
  const collectionContext = useContext(CollectionContext)
  const [openSnackbar] = useSnackbar()

  const [name, setName] = useState('')

  function onChangeInput(s: string) {
    // regex source https://bobbyhadz.com/blog/javascript-check-if-string-contains-special-characters#:~:text=To%20check%20if%20a%20string,special%20character%20and%20false%20otherwise.&text=Copied!
    if (s === '' || !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(s)) {
      setName(s)
    }
  }

  function isInputError() {
    let slug = getSlug(name)
    if (colNames.includes(name)) return true
    return false
  }

  function getSlug(s: string): string {
    return s.toLowerCase().replace(/ /g, '-')
  }

  function handleSubmit() {
    if (name != '' && !isInputError()) {
      collectionContext?.addCollection(name, getSlug(name))
      props.toggleModalAdd()
      openSnackbar(`Added \"${name}\" to collections`)
      setName('')
    }
  }

  const colNames: string[] = collectionContext
    ? collectionContext?.collections.map((col) => col.name)
    : []

  return (
    <ModalContainer onClick={props.toggleModalAdd}>
      <ModalFormContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Add Collection</ModalTitle>
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
        <DarkButton
          disabled={name === '' || isInputError()}
          style={{ marginTop: '15px', width: '100%' }}
          onClick={handleSubmit}
        >
          Submit
        </DarkButton>
      </ModalFormContainer>
    </ModalContainer>
  )
}

export default ModalAddCollection
