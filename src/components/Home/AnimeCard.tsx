import styled from '@emotion/styled'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'

import AnimeContext from '../../context/AnimeContext'

import { Anime } from '../../Types/Anime'

import { getTitle } from '../../utils/anime'

type AnimeCardTypes = {
  anime: Anime
}

const Container = styled(Link)`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  height: 240px;
  width: 100%;
  /* max-width: 170px; */
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
  height: 30px;
  width: 30px;
  outline: none;
  border: none;
  opacity: 80%;
  border-radius: 4px;
  position: absolute;
  top: 2px;
  right: 2px;
`

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  opacity: 98%;
  padding: 0.5em;
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgba(255, 255, 255, 0.75);
`

const Title = styled.h2`
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

const RemoveButtonContainer = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  gap: 2px;

  padding: 0.25em 0.5em;
  background-color: var(--bg-light);
  border-radius: 4px;
  position: absolute;
  top: 8px;
  right: 8px;
`

function getImage(anime: Anime): string {
  if (anime.coverImage.large) return anime.coverImage.large
  if (anime.bannerImage) return anime.bannerImage
  return ''
}

function getGenre(anime: Anime): string[] {
  if (anime.genres.length <= 3) return anime.genres
  return anime.genres.slice(0, 3)
}

function AnimeCard(props: AnimeCardTypes) {
  const animeContext = useContext(AnimeContext)
  const { slug } = useParams()

  const [showCheck, setShowCheck] = useState(false)
  const [showRemove, setShowRemove] = useState(false)

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

  function onClickRemove() {
    animeContext?.selectToBeRemovedAnime(props.anime)
  }

  function RemoveButton(props: { onClick: () => void }) {
    return (
      <RemoveButtonContainer
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          props.onClick()
        }}
      >
        <FaTrashAlt /> remove
      </RemoveButtonContainer>
    )
  }

  useEffect(() => {
    setShowCheck(window.location.pathname === '/')
    setShowRemove(window.location.pathname !== '/')
  }, [])

  return (
    <Container
      to={`/anime/${props.anime.idMal}`}
      style={{ borderColor: isChecked() ? 'lime' : '' }}
    >
      <Image
        src={getImage(props.anime)}
        alt={getTitle(props.anime)}
        height="30"
        width="30"
      />
      <Info>
        <Title>{getTitle(props.anime)}</Title>
        <GenreList>
          {getGenre(props.anime).map((genre, index) => (
            <GenreItem key={`genre-${props.anime.idMal}-${index}`}>
              {genre}
            </GenreItem>
          ))}
        </GenreList>
      </Info>
      {showCheck && (
        <Checkbox
          checked={isChecked()}
          type={'checkbox'}
          onChange={(e) => onClickCheckbox(e)}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      {showRemove && <RemoveButton onClick={() => onClickRemove()} />}
    </Container>
  )
}

export default AnimeCard
