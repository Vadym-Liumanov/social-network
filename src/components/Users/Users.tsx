import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'querystring'

import {
  getCurrentPage, getIsFetching, getIsFollowingInProgress,
  getTotalCount, getUsers, getUsersFilter, getUsersOnPageCount
} from '../../redux/users-selectors'

import { actionCreators, requestUsersThunk, UsersFilterType } from '../../redux/users-reducer'

import Preloader from '../common/Preloader/Preloader'
import User from './User/User'
import usersStyles from './Users.module.css'
import Pagination from '../common/Pagination/Pagination'
import UsersSearchForm from './UsersSearchForm/UsersSearchForm'

const Users: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

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

  type QueryParamsType = {
    term?: string
    friend?: string
    page?: string
  }

  useEffect(() => {
    /*
    const paramsObj = new URLSearchParams(location.search)
    console.log(paramsObj)
    */
    const parsedQuery: QueryParamsType = queryString.parse(location.search.substring(1))
    let actualPage = currentPage
    let actualFilter = { ...usersFilter }
    if (!!parsedQuery.page) { actualPage = Number(parsedQuery.page) }
    if (!!parsedQuery.term) { actualFilter.term = parsedQuery.term }
    if (!!parsedQuery.friend) {
      let actualFriend = null
      switch (parsedQuery.friend) {
        case 'true':
          actualFriend = true
          break
        case 'false':
          actualFriend = false
          break
      }
      actualFilter.friend = actualFriend
    }
/*
    if (!!paramsObj.page) { actualPage = Number(paramsObj.page) }
    if (!!paramsObj.term) { actualFilter.term = paramsObj.term }
    if (!!paramsObj.friend) {
      switch (paramsObj.friend) {
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
*/

    // console.log(location.search)
    // console.log(parsedQuery)
    // console.log(actualPage, actualFilter)
    setCurrentPage(actualPage)
    requestUsers(actualPage, usersOnPageCount, actualFilter)
  }, [])

  useEffect(() => {
    /*
    let paramsObj = new URLSearchParams() as QueryParamsType
    */ 
    let parsedQuery = {} as QueryParamsType
    if (!!usersFilter.term) { parsedQuery.term = usersFilter.term }
//  if (!!usersFilter.term) { paramsObj.set('term', usersFilter.term) }  
    if (usersFilter.friend !== null) {
      parsedQuery.friend = String(usersFilter.friend)
//  paramsObj.set('friend', String(usersFilter.friend))
    }
    if (currentPage !== 1) { 
      parsedQuery.page = String(currentPage)
//  paramsObj.set('page', String(currentPage))
    }

    history.push({
      pathname: '/users',
      search: '?' + queryString.stringify(parsedQuery)
//    search: '?' + paramsObj.toString()
    })
  }, [usersFilter, currentPage])

  return (
    <div>
      {isFetching
        ? <Preloader />
        :
        <div>
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
          <div className={usersStyles.content}>
            {usersListItems}
          </div>
        </div>}
    </div>
  )
}

export default React.memo(Users)
