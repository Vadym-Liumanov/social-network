import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { followToggleAC, setCurrentPageAC, isFollowingToggleAC, getUsersThunk } from '../../redux/users-reducer'

import Users from './Users'
import Preloader from '../common/Preloader/Preloader'

class UsersApiReqContainer extends React.Component {

  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.usersOnPageCount)
  }

  onPageNumberClick = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    this.props.getUsersThunk(pageNumber, this.props.usersOnPageCount)
  }

  render() {
    if (!this.props.isAuth) {
      return <Redirect to="/login" />
    }

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
            isFollowingInProgress={this.props.isFollowingInProgress}
            isFollowingToggle={this.props.isFollowingToggle}
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
    isFetching: state.users.isFetching,
    isFollowingInProgress: state.users.isFollowingInProgress,
    isAuth: state.auth.isAuth
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    followToggle: (userId) => dispatch(followToggleAC(userId)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
    isFollowingToggle: (isFollowing) => dispatch(isFollowingToggleAC(isFollowing)),
    getUsersThunk: (currentPage, usersOnPageCount) => dispatch(getUsersThunk(currentPage, usersOnPageCount))
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersApiReqContainer)

export default UsersContainer