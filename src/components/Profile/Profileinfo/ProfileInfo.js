import React from 'react'

import styles from './ProfileInfo.module.css'
import userImage from '../../../assets/images/userImage.jpg'


const ProfileInfo = (props) => {
  // debugger

  return (
    <div className={styles.info}>
      <div>
        <img src={props.photos.small ? props.photos.small : userImage} alt="userAvatar" />
      </div>
      <div>{props.fullName}</div>
      <div>Status:</div>
      <div className={styles.status}>
        {props.userStatus || 'User have no status!'}
      </div>
      <div>About me</div>
      <div>
        {props.aboutMe}
      </div>
    </div>
  )
}

export default ProfileInfo
