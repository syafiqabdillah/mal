import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import Pagination from '../Pagination'

import { PageInfo } from '../../../Types/PageInfo'

describe('<Pagination />', () => {
  test('it should render correct UI on first page', () => {
    let pageInfo: PageInfo = {
      currentPage: 1,
      total: 3,
      hasNextPage: true,
    }

    render(
      <BrowserRouter>
        <Pagination pageInfo={pageInfo} />
      </BrowserRouter>
    )

    expect(screen.queryByTestId('first-page-btn')).not.toBeInTheDocument()
    expect(screen.queryByTestId('prev-page-btn')).not.toBeInTheDocument()
    expect(screen.queryByTestId('prev-num-page-btn')).not.toBeInTheDocument()

    expect(screen.queryByTestId('current-page-btn')).toBeInTheDocument()

    expect(screen.queryByTestId('next-page-btn')).toBeInTheDocument()
    expect(screen.queryByTestId('next-num-page-btn')).toBeInTheDocument()
    expect(screen.queryByTestId('last-page-btn')).toBeInTheDocument()
  })

  test('it should render correct UI on middle page', () => {
    let pageInfo: PageInfo = {
      currentPage: 2,
      total: 3,
      hasNextPage: true,
    }

    render(
      <BrowserRouter>
        <Pagination pageInfo={pageInfo} />
      </BrowserRouter>
    )

    expect(screen.queryByTestId('first-page-btn')).toBeInTheDocument()
    expect(screen.queryByTestId('prev-page-btn')).toBeInTheDocument()
    expect(screen.queryByTestId('prev-num-page-btn')).toBeInTheDocument()

    expect(screen.queryByTestId('current-page-btn')).toBeInTheDocument()

    expect(screen.queryByTestId('next-page-btn')).toBeInTheDocument()
    expect(screen.queryByTestId('next-num-page-btn')).toBeInTheDocument()
    expect(screen.queryByTestId('last-page-btn')).toBeInTheDocument()
  })

  test('it should render correct UI on last page', () => {
    let pageInfo: PageInfo = {
      currentPage: 3,
      total: 3,
      hasNextPage: false,
    }

    render(
      <BrowserRouter>
        <Pagination pageInfo={pageInfo} />
      </BrowserRouter>
    )

    expect(screen.queryByTestId('first-page-btn')).toBeInTheDocument()
    expect(screen.queryByTestId('prev-page-btn')).toBeInTheDocument()
    expect(screen.queryByTestId('prev-num-page-btn')).toBeInTheDocument()

    expect(screen.queryByTestId('current-page-btn')).toBeInTheDocument()

    expect(screen.queryByTestId('next-page-btn')).not.toBeInTheDocument()
    expect(screen.queryByTestId('next-num-page-btn')).not.toBeInTheDocument()
    expect(screen.queryByTestId('last-page-btn')).not.toBeInTheDocument()
  })

  test('it should render correct UI if only 1 page', () => {
    let pageInfo: PageInfo = {
      currentPage: 1,
      total: 1,
      hasNextPage: false,
    }

    render(
      <BrowserRouter>
        <Pagination pageInfo={pageInfo} />
      </BrowserRouter>
    )

    expect(screen.queryByTestId('first-page-btn')).not.toBeInTheDocument()
    expect(screen.queryByTestId('prev-page-btn')).not.toBeInTheDocument()
    expect(screen.queryByTestId('prev-num-page-btn')).not.toBeInTheDocument()

    expect(screen.queryByTestId('current-page-btn')).toBeInTheDocument()

    expect(screen.queryByTestId('next-page-btn')).not.toBeInTheDocument()
    expect(screen.queryByTestId('next-num-page-btn')).not.toBeInTheDocument()
    expect(screen.queryByTestId('last-page-btn')).not.toBeInTheDocument()
  })
})
