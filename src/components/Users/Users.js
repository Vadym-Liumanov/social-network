import React from 'react'

import User from './User/User'
import usersStyles from './Users.module.css'
import Pagination from '../common/Pagination/Pagination'

const Users = (props) => {
  const usersListItems = props.usersList.map(user => <User
    key={user.id}
    userInfo={user}
    followToggle={props.followToggle}
    isFollowingInProgress={props.isFollowingInProgress}
    isFollowingToggle={props.isFollowingToggle}
  />)

  return (
    <div>
      <Pagination totalCount={props.totalCount}
        pageSize={props.usersOnPageCount}
        currentPage={props.currentPage}
        onPageNumberClick={props.onPageNumberClick}
      />
      <div className={usersStyles.content}>
        {usersListItems}
      </div>
    </div>
  )

}

export default Users