import { instanceAxios } from './api'
import { UserInfoType, MainResponseType } from '../types/types'

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
  getUsers(currentPage: number, usersOnPageCount: number) {
    return instanceAxios.get<GetItemsResponseType<UserInfoType>>(`users?page=${currentPage}&count=${usersOnPageCount}`).then(response => response.data);
  },
  setUserFollow(userId: number | null) {
    return instanceAxios.post<MainResponseType<{}>>(`follow/${userId}`).then(response => response.data);
  },

  setUserUnfollow(userId: number | null) {
    return instanceAxios.delete<MainResponseType<{}>>(`follow/${userId}`).then(response => response.data);
  }
}
