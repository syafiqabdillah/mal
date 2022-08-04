import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { FaChevronLeft } from 'react-icons/fa'

import Banner from './Banner'

import { Anime } from '../../Types/Anime'
import { GET_MEDIA_DETAIL } from '../../GraphQL/queries'
import { getTitle } from '../../utils/anime'

const Container = styled.div`
  min-height: 100vh;
  max-width: 700px;
  margin: 0 auto;
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
`

function AnimeDetail() {
  let { id } = useParams()
  const [anime, setAnime] = useState<Anime>()
  const [loadingAnime, setLoadingAnime] = useState(true)

  const { loading, error, data } = useQuery(GET_MEDIA_DETAIL, {
    variables: {
      idMal: id,
    },
  })

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

  return (
    <Container>
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
      </Detail>
    </Container>
  )
}

export default AnimeDetail
