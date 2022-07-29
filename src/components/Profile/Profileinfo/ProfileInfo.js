import React from 'react'

import styles from './ProfileInfo.module.css'
import userImage from '../../../assets/images/userImage.jpg'
// import ProfileStatus from './ProfileStatus'
import ProfileStatus from './ProfileStatusWithHooks'


const ProfileInfo = ({ fullName, photos, isOwner, userStatus, myStatus, updateMyStatus, aboutMe,
  contacts, lookingForAJob, lookingForAJobDescription }) => {
  // debugger

  const notSpecified = 'Not specified'

  const onFileSelect = (e) => {
    const temp = e.target.files[0]
    console.log(temp)
  }

  return (
    <div className={styles.container}>
      <section className={styles.avaNameStatus}>
        <div className={styles.avaContainer}>
          <img src={photos.small ? photos.small : userImage} alt="userAvatar" className={styles.avatar} />
        </div>
        <div>
          <input type="file" onChange={onFileSelect} />
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
