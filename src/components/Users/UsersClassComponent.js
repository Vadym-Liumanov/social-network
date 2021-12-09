import React from 'react'
import * as axios from 'axios'

import User from './User/User'

import usersStyles from './Users.module.css'

class Users extends React.Component {

  componentDidMount() {
      debugger
      let apiUrl = `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.usersOnPageCount}`
      axios.get(apiUrl).then((response) => {
        this.props.setUsers(response.data.items)
        this.props.setTotalCount(response.data.totalCount)
      })
  }

  onPageNumberClick = (page) => {
    this.props.setCurrentPage(page)
  }

  render() {
    let usersListItems = this.props.usersList.map(user => <User key={user.id} userInfo={user} followToggle={this.props.followToggle} />)

    let pageNumbersArr = []
    const totalCount = Math.ceil(this.props.totalCount / 100)   //dlya uprosseniya vozmem v 100 raz menshe
    let pagesCount = Math.ceil(totalCount / this.props.usersOnPageCount)
    for (let i = 1; i <= pagesCount; i++) {
      pageNumbersArr.push(i)
    }

    return (
      <div>
        <div>totalCount: {totalCount}</div>
        <div>currentPage: {this.props.currentPage}</div>
        <div>
          {pageNumbersArr.map((page) => {
            return (
              <span key={page} className={usersStyles.activePage} onClick={(e) => { this.onPageNumberClick(page) }}>
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
}

export default Users