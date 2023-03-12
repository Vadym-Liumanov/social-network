import React, { ChangeEvent } from 'react'
import cn from 'classnames'

import styles from './ProfileInfo.module.css'
import defaultUserImage from '../../../assets/images/defaultUserImage.jpg'
import ProfileStatus from './ProfileStatus/ProfileStatusWithHooks'
import ProfileSettings from './ProfileSettings/ProfileSettings'
import { ProfileType } from '../../../types/types'

type PropsType = {
  isOwner: boolean
  userStatus: string
  myStatus: string
  updateMyStatus: (myStatus: string) => void
  savePhoto: (file: File) => void
  updateProfile: (profileData: ProfileType) => any
  profileDetails: ProfileType
}

const ProfileInfo: React.FC<PropsType> = ({ isOwner, userStatus, myStatus, updateMyStatus, savePhoto, updateProfile, profileDetails }) => {
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
          <img src={profileDetails.photos.large ? profileDetails.photos.large : defaultUserImage} alt="userAvatar" className={styles.avatar} />
        </div>
        {/* {isOwner && (
              <div className={styles.inputFileContainer}>
                <input type="file" onChange={onFileSelect} className={styles.inputFile} accept="image/*" />
              </div>
            )} */}

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
          <ProfileSettings profileDetails={profileDetails} isOwner={isOwner} updateProfile={updateProfile} />
        </div>

    </div>
  )
}

export default ProfileInfo
