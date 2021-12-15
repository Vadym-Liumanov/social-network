import React from 'react'

import profileStyles from'./Profile.module.css'

import MainImg from './MainImg/MainImg'

import MyInfo from './MyInfo/MyInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'

const Profile = (props) => {
  // debugger
  return (
    <div className={profileStyles.content}>
      <MainImg />
      <MyInfo />
      <MyPostsContainer />
    </div>
  );
}

export default Profile
