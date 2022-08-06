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

const SearchInput = styled.input`
  height: 40px;
  width: 100%;
  border-radius: 4px;
  margin-top: 10px;
  outline: none;
  border: none;
  padding: 0.25em 1em;
  background-color: rgba(255, 255, 255, 0.7);
`

function Home() {
  const page = qs.parse(window.location.search).p
  const query = qs.parse(window.location.search).q
  const { data } = useQuery(GET_MEDIA, {
    variables: {
      page: page ? page : 1,
      search: query ? query : null,
    },
  })
  const [list, setList] = useState<Anime[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>()
  const [loadingList, setLoadingList] = useState(true)
  const [search, setSearch] = useState('')
  const [bannerImage, setBannerImage] = useState('/images/yurucamp.jpg')

  function getBannerImage(): void {
    if (list.length > 0) {
      let bannerImages: string[] = []
      list.forEach((anime) => {
        if (anime.bannerImage) bannerImages.push(anime.bannerImage)
      })
      if (bannerImages.length > 0) {
        setBannerImage(
          bannerImages[Math.floor(Math.random() * bannerImages.length)]
        )
      }
    }
  }

  function goSearch(): void {
    window.location.href = `/?p=1&q=${encodeURIComponent(search)}`
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (data) {
      setList(data.Page.media)
      setLoadingList(false)
      setPageInfo(data.Page.pageInfo)
      getBannerImage()
    }
  }, [data])

  return (
    <Container>
      <Helmet>
        <title>(not) My Anime List</title>
        <meta name="description" content="My list is way superior than yours" />
      </Helmet>
      {list.length > 0 && (
        <BannerImg src={bannerImage} alt="Banner" text="My Anime List" />
      )}
      <HomeContent>
        {loadingList || !list || !pageInfo ? (
          <div>Loading...</div>
        ) : (
          <React.Fragment>
            <SearchInput
              type="text"
              placeholder="Search by title e.g. Haikyuu, Naruto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? goSearch() : null)}
            />
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
