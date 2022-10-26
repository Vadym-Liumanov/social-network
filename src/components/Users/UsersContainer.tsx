import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getCurrentPage, getIsFetching, getIsFollowingInProgress,
  getTotalCount, getUsers, getUsersFilter, getUsersOnPageCount
} from '../../redux/users-selectors'

import { actionCreators, requestUsersThunk, UsersFilterType } from '../../redux/users-reducer'

import Users from './Users'
import Preloader from '../common/Preloader/Preloader'

// componentDidMount() {
//     this.props.requestUsersThunk(this.props.currentPage, this.props.usersOnPageCount, this.props.usersFilter)
//   }

const UsersContainer: React.FC = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   requestUsers(currentPage, usersOnPageCount, usersFilter)
  // })

  const usersList = useSelector(getUsers)
  const totalCount = useSelector(getTotalCount)
  const usersOnPageCount = useSelector(getUsersOnPageCount)
  const currentPage = useSelector(getCurrentPage)
  const isFetching = useSelector(getIsFetching)
  const isFollowingInProgress = useSelector(getIsFollowingInProgress)
  const usersFilter = useSelector(getUsersFilter)

  const setUsersFilter = (usersFilter: UsersFilterType) => dispatch(actionCreators.setUsersFilterAC(usersFilter))
  const followToggle = (userId: number | null) => dispatch(actionCreators.followToggleAC(userId))
  const setCurrentPage = (currentPage: number) => dispatch(actionCreators.setCurrentPageAC(currentPage))
  const isFollowingToggle = (followingUserId: number | null) => dispatch(actionCreators.isFollowingToggleAC(followingUserId))
  const requestUsers = (currentPage: number, usersOnPageCount: number, usersFilter: UsersFilterType) => dispatch(requestUsersThunk(currentPage, usersOnPageCount, usersFilter))

  //function is use for selecting current page number in Pagination.tsx
  const onPageNumberClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    requestUsers(pageNumber, usersOnPageCount, usersFilter)
  }
  const onChangeUsersFilter = (usersFilter: UsersFilterType) => {
    setCurrentPage(1)
    setUsersFilter(usersFilter)
    requestUsers(currentPage, usersOnPageCount, usersFilter)
  }

  return (
    <>
      {isFetching
        ? <Preloader />
        : <Users
          onChangeUsersFilter={onChangeUsersFilter}
          usersFilter={usersFilter}
          requestUsers={requestUsers}
          usersList={usersList}
          followToggle={followToggle}
          totalCount={totalCount}
          usersOnPageCount={usersOnPageCount}
          currentPage={currentPage}
          onPageNumberClick={onPageNumberClick}
          isFetching={isFetching}
          isFollowingInProgress={isFollowingInProgress}
          isFollowingToggle={isFollowingToggle}
        />
      }
    </>
  )
}


export default UsersContainer