import React from 'react'

import styles from './Pagination.module.css'

const Pagination = (props) => {
  const pageNumbersArr = []
  const totalCount = Math.ceil(props.totalCount / 100)   //dlya uprosseniya vozmem v 100 raz menshe
  const pagesCount = Math.ceil(totalCount / props.usersOnPageCount)
  for (let i = 1; i <= pagesCount; i++) {
    pageNumbersArr.push(i)
  }

  return (
    <div>
      <div>totalCount: {totalCount * 100}</div>
      <div>currentPage: {props.currentPage}</div>
      <div>
        {pageNumbersArr.map((page) => {
          return (
            <span
              key={page}
              className={props.currentPage === page ? styles.activePage : styles.pages}
              onClick={(e) => { props.onPageNumberClick(page) }}>
              {page}
            </span>
          )
        })}
      </div>
    </div>

  )
}

export default Pagination