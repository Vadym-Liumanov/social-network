import axios from 'axios'

const instanceParameters = {
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { "API-KEY": "185399ed-5bf1-4614-a945-6c901c6ff6b3" },
}

const instanceAxiosGet = axios.create(
  { ...instanceParameters, method: 'get' }
)

const instanceAxiosPost = axios.create(
  { ...instanceParameters, method: 'post' }
)

const instanceAxiosDelete = axios.create(
  { ...instanceParameters, method: 'delete' }
)

export const getAuthData = () => {
  return instanceAxiosGet('auth/me').then(response => response.data)
}

export const getUsers = (currentPage, usersOnPageCount) => {
  return instanceAxiosGet(`users?page=${currentPage}&count=${usersOnPageCount}`).then(response => response.data)
}

export const setUserFollow = (userId) => {
  return instanceAxiosPost(`follow/${userId}`).then(response => response.data)
}

export const setUserUnfollow = (userId) => {
  return instanceAxiosDelete(`follow/${userId}`).then(response => response.data)
}