import { instanceAxios } from './api'
import { UserInfoType, MainResponseType } from '../types/types'
import { UsersFilterType } from '../redux/users-reducer'

export type GetItemsResponseType<T> = {
  items: Array<T>
  totalCount: number
  error: string | null
}
export type SetMainResponseType<T> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: []
  data: T
}

export const usersAPI = {
  getUsers(currentPage: number, usersOnPageCount: number, usersFilter: UsersFilterType = { term: '', friend: null }) {
    let queryParameters: string = `users?page=${currentPage}&count=${usersOnPageCount}`
    if (usersFilter.term !== '') {queryParameters = queryParameters + `&term=${usersFilter.term}`}
    if (usersFilter.friend !== null) {queryParameters = queryParameters + `&friend=${usersFilter.friend}`}
    return instanceAxios.get<GetItemsResponseType<UserInfoType>>(queryParameters).then(response => response.data);
  },
  setUserFollow(userId: number | null) {
    return instanceAxios.post<MainResponseType>(`follow/${userId}`).then(response => response.data);
  },

  setUserUnfollow(userId: number | null) {
    return instanceAxios.delete<MainResponseType>(`follow/${userId}`).then(response => response.data);
  }
}
