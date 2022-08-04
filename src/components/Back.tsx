import styled from '@emotion/styled'
import { FaChevronLeft } from 'react-icons/fa'

const Container = styled.div`
  cursor: pointer;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  gap: 5px;
`

function Back() {
  return (
    <Container onClick={() => window.history.back()}>
      <FaChevronLeft /> back
    </Container>
  )
}

export default Back
