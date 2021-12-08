import React from 'react'
import * as axios from 'axios'

import User from './User/User'

import usersStyles from './Users.module.css'

class Users extends React.Component {
  constructor(props) {
    super(props)
      if (this.props.usersList.length === 0) {
        // alert('New class component was created!')
        const apiUrl = 'https://social-network.samuraijs.com/api/1.0/users'
        axios.get(apiUrl).then((response) => { this.props.setUsers(response.data.items) })
      }
  }

  render() {

    let usersListItems = this.props.usersList.map(user => <User key={user.id} userInfo={user} followToggle={this.props.followToggle} />)

    return (
      <div className={usersStyles.content}>
        {usersListItems}
      </div>
    )
  }
}

export default Users