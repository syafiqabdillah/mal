import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from '@emotion/styled'

import AnimeDetail from './components/AnimeDetail'
import Collections from './components/Collections'
import CollectionDetail from './components/CollectionDetail'
import Home from './components/Home'
import Navbar from './components/Navbar'

import CollectionContext from './context/CollectionContext'

const Container = styled.div`
  position: relative;
`

function App() {
  const collectionContext = useContext(CollectionContext)

  useEffect(() => {
    collectionContext?.syncLocalStorage()
  }, [])

  return (
    <Container>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collection/:slug" element={<CollectionDetail />} />
      </Routes>
      <Navbar />
    </Container>
  )
}

export default App
