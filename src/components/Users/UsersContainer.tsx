import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

// import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import { followToggleAC, setCurrentPageAC, isFollowingToggleAC, getUsersThunk } from '../../redux/users-reducer'

import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { UserInfoType } from '../../types/types'
import { AppStateType } from '../../redux/store-redux'

/*Для типизации законнекченой компоненты UsersContainer разделим пропсы - и их типы - на 3 части
1. MapStatePropsType
2. MapDispatchPropsType
3. OwnPropsType - для props не из connect, а для переданных из родителя */

type MapStatePropsType = {
  currentPage: number
  usersOnPageCount: number
  isFetching: boolean
  usersList: Array<UserInfoType>
  totalCount: number
  isFollowingInProgress: Array<number>
}
type MapDispatchPropsType = {
  followToggle: (userId: number) => void
  isFollowingToggle: (followingUserId: number) => void
  getUsersThunk: (currentPage: number, usersOnPageCount: number) => void
  setCurrentPage: (pageNumber: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.usersOnPageCount)
  }

  //function is use for selecting current page number in Pagination.tsx
  onPageNumberClick = (pageNumber: number) => {
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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    usersList: state.users.usersList,
    totalCount: state.users.totalCount,
    usersOnPageCount: state.users.usersOnPageCount,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching,
    isFollowingInProgress: state.users.isFollowingInProgress,
  }
}
let mapDispatchToProps = (dispatch: any): MapDispatchPropsType  => {
  return {
    followToggle: (userId: number) => dispatch(followToggleAC(userId)),
    setCurrentPage: (currentPage: number) => dispatch(setCurrentPageAC(currentPage)),
    isFollowingToggle: (followingUserId: number) => dispatch(isFollowingToggleAC(followingUserId)),
    getUsersThunk: (currentPage: number, usersOnPageCount: number) => dispatch(getUsersThunk(currentPage, usersOnPageCount))
  }
}

// const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(UsersContainer))

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps),
  // withAuthRedirect
)(UsersContainer)