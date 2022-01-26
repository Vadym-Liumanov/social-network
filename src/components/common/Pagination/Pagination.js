import React, { useState } from 'react'

import styles from './Pagination.module.css'

const Pagination = ({ totalCount, pageSize, currentPage, onPageNumberClick }) => {
  const pageNumbersArr = []
  const pagesCount = Math.ceil(totalCount / pageSize / 100)
  for (let i = 1; i <= pagesCount; i++) {
    pageNumbersArr.push(i)
  }
  const portionSize = 10
  const portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(1)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionNumber = portionNumber * portionSize

  return (
    <div>
      <div>totalCount: {totalCount}</div>
      <div>currentPage: {currentPage}</div>
      <div>

        {(portionNumber > 1) && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

        {pageNumbersArr.map((page) => {
          return (
            <span
              key={page}
              className={currentPage === page ? styles.activePage : styles.pages}
              onClick={(e) => { onPageNumberClick(page) }}>
              {page}
            </span>
          )
        })}

        {(portionNumber < portionCount) && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}

      </div>
    </div>

  )
}

export default Pagination