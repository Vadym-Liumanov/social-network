import React from 'react'

import profileStyles from'./Profile.module.css'

import MainImg from './MainImg/MainImg'
import Avatar from './Avatar/Avatar'
import UserInfo from './UserInfo/UserInfo'
import MyPosts from './MyPosts/MyPosts'

const Profile = (props) => {
  return (
    <div className={profileStyles.content}>
      <MainImg />
      <Avatar />
      <UserInfo />
      <MyPosts state={props.state} addPost={props.addPost} />
    </div>
  );
}

export default Profile
