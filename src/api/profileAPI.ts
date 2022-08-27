import { instanceAxios } from './api'
import { ProfileType, PhotosType, MainResponseType } from '../types/types'

export type UpdateProfileResponseType = {
  resultCode: number
  messages: Array<string>
  data: {}
  fieldsErrors: []
}

export const profileAPI = {
  getUserProfile(userId: number | null) {
    return instanceAxios.get<ProfileType>(`profile/${userId}`).then(response => response.data);
  },

  getUserStatus(userId: number) {
    return instanceAxios.get<string | null>(`profile/status/${userId}`).then(response => response.data);
  },

  getMyStatus(myId: number) {
    return instanceAxios.get<string | null>(`profile/status/${myId}`).then(response => response.data);
  },

  putMyStatus(myStatus: string) {
    return instanceAxios.put<MainResponseType<{}>>('profile/status/', { status: myStatus }).then(response => response.data);
  },

  savePhoto(file: any) {
    const formData = new FormData();
    formData.append('image', file);
    return instanceAxios.put<MainResponseType<{ photos: PhotosType }>>('profile/photo/', formData, { headers: { 'Content-type': 'multipart/form-data' } })
      .then(response => response.data);
  },

  updateProfile(profileData: ProfileType) {
    return instanceAxios.put<MainResponseType<{}>>('profile/', profileData)
      .then(response => response.data);
  }
}
