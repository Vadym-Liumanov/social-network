import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import styles from './User.module.css'
import userImage from '../../../assets/images/defaultUserImage.jpg'
import { UserInfoType } from '../../../types/types'
import FollowButton from '../../common/Battons/FollowButton/FollowButton'

type PropsType = {
  userInfo: UserInfoType
  followToggle: (userId: number | null) => void
  isFollowingToggle: (followingUserId: number | null) => void
  isFollowingInProgress: Array<number | null>
}

const User: React.FC<PropsType> = (props) => {

  const userId = props.userInfo.id
  const userProfileUrl = `/profile/${userId}`

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
        <FollowButton
          userId={userId}
        />

      </div>



    </div>
  )
}

export default User