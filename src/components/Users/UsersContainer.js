import React from 'react'
import { connect } from 'react-redux'
import * as axios from 'axios'

import { followToggleAC, setUsersAC, setTotalCountAC, setCurrentPageAC } from '../../redux/users-reducer'

import Users from './Users'

class UsersApiReqContainer extends React.Component {

  componentDidMount() {
    let apiUrl = `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.usersOnPageCount}`
    axios.get(apiUrl).then((response) => {
      this.props.setUsers(response.data.items)
      this.props.setTotalCount(response.data.totalCount)
    })
  }

  onPageNumberClick = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    let apiUrl = `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersOnPageCount}`
    axios.get(apiUrl).then((response) => {
      this.props.setUsers(response.data.items)
      this.props.setTotalCount(response.data.totalCount)
    })
  }

  render() {
    return <Users
      usersList={this.props.usersList}
      followToggle={this.props.followToggle}
      totalCount={this.props.totalCount}
      usersOnPageCount={this.props.usersOnPageCount}
      currentPage={this.props.currentPage}
      onPageNumberClick={this.onPageNumberClick}
    />
  }
}

let mapStateToProps = (state) => {
  return {
    usersList: state.users.usersList,
    totalCount: state.users.totalCount,
    usersOnPageCount: state.users.usersOnPageCount,
    currentPage: state.users.currentPage
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    followToggle: (userId) => dispatch(followToggleAC(userId)),
    setUsers: (usersList) => dispatch(setUsersAC(usersList)),
    setTotalCount: (totalCount) => dispatch(setTotalCountAC(totalCount)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage))
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersApiReqContainer)

export default UsersContainer