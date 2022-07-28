import React from 'react'

import styles from './ProfileInfo.module.css'
import userImage from '../../../assets/images/userImage.jpg'
// import ProfileStatus from './ProfileStatus'
import ProfileStatus from './ProfileStatusWithHooks'


const ProfileInfo = ({ fullName, ...props }) => {
  // debugger

  return (
    <div className={styles.container}>
      <section className={styles.avaNameStatus}>
        <div>
          <img src={props.photos.small ? props.photos.small : userImage} alt="userAvatar" className={styles.avatar} />
        </div>
        <div className={styles.fullName}><span>{fullName}</span></div>
        <div className={styles.status}>
          <div className={styles.status__title}>Status:</div>
          <div className={styles.status__text}>
            {!props.isOwner && (<>{props.userStatus || 'User have no status!'}</>)}
            {props.isOwner && (<ProfileStatus status={props.myStatus} updateMyStatus={props.updateMyStatus} />)}
          </div>
        </div>
      </section>
      <section className={styles.aboutMe}>
        <div>
          <div className={styles.aboutMe__title}>About me</div>
          <div>
            {props.aboutMe}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileInfo
