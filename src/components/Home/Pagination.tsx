import styled from '@emotion/styled'
import React from 'react'

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
  border: 1px solid slategray;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${(props) => (props.active ? 'var(--bg-dark)' : 'var(--bg-light)')};
  background-color: ${(props) =>
    props.active ? 'var(--bg-light)' : 'var(--bg-dark)'};

  &:hover {
    background-color: var(--bg-light);
    color: var(--bg-dark);
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

  return (
    <PaginationContainer>
      {hasPrev() && (
        <React.Fragment>
          <PaginationItem href={`/?p=1`}>&lt;&lt;</PaginationItem>
          <PaginationItem href={`/?p=${props.pageInfo.currentPage - 1}`}>
            &lt;
          </PaginationItem>
          <PaginationItem href={`/?p=${props.pageInfo.currentPage - 1}`}>
            {props.pageInfo.currentPage - 1}
          </PaginationItem>
        </React.Fragment>
      )}

      <PaginationItem active={true} href={`/?p=${props.pageInfo.currentPage}`}>
        {props.pageInfo.currentPage}
      </PaginationItem>

      {hasNext() && (
        <React.Fragment>
          <PaginationItem href={`/?p=${props.pageInfo.currentPage + 1}`}>
            {props.pageInfo.currentPage + 1}
          </PaginationItem>
          <PaginationItem href={`/?p=${props.pageInfo.currentPage + 1}`}>
            &gt;
          </PaginationItem>
          <PaginationItem href={`/?p=${props.pageInfo.total}`}>
            &gt;&gt;
          </PaginationItem>
        </React.Fragment>
      )}
    </PaginationContainer>
  )
}

export default Pagination
