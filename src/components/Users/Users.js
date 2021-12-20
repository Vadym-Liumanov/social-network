import React from 'react'

import User from './User/User'
import usersStyles from './Users.module.css'

const Users = (props) => {
  let usersListItems = props.usersList.map(user => <User
    key={user.id}
    userInfo={user}
    followToggle={props.followToggle}
    isFollowingInProgress={props.isFollowingInProgress}
    isFollowingToggle={props.isFollowingToggle}
  />)
  let pageNumbersArr = []
  const totalCount = Math.ceil(props.totalCount / 100)   //dlya uprosseniya vozmem v 100 raz menshe
  let pagesCount = Math.ceil(totalCount / props.usersOnPageCount)
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
              className={props.currentPage === page ? usersStyles.activePage : usersStyles.pages}
              onClick={(e) => { props.onPageNumberClick(page) }}>
              {page}
            </span>
          )
        })}
      </div>
      <div className={usersStyles.content}>
        {usersListItems}
      </div>
    </div>
  )

}

export default Users