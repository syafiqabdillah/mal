import { render, screen } from '@testing-library/react'

import Banner from '../Banner'

describe('<Banner />', () => {
  test('it should render correct UI', () => {
    render(<Banner src="/images/yurucamp.jpg" alt="banner image" />)
    expect(screen.getByAltText('banner image')).toBeInTheDocument()
  })
})
