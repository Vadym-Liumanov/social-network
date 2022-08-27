import React from 'react'
import { NavLink } from 'react-router-dom'

import { usersAPI } from "../../../api/usersAPI"

import userStyles from './User.module.css'

import userImage from '../../../assets/images/userImage.jpg'

const User = (props) => {
  // debugger

  const userId = props.userInfo.id
  const userProfileUrl = `/profile/${userId}`
  let followButtonText = (props.userInfo.followed) ? 'UnFollow' : 'Follow'

  const onFollowButtonClick = () => {
    props.isFollowingToggle(userId)

    if (props.userInfo.followed) {
      usersAPI.setUserUnfollow(props.userInfo.id).then((data) => {
        if (data.resultCode === 0) {
          props.followToggle(props.userInfo.id)
        }
        props.isFollowingToggle(userId)
      })

    } else {
      usersAPI.setUserFollow(props.userInfo.id).then((data) => {
        if (data.resultCode === 0) {
          props.followToggle(props.userInfo.id)
        }
        props.isFollowingToggle(userId)
      })
    }

  }

  return (
    <div className={userStyles.userCard}>
      <div>
        <div>
          <NavLink to={userProfileUrl}>
            <img src={props.userInfo.photos.small ? props.userInfo.photos.small : userImage} alt="avatar" />
          </NavLink>
        </div>
        <div>
          <button onClick={onFollowButtonClick} disabled={props.isFollowingInProgress.indexOf(userId) >= 0} >
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