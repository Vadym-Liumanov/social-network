import React from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import userStyles from './User.module.css'

import userImage from '../../../assets/images/userImage.jpg'

const User = (props) => {

  const apiUrl = `https://social-network.samuraijs.com/api/1.0/follow/${props.userInfo.id}`
  const axiosParameters = {
    withCredentials: true,
    headers: { "API-KEY": "185399ed-5bf1-4614-a945-6c901c6ff6b3" }
  }

  const onFollowButtonClick = () => {
    if (props.userInfo.followed) {

      axios.delete(apiUrl, axiosParameters).then((response) => {
        console.log(response.data)
        if (response.data.resultCode == 0) {
          props.followToggle(props.userInfo.id)
        }
      })

    } else {

      axios.post(apiUrl, {}, axiosParameters).then((response) => {
        console.log(response.data)
        if (response.data.resultCode == 0) {
          props.followToggle(props.userInfo.id)
        }
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