import { screen, render } from '@testing-library/react'

import Navbar from '../Navbar'

describe('<Navbar />', () => {
  test('it should render correct UI', () => {
    render(<Navbar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Collections')).toBeInTheDocument()
  })

  test('it should have correct links', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    )
    expect(screen.getByRole('link', { name: 'Collections' })).toHaveAttribute(
      'href',
      '/collections'
    )
  })
})
