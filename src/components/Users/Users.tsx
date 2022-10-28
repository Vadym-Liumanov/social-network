import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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

// type PropsType = {
//   //Массив объектов user
//   usersList: Array<UserInfoType>
//   // ф-ция переключает для userId follow/unfollow
//   followToggle: (userId: number | null) => void
//   //общее кол-во всех пользователей
//   totalCount: number
//   //сколько пользователей выводить на странице
//   usersOnPageCount: number
//   // номер текущей страницы пользователей
//   currentPage: number
//   // ф-ция выбора ативной страницы в пагинаторе
//   onPageNumberClick: (pageNumber: number) => void
//   // флаг загрузки данных - отобразит preloader (true) или данные загруженные (false)
//   isFetching: boolean
//   /* массив из id юзеров, которые отображены на текущей странице и находятся в процессе операции
//   follow/unfollow (асинхронного запроса к серверу). Массив позволяет при рендере страницы юзеров
//   поюзерно блокировать кнопку дружбы на время разрешения запроса (проблематика - чтобы можно было 
//   фолловить очередного юзера, пока процесс фоллоу для предыдущего в процессе) */
//   isFollowingInProgress: Array<number | null>
//   //ф-ция переключения для юзера с id статуса following на противоположный
//   isFollowingToggle: (followingUserId: number | null) => void
//   // объект фильтра для отображения users. Передается в UsersSearchForm
//   usersFilter: UsersFilterType
//   // callBack диспатчит Thunk для обновления списка users по фильтру usersFilter. Передается в UsersSearchForm
//   requestUsers: (currentPage: number, usersOnPageCount: number, usersFilter: UsersFilterType) => void
//   // callBack диспатчит AC для обновления фильтра usersFilter через компоненту формы UsersSearchForm.
//   // После диспатчит с обновленным фильтром requestUsersThunk для обновления UsersList
//   onChangeUsersFilter: (usersFilter: UsersFilterType) => void
// }

const Users: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    requestUsers(currentPage, usersOnPageCount, usersFilter)
  }, [])

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