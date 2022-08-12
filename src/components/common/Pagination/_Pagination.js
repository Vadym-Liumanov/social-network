import React, { useState } from 'react'

import styles from './Pagination.module.css'

const Pagination = ({ totalCount, pageSize = 4, currentPage, onPageNumberClick, portionSize = 10 }) => {
  const pageNumbersArr = []
  const pagesCount = Math.ceil(totalCount / pageSize)
  for (let i = 1; i <= pagesCount; i++) {
    pageNumbersArr.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  let startPortionNumber = Math.ceil(currentPage / portionSize)
  let [portionNumber, setPortionNumber] = useState(startPortionNumber)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionNumber = portionNumber * portionSize

  return (
    <div>
      <div>totalCount: {totalCount}</div>
      <div>currentPage: {currentPage}</div>
      <div>

        {(portionNumber > 1) && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

        {pageNumbersArr
          .filter((page) => {
            return (page >= leftPortionPageNumber) && (page <= rightPortionNumber)
          })
          .map((page) => {
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