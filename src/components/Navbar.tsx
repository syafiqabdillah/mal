import styled from '@emotion/styled'
import { FaHome } from 'react-icons/fa'
import { BsFillCollectionFill } from 'react-icons/bs'

const NavbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 70px;
  width: 100%;
  background-color: var(--bg-grey);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
`

const NavbarItemContainer = styled.a`
  text-decoration: none;
  color: var(--bg-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;

  & > svg {
    font-size: 1.3em;
  }
`

function Navbar() {
  return (
    <NavbarContainer>
      <NavbarItemContainer href="/">
        <FaHome />
        <div>Home</div>
      </NavbarItemContainer>
      <NavbarItemContainer href={'/collections'}>
        <BsFillCollectionFill />
        <div>Collections</div>
      </NavbarItemContainer>
    </NavbarContainer>
  )
}

export default Navbar
