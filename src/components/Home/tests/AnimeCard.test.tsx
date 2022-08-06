import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import AnimeCard from '../AnimeCard'

import { Anime } from '../../../Types/Anime'

const dummyAnime: Anime = {
  id: 1,
  idMal: 123,
  title: {
    english: 'Test 123',
    romaji: 'Test 123',
    native: 'Test',
  },
  bannerImage: 'banner.jpg',
  coverImage: {
    medium: 'coverm.jpg',
    large: 'coverl.jpg',
    extraLarge: 'coverxl.jpg',
  },
  genres: ['Love', 'Romance', 'Slice of Life', 'Isekai'],
  description: 'this anime is an anime',
  averageScore: 78,
}

describe('<AnimeCard />', () => {
  test('it should render correct UI', () => {
    let anime = dummyAnime

    render(
      <BrowserRouter>
        <AnimeCard anime={anime} />
      </BrowserRouter>
    )

    expect(screen.getByText('Test 123')).toBeInTheDocument()
    expect(screen.getByAltText('Test 123')).toBeInTheDocument()
    expect(screen.getByText('Love')).toBeInTheDocument()
    expect(screen.getByText('Romance')).toBeInTheDocument()
    expect(screen.getByText('Slice of Life')).toBeInTheDocument()
  })

  test('it should have correct link to anime detail page', () => {
    let anime = dummyAnime

    render(
      <BrowserRouter>
        <AnimeCard anime={anime} />
      </BrowserRouter>
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', '/anime/123')
  })
})
