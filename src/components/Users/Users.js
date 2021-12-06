import React from 'react'
import * as axios from 'axios'

import User from './User/User'

// import userImage from '../../assets/images/userImage.jpg'

import usersStyles from './Users.module.css'

const Users = (props) => {
  // debugger


  const getUsers = () => {
    if (props.usersList.length === 0) {
      // let usersList = [
      //   {
      //     id: 1,
      //     avatar: userImage,
      //     followed: true,
      //     fullName: 'Vadym',
      //     status: 'Don\'t worry! Be happy!',
      //     location: { city: 'Sever', country: 'Ukraine' }
      //   },
      //   {
      //     id: 2,
      //     avatar: userImage,
      //     followed: false,
      //     fullName: 'Alex',
      //     status: 'I love life!',
      //     location: { city: 'London', country: 'UK' }
      //   },
      //   {
      //     id: 3,
      //     avatar: userImage,
      //     followed: true,
      //     fullName: 'Ann',
      //     status: 'Relax!',
      //     location: { city: 'Moscow', country: 'Russia' }
      //   }
      // ]

      // props.setUsers(usersList)

      const apiUrl = 'https://social-network.samuraijs.com/api/1.0/users'
      axios.get(apiUrl).then((response) => { props.setUsers(response.data.items) })
    }
  }

  let usersListItems = props.usersList.map(user => <User key={user.id} userInfo={user} followToggle={props.followToggle} />)

  return (
    <div className={usersStyles.content}>
      <button onClick={getUsers}>Get users</button>
      {usersListItems}
    </div>
  )
}

export default Users