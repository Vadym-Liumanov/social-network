import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { usersAPI } from "../../../api/usersAPI"
import styles from './User.module.css'
import userImage from '../../../assets/images/defaultUserImage.jpg'
import { UserInfoType } from '../../../types/types'

type PropsType = {
  userInfo: UserInfoType
  followToggle: (userId: number | null) => void
  isFollowingToggle: (followingUserId: number | null) => void
  isFollowingInProgress: Array<number | null>
}

const User: React.FC<PropsType> = (props) => {

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
    <div className={styles.userCard}>

      <div className={styles.userAvatar}>
        <NavLink to={userProfileUrl}>
          <img src={props.userInfo.photos.small ? props.userInfo.photos.small : userImage} alt="avatar" />
        </NavLink>
      </div>

      <div className={styles.about}>
        <div className={cn(styles.about__item, styles.name)}>
          {props.userInfo.name}
        </div>
        <div className={cn(styles.about__item, styles.status)}>
          <span className={styles.status__title}>Status:</span>
          <div className={styles.status__text}>
            {props.userInfo.status ? props.userInfo.status : '------'}
          </div>
        </div>
      </div>

      <div className={styles.btnBlock}>
        <button
          className={styles.followBtn}
          onClick={onFollowButtonClick}
          disabled={props.isFollowingInProgress.indexOf(userId) >= 0}
        >
          {followButtonText}
        </button>
      </div>



    </div>
  )
}

export default User