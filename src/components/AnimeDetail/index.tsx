import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FaChevronLeft } from 'react-icons/fa'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'

import Banner from './Banner'
import Button from '../Button'

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

const Description = styled.p`
  line-height: 1.6;
  margin: 20px 0;
`

const CollectionInfo = styled.p`
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

  const [anime, setAnime] = useState<Anime>()
  const [loadingAnime, setLoadingAnime] = useState(true)

  const { loading, error, data } = useQuery(GET_MEDIA_DETAIL, {
    variables: {
      idMal: id,
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (data) {
      setAnime(data.Media)
      setLoadingAnime(false)
    }
  }, [data, loading, error])

  if (loadingAnime || !anime) {
    return <div>Loading...</div>
  }

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
        <Description
          dangerouslySetInnerHTML={{ __html: anime.description }}
        ></Description>
        <CollectionInfo>
          Collections:
          {getRelatedCollections().map((col) => (
            <CollectionItem key={col.slug} to={`/collection/${col.slug}`}>
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
