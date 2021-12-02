import React from 'react'

import User from './User/User'

import usersStyles from './Users.module.css'

const Users = (props) => {
  // debugger

  if (props.usersList.length === 0) {
    let usersList = [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
        followed: true,
        fullName: 'Vadym',
        status: 'Don\'t worry! Be happy!',
        location: { city: 'Sever', country: 'Ukraine' }
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
        followed: false,
        fullName: 'Alex',
        status: 'I love life!',
        location: { city: 'London', country: 'UK' }
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
        followed: true,
        fullName: 'Ann',
        status: 'Relax!',
        location: { city: 'Moscow', country: 'Russia' }
      }
    ]
    props.setUsers(usersList)
  }

  let usersListItems = props.usersList.map(user => <User key={user.id} userInfo={user} followToggle={props.followToggle} />)

  return (
    <div className={usersStyles.content}>
      {usersListItems}
    </div>
  )
}

export default Users