import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

// import { withAuthRedirect } from '../../hoc/withAuthRedirect'

import { actionCreators, requestUsersThunk, UsersFilterType } from '../../redux/users-reducer'

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
  isFollowingInProgress: Array<number | null>
  usersFilter: UsersFilterType
}
type MapDispatchPropsType = {
  followToggle: (userId: number | null) => void
  isFollowingToggle: (followingUserId: number | null) => void
  requestUsersThunk: (currentPage: number, usersOnPageCount: number, usersFilter: UsersFilterType) => void
  setCurrentPage: (pageNumber: number) => void
  setUsersFilter: (usersFilter: UsersFilterType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    this.props.requestUsersThunk(this.props.currentPage, this.props.usersOnPageCount, this.props.usersFilter)
  }

  //function is use for selecting current page number in Pagination.tsx
  onPageNumberClick = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber)
    this.props.requestUsersThunk(pageNumber, this.props.usersOnPageCount, this.props.usersFilter)
  }
  onChangeUsersFilter = (usersFilter: UsersFilterType) => {
    this.props.setCurrentPage(1)
    this.props.setUsersFilter(usersFilter)
    this.props.requestUsersThunk(this.props.currentPage, this.props.usersOnPageCount, this.props.usersFilter)
  }

  render() {
    return (
      <>
        {this.props.isFetching
          ? <Preloader />
          : <Users
            onChangeUsersFilter={this.onChangeUsersFilter}
            usersFilter={this.props.usersFilter}
            requestUsersThunk={this.props.requestUsersThunk}
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
    usersFilter: state.users.usersFilter
  }
}
let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    setUsersFilter: (usersFilter: UsersFilterType) => dispatch(actionCreators.setUsersFilterAC(usersFilter)),
    followToggle: (userId: number | null) => dispatch(actionCreators.followToggleAC(userId)),
    setCurrentPage: (currentPage: number) => dispatch(actionCreators.setCurrentPageAC(currentPage)),
    isFollowingToggle: (followingUserId: number | null) => dispatch(actionCreators.isFollowingToggleAC(followingUserId)),
    requestUsersThunk: (currentPage: number, usersOnPageCount: number, usersFilter: UsersFilterType) => dispatch(requestUsersThunk(currentPage, usersOnPageCount, usersFilter))
  }
}

// const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(UsersContainer))

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps),
  // withAuthRedirect
)(UsersContainer)