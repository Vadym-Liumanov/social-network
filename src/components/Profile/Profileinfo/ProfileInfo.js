import React from 'react'

import styles from './ProfileInfo.module.css'
import userImage from '../../../assets/images/userImage.jpg'
// import ProfileStatus from './ProfileStatus'
import ProfileStatus from './ProfileStatusWithHooks'


const ProfileInfo = ({ fullName, photos, isOwner, userStatus, myStatus, updateMyStatus, aboutMe,
  contacts, lookingForAJob, lookingForAJobDescription, savePhoto }) => {

  const notSpecified = 'Not specified'

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
              <input type="file" onChange={onFileSelect} className={styles.inputFile} />
            </div>
          )}
        </div>
        <div className={styles.fullName}><span>{fullName}</span></div>
        <div className={styles.status}>
          <div className={styles.status__title}>Status:</div>
          <div className={styles.status__text}>
            {!isOwner && (<>{userStatus || 'User have no status!'}</>)}
            {isOwner && (<ProfileStatus status={myStatus} updateMyStatus={updateMyStatus} />)}
          </div>
        </div>
      </section>
      <section className={styles.aboutMe}>
        <div>
          <div className={styles.aboutMe__title}>About me</div>
          <div>
            {aboutMe || notSpecified}
          </div>
          <div>
            {/* { contacts || notSpecified} */}
          </div>
          <div>
            lookingForAJob: {lookingForAJob || notSpecified}
          </div>
          <div>
            lookingForAJobDescription:{lookingForAJobDescription || notSpecified}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileInfo
