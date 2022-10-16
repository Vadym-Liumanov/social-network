import React from 'react'

import User from './User/User'
import { UserInfoType } from '../../types/types'
import usersStyles from './Users.module.css'
import Pagination from '../common/Pagination/Pagination'
import UsersSearchForm from './UsersSearchForm/UsersSearchForm'
import { UsersFilterType } from '../../redux/users-reducer'

type PropsType = {
  //Массив объектов user
  usersList: Array<UserInfoType>
  // ф-ция переключает для userId follow/unfollow
  followToggle: (userId: number | null) => void
  //общее кол-во всех пользователей
  totalCount: number
  //сколько пользователей выводить на странице
  usersOnPageCount: number
  // номер текущей страницы пользователей
  currentPage: number
  // ф-ция выбора ативной страницы в пагинаторе
  onPageNumberClick: (pageNumber: number) => void
  // флаг загрузки данных - отобразит preloader (true) или данные загруженные (false)
  isFetching: boolean
  /* массив из id юзеров, которые отображены на текущей странице и находятся в процессе операции
  follow/unfollow (асинхронного запроса к серверу). Массив позволяет при рендере страницы юзеров
  поюзерно блокировать кнопку дружбы на время разрешения запроса (проблематика - чтобы можно было 
  фолловить очередного юзера, пока процесс фоллоу для предыдущего в процессе) */
  isFollowingInProgress: Array<number | null>
  //ф-ция переключения для юзера с id статуса following на противоположный
  isFollowingToggle: (followingUserId: number | null) => void
  // объект фильтра для отображения users. Передается в UsersSearchForm
  usersFilter: UsersFilterType
  // callBack диспатчит Thunk для обновления списка users по фильтру usersFilter. Передается в UsersSearchForm
  getUsersThunk: (currentPage: number, usersOnPageCount: number, usersFilter: UsersFilterType) => void
  // callBack диспатчит AC для обновления фильтра usersFilter через компоненту формы UsersSearchForm.
  // После диспатчит с обновленным фильтром getUsersThunk для обновления UsersList
  onChangeUsersFilter: (usersFilter: UsersFilterType) => void
}

const Users: React.FC<PropsType> = (props) => {
  const usersListItems = props.usersList.map(user => <User
    key={user.id}
    userInfo={user}
    followToggle={props.followToggle}
    isFollowingInProgress={props.isFollowingInProgress}
    isFollowingToggle={props.isFollowingToggle}
  />)

  return (
    <div>
      <div>
        <UsersSearchForm
          usersFilter={props.usersFilter}
          onChangeUsersFilter={props.onChangeUsersFilter}
        />
      </div>
      <Pagination totalCount={props.totalCount}
        pageSize={props.usersOnPageCount}
        currentPage={props.currentPage}
        onPageNumberClick={props.onPageNumberClick}
      />
      <div className={usersStyles.content}>
        {usersListItems}
      </div>
    </div>
  )
}

export default React.memo(Users)