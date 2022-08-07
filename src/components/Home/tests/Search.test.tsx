import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Search from '../Search'

describe('<Search />', () => {
  test('it should redirect to correct url when search button is clicked', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: jest.fn() },
    })
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByLabelText('search'), {
      target: { value: 'naruto' },
    })

    expect((screen.getByLabelText('search') as HTMLInputElement).value).toBe(
      'naruto'
    )

    fireEvent.click(screen.getByTestId('search-btn'))

    expect(window.location.assign).toHaveBeenCalledWith('/?p=1&q=naruto')
  })
})
