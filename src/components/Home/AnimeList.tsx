import styled from '@emotion/styled'

import { Anime } from '../../Types/Anime'

import AnimeCard from './AnimeCard'

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  gap: 5px;
  width: 100%;

  @media (min-width: 1000px) {
  }
`

function AnimeList(props: { list: Anime[]; style?: any }) {
  return (
    <List style={props.style}>
      {props.list.map((anime: Anime) => (
        <AnimeCard anime={anime} key={anime.idMal} />
      ))}
    </List>
  )
}

export default AnimeList
