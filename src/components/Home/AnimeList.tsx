import styled from '@emotion/styled'

import { Anime } from '../../Types/Anime'

import AnimeCard from './AnimeCard'

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  justify-items: center;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 1000px) {
    grid-template-columns: repeat(5, 1fr);
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
