import React from 'react'

import profileStyles from'./Profile.module.css'

import MainImg from './MainImg/MainImg'
import Avatar from './Avatar/Avatar'
import UserInfo from './UserInfo/UserInfo'
import MyPosts from './MyPosts/MyPosts'

const Profile = () => {
  return (
    <div className={profileStyles.content}>
      <MainImg />
      <Avatar />
      <UserInfo />
      <MyPosts />
    </div>
  );
}

export default Profile