import React from 'react'

import User from './User/User'

import usersStyles from './Users.module.css'

const Users = (props) => {

  let usersListItems = props.usersList.map(user => <User key={user.id} userInfo={user} />)

  return (
    <div className={usersStyles.content}>
      {usersListItems}
    </div>
  )
}

export default Users