import React from 'react'

import userInfoStyles from './UserInfo.module.css'
import userImage from '../../../assets/images/userImage.jpg'


const UserInfo = (props) => {
  // debugger

  return (
    <div className={userInfoStyles.info}>
      <div>
        <img src={props.photos.small ? props.photos.small : userImage} alt="userAvatar" />
      </div>
      <div>{props.fullName}</div>
      <div>Status:</div>
      <div className={userInfoStyles.status}>
        {props.userStatus || 'User have no status!'}
      </div>
      <div>About me</div>
      <div>
        {props.aboutMe}
      </div>
    </div>
  )
}

export default UserInfo
