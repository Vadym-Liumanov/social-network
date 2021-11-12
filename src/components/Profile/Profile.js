import React from 'react'

import profileStyles from'./Profile.module.css'

import MainImg from './MainImg/MainImg'
import Avatar from './Avatar/Avatar'


const Profile = () => {
  return (
    <div className={profileStyles.content}>
      <MainImg />
      <Avatar />
      <div>
        Avatar + description
      </div>
      <div>
        My posts
        <div>
          New post
        </div>
      </div>
      <div>
        Posts
        <div className={profileStyles.item}>
          post1
        </div>
        <div>
          post2
        </div>
        <div>
          post3
        </div>
      </div>

    </div>
  );
}

export default Profile
