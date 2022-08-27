import axios from 'axios'

const instanceParameters = {
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { "API-KEY": "185399ed-5bf1-4614-a945-6c901c6ff6b3" },
}

export const instanceAxios = axios.create(
  { ...instanceParameters }
)