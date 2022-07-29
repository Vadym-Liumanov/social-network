import axios from 'axios'

const instanceParameters = {
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { "API-KEY": "185399ed-5bf1-4614-a945-6c901c6ff6b3" },
}

const instanceAxios = axios.create(
  { ...instanceParameters }
)

export const usersAPI = {
  getUsers(currentPage, usersOnPageCount) {
    return instanceAxios.get(`users?page=${currentPage}&count=${usersOnPageCount}`).then(response => response.data)
  },
  setUserFollow(userId) {
    return instanceAxios.post(`follow/${userId}`).then(response => response.data)
  },

  setUserUnfollow(userId) {
    return instanceAxios.delete(`follow/${userId}`).then(response => response.data)
  }
}

export const profileAPI = {
  getUserProfile(userId) {
    return instanceAxios.get(`profile/${userId}`).then(response => response.data)
  },

  getUserStatus(userId) {
    return instanceAxios.get(`profile/status/${userId}`).then(response => response.data)
  },

  getMyStatus(myId) {
    return instanceAxios.get(`profile/status/${myId}`).then(response => response.data)
  },

  putMyStatus(myStatus) {
    return instanceAxios.put('profile/status/', { status: myStatus }).then(response => response.data)
  },

  savePhoto(file) {
    const formData = new FormData()
    formData.append('image', file)
    return instanceAxios.put('profile/photo/', formData, { headers: { 'Content-type': 'multipart/form-data' } })
      .then(response => response.data)
  }
}

export const authAPI = {
  getAuthData() {
    return instanceAxios.get('auth/me').then(response => response.data)
  },
  loginOnTheService(email, password, rememberMe = false) {
    return instanceAxios.post('auth/login', { email, password, rememberMe }).then(response => response.data)
  },
  logoutFromTheService() {
    return instanceAxios.delete('auth/login').then(response => response.data)
  }
}
