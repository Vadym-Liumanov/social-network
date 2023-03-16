import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  getCurrentPage, getIsFetching, getIsFollowingInProgress,
  getTotalCount, getUsers, getUsersFilter, getUsersOnPageCount
} from '../../redux/users-selectors'

import { actionCreators, requestUsersThunk, UsersFilterType } from '../../redux/users-reducer'

import Preloader from '../common/Preloader/Preloader'
import User from './User/User'
import styles from './Users.module.css'
import Pagination from '../common/Pagination/Pagination'
import UsersSearchForm from './UsersSearchForm/UsersSearchForm'

const Users: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

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
    requestUsers(1, usersOnPageCount, usersFilter)
  }

  const usersListItems = usersList.map(user => <User
    key={user.id}
    userInfo={user}
    followToggle={followToggle}
    isFollowingInProgress={isFollowingInProgress}
    isFollowingToggle={isFollowingToggle}
  />)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)

    let actualPage = currentPage
    let actualFilter = { ...usersFilter }

    if (queryParams.has('page')) { actualPage = Number(queryParams.get('page')) }
    if (queryParams.has('term')) { actualFilter.term = queryParams.get('term') as string }
    if (queryParams.has('friend')) {
      switch (queryParams.get('friend')) {
        case 'true':
          actualFilter.friend = true
          break
        case 'false':
          actualFilter.friend = false
          break
        default:
          actualFilter.friend = null
      }
    }

    setCurrentPage(actualPage)
    setUsersFilter(actualFilter)
    requestUsers(actualPage, usersOnPageCount, actualFilter)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    let queryParams = new URLSearchParams()
    if (!!usersFilter.term) { queryParams.set('term', usersFilter.term) }
    if (usersFilter.friend !== null) { queryParams.set('friend', String(usersFilter.friend)) }
    if (currentPage !== 1) { queryParams.set('page', String(currentPage)) }

    navigate({
      pathname: '/users',
      search: '?' + queryParams.toString()
    })
    // eslint-disable-next-line
  }, [usersFilter, currentPage])

  return (
    <>
      {isFetching
        ? <Preloader />
        :
        <div className={styles.wrapper}>
          <div>
            <UsersSearchForm
              usersFilter={usersFilter}
              onChangeUsersFilter={onChangeUsersFilter}
            />
          </div>
          <Pagination totalCount={totalCount}
            pageSize={usersOnPageCount}
            currentPage={currentPage}
            onPageNumberClick={onPageNumberClick}
          />
          <div className={styles.usersList}>
            {usersListItems}
          </div>
        </div>}
    </>
  )
}

export default React.memo(Users)
