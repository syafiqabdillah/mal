import { useState } from 'react'
import styled from '@emotion/styled'
import { FaSearch } from 'react-icons/fa'

const Container = styled.div`
  position: absolute;
  height: 40px;
  top: -50px;
  right: 15px;
  left: 15px;
  border-radius: 4px;
  overflow: hidden;
`

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  padding: 0.25em 1em;
  background-color: rgba(255, 255, 255, 0.7);
`

const SearchButton = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;

  background-color: var(--bg-grey);
`

function Search() {
  const [search, setSearch] = useState('')

  function goSearch(): void {
    window.location.href = `/?p=1&q=${encodeURIComponent(search)}`
  }

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search by title e.g. Haikyuu, Naruto, One Piece"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? goSearch() : null)}
      />
      <SearchButton onClick={goSearch}>
        <FaSearch />
      </SearchButton>
    </Container>
  )
}

export default Search
