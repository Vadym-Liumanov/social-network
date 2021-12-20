import React from 'react'
import { NavLink } from 'react-router-dom'

import { setUserFollow, setUserUnfollow } from '../../../api/api'

import userStyles from './User.module.css'

import userImage from '../../../assets/images/userImage.jpg'

const User = (props) => {
  // debugger
  const onFollowButtonClick = () => {
    props.isFollowingToggle(true)

    if (props.userInfo.followed) {
      setUserUnfollow(props.userInfo.id).then((data) => {
        if (data.resultCode === 0) {
          props.followToggle(props.userInfo.id)
        }
        props.isFollowingToggle(false)
      })

    } else {
      setUserFollow(props.userInfo.id).then((data) => {
        if (data.resultCode === 0) {
          props.followToggle(props.userInfo.id)
        }
        props.isFollowingToggle(false)
      })
    }

  }

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
          <button onClick={onFollowButtonClick} disabled={props.isFollowingInProgress}>
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