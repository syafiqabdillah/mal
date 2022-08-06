import { Anime } from '../../Types/Anime'
import { getTitle, collectionNameValid } from '../anime'

describe('getTitle', () => {
  test('is getTitle return the right output if anime has english title', () => {
    const anime: Anime = {
      idMal: 123,
      title: {
        english: 'Title English',
        romaji: 'Title Romaji',
        native: 'Title Native',
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

    expect(getTitle(anime)).toBe('Title English')
  })

  test('is getTitle return the right output if anime has no english title and has romaji title', () => {
    const anime: Anime = {
      idMal: 123,
      title: {
        english: '',
        romaji: 'Title Romaji',
        native: 'Title Native',
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

    expect(getTitle(anime)).toBe('Title Romaji')
  })

  test('is getTitle return the right output if anime only has native title', () => {
    const anime: Anime = {
      idMal: 123,
      title: {
        english: '',
        romaji: '',
        native: 'Title Native',
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

    expect(getTitle(anime)).toBe('Title Native')
  })
})

describe('collectionNameValid', () => {
  test('is return true when has no special characters and false otherwise', () => {
    expect(collectionNameValid('Real Life Action')).toBe(true)
    expect(collectionNameValid('Real Life Action 12345')).toBe(true)
    expect(collectionNameValid('Real-Life Action')).toBe(false)
    expect(collectionNameValid('Real Life Ac+++tion')).toBe(false)
    expect(collectionNameValid('Real_Life Ac+++tion')).toBe(false)
  })
})
