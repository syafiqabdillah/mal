import styled from '@emotion/styled'

type BannerType = {
  src: string
  alt: string
}

const Img = styled.img`
  height: 20vh;
  width: 100%;
  max-width: var(--max-w);
  object-fit: cover;
`

function Banner(props: BannerType) {
  return <Img src={props.src} alt={props.alt} />
}

export default Banner
