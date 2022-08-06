import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import AnimeList from '../AnimeList'

import { Anime } from '../../../Types/Anime'

const getDummyAnime = (idMal: number): Anime => {
  return {
    idMal: idMal,
    title: {
      english: `Test ${idMal}`,
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
}

describe('<AnimeList />', () => {
  test('it should render correct UI', () => {
    let animeList: Anime[] = [
      getDummyAnime(1),
      getDummyAnime(2),
      getDummyAnime(3),
      getDummyAnime(4),
      getDummyAnime(5),
      getDummyAnime(6),
      getDummyAnime(7),
      getDummyAnime(8),
      getDummyAnime(9),
      getDummyAnime(10),
    ]

    render(
      <BrowserRouter>
        <AnimeList list={animeList} />
      </BrowserRouter>
    )

    expect(screen.getByText('Test 1')).toBeInTheDocument()
    expect(screen.getByText('Test 2')).toBeInTheDocument()
    expect(screen.getByText('Test 3')).toBeInTheDocument()
    expect(screen.getByText('Test 4')).toBeInTheDocument()
    expect(screen.getByText('Test 5')).toBeInTheDocument()
    expect(screen.getByText('Test 6')).toBeInTheDocument()
    expect(screen.getByText('Test 7')).toBeInTheDocument()
    expect(screen.getByText('Test 8')).toBeInTheDocument()
    expect(screen.getByText('Test 9')).toBeInTheDocument()
    expect(screen.getByText('Test 10')).toBeInTheDocument()
  })
})
