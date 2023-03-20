import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'

import { getUsers, getIsFollowingInProgress } from '../../../../redux/users-selectors'
import { actionCreators } from '../../../../redux/users-reducer'
import { usersAPI } from '../../../../api/usersAPI'

import { UserInfoType } from '../../../../types/types'

import styles from './FollowButton.module.css'

type PropsType = {
  userId: number | null
}

const FollowButton: React.FC<PropsType> = ({ userId }) => {

  const dispatch = useDispatch()
  const followToggle: (userId: number | null) => void = (userId) => dispatch(actionCreators.followToggleAC(userId))
  const isFollowingToggle: (followingUserId: number | null) => void = (followingUserId) => dispatch(actionCreators.isFollowingToggleAC(followingUserId))
  const usersList = useSelector(getUsers)
  const currentUserInfo: UserInfoType | undefined = usersList.find((it) => it.id === userId)
  const isFollowingInProgress = useSelector(getIsFollowingInProgress)
  let followButtonText = (currentUserInfo?.followed) ? 'UnFollow' : 'Follow'

  const onFollowButtonClick = () => {
    isFollowingToggle(userId)

    if (currentUserInfo?.followed) {
      usersAPI.setUserUnfollow(userId).then((data) => {
        if (data.resultCode === 0) {
          followToggle(userId)
        }
        isFollowingToggle(userId)
      })

    } else {
      usersAPI.setUserFollow(userId).then((data) => {
        if (data.resultCode === 0) {
          followToggle(userId)
        }
        isFollowingToggle(userId)
      })
    }

  }

  return (
    <button
      className={styles.followBtn}
      onClick={onFollowButtonClick}
      disabled={isFollowingInProgress.indexOf(userId) >= 0}
    >
      {followButtonText}
    </button>
  )
}

export default React.memo(FollowButton)