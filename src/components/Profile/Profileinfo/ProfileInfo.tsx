import React, { ChangeEvent } from 'react'

import styles from './ProfileInfo.module.css'
import userImage from '../../../assets/images/userImage.jpg'
import ProfileStatus from './ProfileStatus/ProfileStatusWithHooks'
import ProfileSettings from './ProfileSettings/ProfileSettings'
import { ProfileType } from '../../../types/types'

type PropsType = {
  isOwner: boolean
  userStatus: string
  myStatus: string
  updateMyStatus: (myStatus: string) => void
  savePhoto: (file: File) => void
  updateProfile: (profileData: ProfileType) => Promise<any>
  profileDetails: ProfileType
}

const ProfileInfo: React.FC<PropsType> = ({ isOwner, userStatus, myStatus, updateMyStatus, savePhoto, updateProfile, profileDetails }) => {
  debugger
  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const fileData = e.target.files[0]
      savePhoto(fileData)
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.avaNameStatus}>
        <div className={styles.avaContainer}>
          <div className={styles.imgContainer}>
            <img src={profileDetails.photos.large ? profileDetails.photos.large : userImage} alt="userAvatar" className={styles.avatar} />
          </div>
          {isOwner && (
            <div className={styles.inputFileContainer}>
              <input type="file" onChange={onFileSelect} className={styles.inputFile} accept="image/*" />
            </div>
          )}
        </div>
        <div className={styles.fullName}><span>{profileDetails.fullName}</span></div>
        <div className={styles.status}>
          <div className={styles.status__title}>Status:</div>
          <div className={styles.status__text}>
            {!isOwner && (<>{userStatus || 'User have no status!'}</>)}
            {isOwner && (<ProfileStatus status={myStatus} updateMyStatus={updateMyStatus} />)}
          </div>
        </div>
      </section>
      <section className={styles.aboutMe}>
        <ProfileSettings profileDetails = {profileDetails} isOwner={isOwner} updateProfile={updateProfile} />
      </section>
    </div>
  )
}

export default ProfileInfo
