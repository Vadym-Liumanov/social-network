import React from 'react'

import styles from './ProfileInfo.module.css'
import userImage from '../../../assets/images/userImage.jpg'
// import ProfileStatus from './ProfileStatus'
import ProfileStatus from './ProfileStatus/ProfileStatusWithHooks'
import ProfileSettings from './ProfileSettings/ProfileSettings'

const ProfileInfo = ({ photos, isOwner, userStatus, myStatus, updateMyStatus, savePhoto, updateProfile, ...profileDetails }) => {

  const onFileSelect = (e) => {
    if (e.target.files.length) {
      const fileData = e.target.files[0]
      savePhoto(fileData)
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.avaNameStatus}>
        <div className={styles.avaContainer}>
          <div className={styles.imgContainer}>
            <img src={photos.large ? photos.large : userImage} alt="userAvatar" className={styles.avatar} />
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
        <ProfileSettings {...profileDetails} updateProfile={updateProfile} />
      </section>
    </div>
  )
}

export default ProfileInfo
