import axios from 'axios'

const instanceParameters = {
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { "API-KEY": "185399ed-5bf1-4614-a945-6c901c6ff6b3" },
}

const instanceAxios = axios.create(
  { ...instanceParameters }
)

export const getAuthData = () => {
  return instanceAxios.get('auth/me').then(response => response.data)
}

export const getUsers = (currentPage, usersOnPageCount) => {
  return instanceAxios.get(`users?page=${currentPage}&count=${usersOnPageCount}`).then(response => response.data)
}

export const setUserFollow = (userId) => {
  return instanceAxios.post(`follow/${userId}`).then(response => response.data)
}

export const setUserUnfollow = (userId) => {
  return instanceAxios.delete(`follow/${userId}`).then(response => response.data)
}

export const getUserProfile = (userId) => {
  return instanceAxios.get(`profile/${userId}`).then(response => response.data)
}