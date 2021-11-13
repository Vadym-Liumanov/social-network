import React from 'react'

import avatarStyles from './Avatar.module.css'

const Avatar = () => {
  return (
    <div className={avatarStyles.img}>
      <img src="https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg" alt="nature" />
    </div>
  );
}

export default Avatar
