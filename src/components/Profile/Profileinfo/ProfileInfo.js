import React from 'react'

import styles from './ProfileInfo.module.css'
import userImage from '../../../assets/images/userImage.jpg'
import ProfileStatus from './ProfileStatus'


const ProfileInfo = (props) => {
  // debugger

  return (
    <div className={styles.info}>

      <div>
        <img src={props.photos.small ? props.photos.small : userImage} alt="userAvatar" />
      </div>

      <div>{props.fullName}</div>


      <div>

        <div>Status:</div>

        <div className={styles.status}>
          {!props.isOwner && (<>{props.userStatus || 'User have no status!'}</>)}
          {props.isOwner && (<ProfileStatus status={props.myStatus} updateMyStatus={props.updateMyStatus} />)}
        </div>

      </div>

      <div>
        <div>About me</div>
        <div>
          {props.aboutMe}
        </div>
      </div>

    </div>
  )
}

export default ProfileInfo
