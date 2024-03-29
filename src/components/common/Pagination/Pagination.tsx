import React, { useState } from 'react'
import cn from 'classnames'

import styles from './Pagination.module.css'

type PropsType = {
  totalCount: number,
  pageSize: number,
  currentPage: number,
  onPageNumberClick: (page: number) => void,
  portionSize?: number
}

const Pagination: React.FC<PropsType> = ({ totalCount, pageSize = 5, currentPage, onPageNumberClick, portionSize = 10 }) => {
  const pageNumbersArr: Array<number> = []
  const pagesCount = Math.ceil(totalCount / pageSize)
  // const pagesCount = Math.ceil(128 / pageSize)
  for (let i = 1; i <= pagesCount; i++) {
    pageNumbersArr.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  let startPortionNumber = Math.ceil(currentPage / portionSize)
  let [portionNumber, setPortionNumber] = useState(startPortionNumber)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionNumber = portionNumber * portionSize

  return (
    <div className={styles.wrapper}>

      {/* <div className={styles.secondaryBlock}>
        <div>totalCount: {totalCount}</div>
        <div>currentPage: {currentPage}</div>
      </div> */}

      <div className={styles.paginationBody}>

        {/* {(portionNumber > 1) && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>} */}

        <button
          className={cn(styles.prevBtn, styles.btn, (portionNumber === 1) ? styles.prevBtn_disabled : styles.prevBtn_normal)}
          onClick={() => { setPortionNumber(portionNumber - 1) }}
          disabled={portionNumber === 1}
        >
          PREV
        </button>

        {pageNumbersArr
          .filter((page) => {
            return (page >= leftPortionPageNumber) && (page <= rightPortionNumber)
          })
          .map((page) => {
            return (
              <span
                key={page}
                className={currentPage === page ? styles.activePage : styles.pages}
                onClick={(e) => { (currentPage !== page) && onPageNumberClick(page) }}
              >
                {page}
              </span>
            )
          })}

        {/* {(portionNumber < portionCount) && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>} */}

        <button
          className={cn(styles.nextBtn, styles.btn, (portionNumber === portionCount) ? styles.nextBtn_disabled : styles.nextBtn_normal)}

          onClick={() => { setPortionNumber(portionNumber + 1) }}
          disabled={portionNumber === portionCount}
        >
          NEXT
        </button>

      </div>
    </div>

  )
}

export default React.memo(Pagination)