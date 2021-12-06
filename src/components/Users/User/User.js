import React from 'react'

import userStyles from './User.module.css'

import userImage from '../../../assets/images/userImage.jpg'

const User = (props) => {

  const onFollowButtonClick = () => props.followToggle(props.userInfo.id)

  let followButtonText = (props.userInfo.followed) ? 'UnFollow' : 'Follow'

  return (
    <div className={userStyles.userCard}>
      <div>
        <div>
          <img src={props.userInfo.photos.small ? props.userInfo.photos.small : userImage} alt="avatar" />
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