import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import * as qs from 'query-string'
import { Helmet } from 'react-helmet'

import AnimeList from './AnimeList'
import BulkAddForm from './BulkAddForm'
import Content from '../Content'
import Pagination from './Pagination'

import BannerImg from '../BannerImg'

import { Anime } from '../../Types/Anime'
import { PageInfo } from '../../Types/PageInfo'

import { GET_MEDIA } from '../../GraphQL/queries'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HomeContent = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function Home() {
  const page = qs.parse(window.location.search).p
  const { data } = useQuery(GET_MEDIA, {
    variables: {
      page: page ? page : 1,
    },
  })
  const [list, setList] = useState<Anime[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>()
  const [loadingList, setLoadingList] = useState(true)

  function getBannerImage() {
    let image = '/image/yurucamp.jpg'
    if (list.length > 0) {
      let bannerImages: string[] = []
      list.forEach((anime) => {
        if (anime.bannerImage) bannerImages.push(anime.bannerImage)
      })
      if (bannerImages.length > 0) {
        return bannerImages[Math.floor(Math.random() * bannerImages.length)]
      }
    }
    return image
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (data) {
      setList(data.Page.media)
      setLoadingList(false)
      setPageInfo(data.Page.pageInfo)
    }
  }, [data])

  return (
    <Container>
      <Helmet>
        <title>(not) My Anime List</title>
        <meta name="description" content="My list is way superior than yours" />
      </Helmet>
      {list.length > 0 && (
        <BannerImg src={getBannerImage()} alt="Banner" text="My Anime List" />
      )}
      <HomeContent>
        {loadingList || !list || !pageInfo ? (
          <div>Loading...</div>
        ) : (
          <React.Fragment>
            <AnimeList list={list} />
            <Pagination pageInfo={pageInfo} />
          </React.Fragment>
        )}
        <BulkAddForm />
      </HomeContent>
    </Container>
  )
}

export default Home
