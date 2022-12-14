import { gql } from '@apollo/client'

export const GET_MEDIA = gql`
  query ($page: Int, $search: String) {
    Page(page: $page, perPage: 10) {
      pageInfo {
        total
        currentPage
        hasNextPage
      }
      media(search: $search) {
        id
        idMal
        bannerImage
        genres
        coverImage {
          medium
          large
        }
        title {
          english
          romaji
          native
        }
        averageScore
      }
    }
  }
`

export const GET_MEDIA_DETAIL = gql`
  query ($idMal: Int) {
    Media(idMal: $idMal, type: ANIME) {
      id
      idMal
      bannerImage
      description
      genres
      season
      seasonYear
      averageScore
      episodes
      duration
      status
      hashtag
      trailer {
        id
        site
        thumbnail
      }
      coverImage {
        medium
        large
        extraLarge
      }
      title {
        english
        romaji
        native
      }
      rankings {
        id
        type
        rank
        format
        allTime
      }
    }
  }
`
