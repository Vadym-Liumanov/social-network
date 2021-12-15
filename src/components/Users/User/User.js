import React from 'react'
import { NavLink } from 'react-router-dom'

import userStyles from './User.module.css'

import userImage from '../../../assets/images/userImage.jpg'

const User = (props) => {

  const onFollowButtonClick = () => props.followToggle(props.userInfo.id)

  let followButtonText = (props.userInfo.followed) ? 'UnFollow' : 'Follow'

  // let userProfileUrl = `profile/${props.userInfo.id}`
  let userProfileUrl = `/profile/${props.userInfo.id}`

  return (
    <div className={userStyles.userCard}>
      <div>
        <div>
          <NavLink to={userProfileUrl}>
            <img src={props.userInfo.photos.small ? props.userInfo.photos.small : userImage} alt="avatar" />
          </NavLink>
        </div>
        <div>
          <button onClick={onFollowButtonClick}>
            {followButtonText}
          </button>
        </div>
      </div>

      <div>
        <div>
          {props.userInfo.name}
        </div>
        <div>
          {props.userInfo.status}
        </div>
      </div>
      <div>
        {'props.userInfo.location.city'}, {'props.userInfo.location.country'}
      </div>
    </div>
  )
}

export default User