import React, { ChangeEvent, useState } from 'react'
import cn from 'classnames'

import styles from './ProfileInfo.module.css'
import defaultUserImage from '../../../assets/images/defaultUserImage.jpg'
import ProfileStatus from './ProfileStatus/ProfileStatusWithHooks'
import ProfileSettings from './ProfileSettings/ProfileSettings'
import { ProfileType } from '../../../types/types'

import addPhotoIcon from './../../../assets/icons/add_photo.svg'
import removePhotoIcon from './../../../assets/icons/trash.svg'

type PropsType = {
  isOwner: boolean
  userId: number | null
  userStatus: string
  myStatus: string
  updateMyStatus: (myStatus: string) => void
  savePhoto: (file: File) => void
  updateProfile: (profileData: ProfileType) => any
  profileDetails: ProfileType
  isFetching: boolean
}

const ProfileInfo: React.FC<PropsType> = ({ isOwner, userId, userStatus, myStatus, updateMyStatus, savePhoto, updateProfile, profileDetails, isFetching }) => {
  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const fileData = e.target.files[0]
      savePhoto(fileData)
    }
  }

  return (
    <div className={styles.profileInfoWrapper}>

      <div className={cn(styles.profileInfo__item, styles.mainInfo)}>
        <div className={styles.imgContainer}>
          <img src={profileDetails.photos.large ? profileDetails.photos.large : defaultUserImage}
            alt="userAvatar"
            className={styles.avatar}
          />

          {/* Всплывающий блок с кнопкой изменения автара */}
          {isOwner && (
            <div className={styles.edidAvatarBlock}>
              <div className={styles.inputFileContainer}>
                <label htmlFor="avatarFileInput">
                  <img src={addPhotoIcon} alt="" title='Select' className={styles.photoIcon} />
                </label>
                <input
                  type="file"
                  onChange={onFileSelect}
                  id="avatarFileInput"
                  className={styles.fileInput}
                  accept="image/*"
                />
              </div>
              {/* Эндпоинт удаления аватара не предусмотрен АПИ */}
              {/* <button>
                <img src={removePhotoIcon} alt="" title='Delete' className={styles.photoIcon} />
              </button> */}
            </div>
          )}

        </div>

        <div className={styles.fullName}>
          <h2>{profileDetails.fullName}</h2>
        </div>

        <div className={styles.status}>
          <div className={styles.status__title}>Status:</div>
          <div className={styles.status__text}>
            {!isOwner && (<>{userStatus || 'User have no status!'}</>)}
            {isOwner && (<ProfileStatus status={myStatus} updateMyStatus={updateMyStatus} />)}
          </div>
        </div>
      </div>


      <div className={cn(styles.profileInfo__item, styles.aboutMe)}>
        <ProfileSettings
          profileDetails={profileDetails}
          isOwner={isOwner}
          userId={userId}
          updateProfile={updateProfile}
          isFetching={isFetching}
        />
      </div>

    </div>
  )
}

export default React.memo(ProfileInfo)
