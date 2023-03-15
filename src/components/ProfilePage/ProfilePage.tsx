import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'

import {
  setUserProfileThunk, setUserStatusThunk, setMyStatusThunk,
  updateMyStatusThunk, savePhotoThunk, updateProfileThunk
} from '../../redux/profile-reducer'

import styles from './ProfilePage.module.css'

import ProfileInfo from './Profileinfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'
import Preloader from '../common/Preloader/Preloader'
import { ProfileType } from '../../types/types'
import { getMyStatus, getProfileInfo, getUserStatus, getIsFetching } from '../../redux/profile-selectors'
import { getAuthId, getIsAuth } from '../../redux/auth-selectors'

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch()

  const profileInfo = useSelector(getProfileInfo)
  const userStatus = useSelector(getUserStatus)
  const myStatus = useSelector(getMyStatus)
  const myId = useSelector(getAuthId)
  const isAuth = useSelector(getIsAuth)
  const isFetching = useSelector(getIsFetching)

  const setUserProfile = (id: number) => dispatch(setUserProfileThunk(id))
  const setUserStatus = (id: number) => dispatch(setUserStatusThunk(id))
  const setMyStatus = (myId: number) => dispatch(setMyStatusThunk(myId))
  const updateMyStatus = (myStatus: string) => dispatch(updateMyStatusThunk(myStatus))
  const savePhoto = (fileData: File) => dispatch(savePhotoThunk(fileData))
  const updateProfile = (profileData: ProfileType) => dispatch(updateProfileThunk(profileData))

  const { userId } = useParams<{ userId?: string }>()

  // const isOwner = (!userId && myId) || (Number(userId) === myId)
  let isOwner = false
  if (!userId && myId) { isOwner = true }
  if (Number(userId) === myId) { isOwner = true }

  // componentDidMount() {
  //   const paramsUserId = this.props.match.params.userId
  //   const userId = (paramsUserId) ? paramsUserId : this.props.myId

  //   this.props.setUserProfileThunk(userId as number)
  //   this.props.setUserStatusThunk(userId as number)
  //   this.props.setMyStatusThunk(this.props.myId as number)
  // }

  useEffect(
    () => {
      if (isAuth) {
        const actualUserId = (userId) ? userId : myId
        setUserProfile(actualUserId as number)
        setUserStatus(actualUserId as number)
        setMyStatus(myId as number)
      }

      // eslint-disable-next-line
    }, [isAuth]
  )

  return (
    <>
      {!isAuth
        ? <Navigate replace to='/login' />
        :
        <div className={styles.profilePage}>

          <div className={styles.profilePage__item}>
            {profileInfo
              ? <ProfileInfo
                isOwner={isOwner}
                profileDetails={profileInfo}
                userStatus={userStatus}
                myStatus={myStatus}
                updateMyStatus={updateMyStatus}
                savePhoto={savePhoto}
                updateProfile={updateProfile}
                isFetching={isFetching}
              />
              : <Preloader />}
          </div>

          {/* <div className={styles.profilePage__item}>
            {isOwner && <MyPosts />}
          </div> */}

        </div>
      }
    </>
  )
}

export default React.memo(ProfilePage)
