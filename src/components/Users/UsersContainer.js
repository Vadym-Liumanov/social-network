import React from 'react'
import { connect } from 'react-redux'

import { followToggleAC, setUsersAC, setTotalCountAC, setCurrentPageAC, toggleIsFetchingAC } from '../../redux/users-reducer'

import { getUsers } from '../../api/api'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'

class UsersApiReqContainer extends React.Component {

  setUsersPage = (currentPage, usersOnPageCount) => {
    this.props.toggleIsFetching(true)
    getUsers(currentPage, usersOnPageCount).then((data) => {
      this.props.setUsers(data.items)
      this.props.setTotalCount(data.totalCount)
      this.props.toggleIsFetching(false)
    })
  }

  componentDidMount() {
    this.setUsersPage(this.props.currentPage, this.props.usersOnPageCount)
  }

  onPageNumberClick = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    this.setUsersPage(pageNumber, this.props.usersOnPageCount)
  }

  render() {
    return (
      <>
        {this.props.isFetching
          ? <Preloader />
          : <Users
            usersList={this.props.usersList}
            followToggle={this.props.followToggle}
            totalCount={this.props.totalCount}
            usersOnPageCount={this.props.usersOnPageCount}
            currentPage={this.props.currentPage}
            onPageNumberClick={this.onPageNumberClick}
            isFetching={this.props.isFetching}
          />
        }
      </>

    )

  }
}

let mapStateToProps = (state) => {
  return {
    usersList: state.users.usersList,
    totalCount: state.users.totalCount,
    usersOnPageCount: state.users.usersOnPageCount,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    followToggle: (userId) => dispatch(followToggleAC(userId)),
    setUsers: (usersList) => dispatch(setUsersAC(usersList)),
    setTotalCount: (totalCount) => dispatch(setTotalCountAC(totalCount)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
    toggleIsFetching: (isFetching) => dispatch(toggleIsFetchingAC(isFetching))
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersApiReqContainer)

export default UsersContainer