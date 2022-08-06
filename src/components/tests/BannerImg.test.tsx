import { screen, render } from '@testing-library/react'

import BannerImg from '../BannerImg'

describe('<BannerImg />', () => {
  test('it should render correct UI', () => {
    render(<BannerImg src="images.jpg" alt="banner image" />)

    expect(screen.getByAltText('banner image')).toBeInTheDocument()
  })

  test('it should render correct UI when there is text props', () => {
    render(
      <BannerImg src="images.jpg" alt="banner image" text="This is Text" />
    )

    expect(screen.getByAltText('banner image')).toBeInTheDocument()
    expect(screen.getByText('This is Text')).toBeInTheDocument()
  })
})
