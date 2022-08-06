import styled from '@emotion/styled'
import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import * as qs from 'query-string'

import { PageInfo } from '../../Types/PageInfo'

type AProps = {
  href: string
  active?: boolean
}

const PaginationContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 100px;
`

const PaginationItem = styled('a')<AProps>`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--bg-light);
  background-color: ${(props) =>
    props.active ? 'var(--bg-grey)' : 'var(--bg-dark)'};

  &:hover {
    background-color: var(--bg-grey);
    cursor: pointer;
  }
`

function Pagination(props: { pageInfo: PageInfo }) {
  function hasNext() {
    return props.pageInfo.hasNextPage
  }
  function hasPrev() {
    return props.pageInfo.currentPage > 1
  }
  function getQuery() {
    return qs.parse(window.location.search).q
  }

  return (
    <PaginationContainer>
      {hasPrev() && (
        <React.Fragment>
          <PaginationItem
            href={`/?p=1&q=${getQuery()}`}
            data-testid="first-page-btn"
          >
            <FaChevronLeft />
            <FaChevronLeft />
          </PaginationItem>
          <PaginationItem
            href={`/?p=${props.pageInfo.currentPage - 1}&q=${getQuery()}`}
            data-testid="prev-page-btn"
          >
            <FaChevronLeft />
          </PaginationItem>
          <PaginationItem
            href={`/?p=${props.pageInfo.currentPage - 1}&q=${getQuery()}`}
            data-testid="prev-num-page-btn"
          >
            {props.pageInfo.currentPage - 1}
          </PaginationItem>
        </React.Fragment>
      )}

      <PaginationItem
        active={true}
        href={`/?p=${props.pageInfo.currentPage}&q=${getQuery()}`}
        data-testid="current-page-btn"
      >
        {props.pageInfo.currentPage}
      </PaginationItem>

      {hasNext() && (
        <React.Fragment>
          <PaginationItem
            href={`/?p=${props.pageInfo.currentPage + 1}&q=${getQuery()}`}
            data-testid="next-num-page-btn"
          >
            {props.pageInfo.currentPage + 1}
          </PaginationItem>
          <PaginationItem
            href={`/?p=${props.pageInfo.currentPage + 1}&q=${getQuery()}`}
            data-testid="next-page-btn"
          >
            <FaChevronRight />
          </PaginationItem>
          <PaginationItem
            href={`/?p=${props.pageInfo.total}`}
            data-testid="last-page-btn"
          >
            <FaChevronRight />
            <FaChevronRight />
          </PaginationItem>
        </React.Fragment>
      )}
    </PaginationContainer>
  )
}

export default Pagination
