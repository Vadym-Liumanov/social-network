import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import { followToggleAC, setCurrentPageAC, isFollowingToggleAC, getUsersThunk } from '../../redux/users-reducer'

import Users from './Users'
import Preloader from '../common/Preloader/Preloader'


class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.usersOnPageCount)
  }

  onPageNumberClick = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    this.props.getUsersThunk(pageNumber, this.props.usersOnPageCount)
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

// const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(UsersContainer))

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(UsersContainer)