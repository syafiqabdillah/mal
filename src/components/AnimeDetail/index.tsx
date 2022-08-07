import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FaChevronLeft } from 'react-icons/fa'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { useSnackbar } from 'react-simple-snackbar'

import Banner from './Banner'
import Button from '../Button'
import Loading from '../Loading'

import { getTitle } from '../../utils/anime'

import { Anime } from '../../Types/Anime'

import { GET_MEDIA_DETAIL } from '../../GraphQL/queries'

import BulkAddForm from '../Home/BulkAddForm'

import AnimeContext from '../../context/AnimeContext'
import CollectionContext from '../../context/CollectionContext'
import { Collection } from '../../Types/Collection'

const Container = styled.div`
  min-height: 100vh;
  max-width: 700px;
  margin: 0 auto 100px;
  position: relative;
`

const Cover = styled.img`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid var(--bg-light);
  height: 130px;
  width: 130px;
  object-fit: cover;
  border-radius: 4px;
`

const Detail = styled.div`
  padding: 1em;
  margin-top: 20px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Back = styled.div`
  cursor: pointer;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Title = styled.h1`
  margin: 0;
`

const Genres = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  font-size: 12px;
`

const Genre = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25em 1em;
  border-radius: 4px;
  background-color: var(--bg-grey);
  color: var(--bg-light);
`

const DetailInfo = styled.p`
  margin: 0;
  font-size: 12px;
  margin-top: 15px;
  font-style: italic;
`

const Description = styled.p`
  line-height: 1.6;
  margin: 15px 0;
  font-size: 14px;
`

const CollectionInfo = styled.p`
  font-size: 14px;
  margin: 0;
  font-style: italic;
`

const AddToCollectionButton = styled(Button)`
  margin-top: 20px;
`

const CollectionItem = styled(Link)`
  color: var(--bg-light);
  margin-left: 10px;
`

function AnimeDetail() {
  let { id } = useParams()
  const animeContext = useContext(AnimeContext)
  const collectionContext = useContext(CollectionContext)
  const [openSnackbar] = useSnackbar()
  const [anime, setAnime] = useState<Anime>()
  const [loadingAnime, setLoadingAnime] = useState(true)

  function getBannerImage() {
    if (!anime) return ''
    return anime.bannerImage ? anime.bannerImage : anime.coverImage.extraLarge
  }

  function getCoverImage() {
    if (!anime) return ''
    return anime.coverImage.large
  }

  function onClickAddToCollection() {
    if (anime) {
      animeContext?.selectAnime(anime)
    }
  }

  function getRelatedCollections(): Collection[] {
    let cols: Collection[] = []
    collectionContext?.collections.forEach((col) => {
      col.list.forEach((item) => {
        if (anime?.idMal === item.idMal) cols.push(col)
      })
    })
    return cols
  }

  const { loading, error, data, refetch } = useQuery(GET_MEDIA_DETAIL, {
    variables: {
      idMal: id,
    },
  })

  useEffect(() => {
    if (error) {
      openSnackbar('Error fetching anime. Redirecting to Home.')
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    }
  }, [error])

  useEffect(() => {
    window.scrollTo(0, 0)
    // refetch after 2s no response
    setTimeout(() => {
      if (!anime) refetch()
    }, 2000)
  }, [])

  useEffect(() => {
    if (data) {
      setAnime(data.Media)
      setLoadingAnime(false)
    }
  }, [data, loading, error])

  if (loadingAnime || !anime) {
    return <Loading />
  }

  return (
    <Container>
      <Helmet>
        <title>{getTitle(anime)}</title>
      </Helmet>
      <Banner src={getBannerImage()} alt={getTitle(anime)} />
      <Cover src={getCoverImage()} alt={`cover ${anime.title.english}`} />
      <Detail>
        <Back onClick={() => window.history.back()}>
          <FaChevronLeft /> back
        </Back>
        <Title>{anime.title.english}</Title>
        <Genres>
          {anime.genres.map((genre) => (
            <Genre key={genre}>{genre}</Genre>
          ))}
        </Genres>
        <DetailInfo>
          Episodes: {anime.episodes ? anime.episodes : 'ongoing'}
        </DetailInfo>
        <DetailInfo>Avg Duration: {anime.duration} minutes</DetailInfo>
        <DetailInfo>Status: {anime.status}</DetailInfo>
        <DetailInfo>Avg Score: {anime.averageScore}/100</DetailInfo>
        <Description
          dangerouslySetInnerHTML={{ __html: anime.description }}
        ></Description>
        <CollectionInfo>
          Collections:
          {getRelatedCollections().map((col) => (
            <CollectionItem
              key={col.slug}
              to={`/collection/${col.id}/${col.slug}`}
            >
              {col.name}
            </CollectionItem>
          ))}
        </CollectionInfo>
        <AddToCollectionButton onClick={() => onClickAddToCollection()}>
          Add to Collection
        </AddToCollectionButton>
        <BulkAddForm />
      </Detail>
    </Container>
  )
}

export default AnimeDetail
