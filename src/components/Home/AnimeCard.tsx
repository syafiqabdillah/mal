import styled from '@emotion/styled'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useRoutes } from 'react-router-dom'
import AnimeContext from '../../context/AnimeContext'

import { Anime } from '../../Types/Anime'

type AnimeCardTypes = {
  anime: Anime
}

type MediaTitle = {
  english?: string
  romaji?: string
  native?: string
}

const Container = styled(Link)`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 260px;
  width: 100%;
  max-width: 180px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: var(--bg-dark);
  position: relative;
  border: 2px solid var(--bg-dark);
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`

const Checkbox = styled.input`
  height: 20px;
  width: 20px;
  outline: none;
  border: none;
  border-radius: 4px;
  position: absolute;
  top: 8px;
  right: 8px;
`

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 43%;
  opacity: 98%;
  padding: 0.5em;
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgba(255, 255, 255, 0.75);
`

const Title = styled.h3`
  margin: 0;
  font-size: 12pt;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 10pt;
  width: 100%;
`

const GenreItem = styled.div`
  background-color: var(--bg-grey);
  color: var(--bg-light);
  padding: 0.25em 0.5em;
  border-radius: 4px;
`

function getTitle(title: MediaTitle): string {
  if (title.english) return title.english
  if (title.romaji) return title.romaji
  if (title.native) return title.native
  return '(untitled)'
}

function getImage(anime: Anime): string {
  if (anime.coverImage.large) return anime.coverImage.large
  if (anime.bannerImage) return anime.bannerImage
  return ''
}

function getGenre(anime: Anime): string[] {
  if (anime.genres.length <= 3) return anime.genres
  return anime.genres.slice(3)
}

function AnimeCard(props: AnimeCardTypes) {
  const animeContext = useContext(AnimeContext)
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    setShowCheck(window.location.pathname === '/')
  }, [])

  function onClickCheckbox(e: any) {
    e.stopPropagation()
    if (animeContext?.selectedAnime.includes(props.anime)) {
      animeContext?.unselectAnime(props.anime)
    } else {
      animeContext?.selectAnime(props.anime)
    }
  }

  function isChecked(): boolean {
    return animeContext?.selectedAnime.includes(props.anime) || false
  }

  return (
    <Container
      to={`/anime/${props.anime.idMal}`}
      style={{ borderColor: isChecked() ? 'lime' : '' }}
    >
      <Image
        src={getImage(props.anime)}
        alt={props.anime.title.english}
        height="30"
        width="30"
      />
      {showCheck && (
        <Checkbox
          checked={isChecked()}
          type={'checkbox'}
          onChange={(e) => onClickCheckbox(e)}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <Info>
        <Title>{getTitle(props.anime.title)}</Title>
        <GenreList>
          {getGenre(props.anime).map((genre, index) => (
            <GenreItem key={`genre-${props.anime.idMal}-${index}`}>
              {genre}
            </GenreItem>
          ))}
        </GenreList>
      </Info>
    </Container>
  )
}

export default AnimeCard
