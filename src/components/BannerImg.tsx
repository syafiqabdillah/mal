import styled from '@emotion/styled'

type BannerImageType = {
  full?: boolean
}

type BannerImgType = {
  full?: boolean
  src: string
  alt?: string
  text?: string
}

const Container = styled.div<BannerImageType>`
  width: 100%;
  height: 200px;
  max-width: ${(props) => (props.full ? 'unset' : 'var(--max-w-mobile)')};
  margin: 0 auto;
  position: relative;

  @media (min-width: 500px) {
    height: 300px;
    max-width: ${(props) => (props.full ? 'unset' : 'var(--max-w-desktop)')};
  }
`

const BannerImage = styled.img<BannerImgType>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  filter: brightness(0.3);
`

const Title = styled.h1`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  display: block;
  width: 100%;
`

function BannerImg(props: BannerImgType) {
  return (
    <Container>
      <BannerImage src={props.src} alt={props.alt ? props.alt : ''} />
      {props.text && <Title>{props.text}</Title>}
    </Container>
  )
}

export default BannerImg
