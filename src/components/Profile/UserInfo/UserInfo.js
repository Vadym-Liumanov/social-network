import React from 'react'

import userInfoStyles from './UserInfo.module.css'

const UserInfo = (props) => {
  return (
    <div className={userInfoStyles.info}>
      <div>
        {/* <img src={props.photos.large} alt="userAvatar"/> */}
      </div>
      <div>
        {props.fullName}
      </div>
      <div>
        {props.fullName}
        {/* {JSON.stringify(props.photos.large)} */}
      </div>
      <div>
        {props.aboutMe}
      </div>
    </div>
  );
}

export default UserInfo
