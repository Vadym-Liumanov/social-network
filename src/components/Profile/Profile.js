import React from 'react'

import profileStyles from'./Profile.module.css'

import MainImg from './MainImg/MainImg'
import Avatar from './Avatar/Avatar'
import UserInfo from './UserInfo/UserInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = (props) => {
  // debugger
  return (
    <div className={profileStyles.content}>
      <MainImg />
      <Avatar />
      <UserInfo />
      <MyPostsContainer />
    </div>
  );
}

export default Profile
