import React from 'react'

import userStyles from './User.module.css'

const User = (props) => {
  debugger

  return (
    <div className={userStyles.item}>
      <span>
        <div>
          <img src={props.userInfo.avatar} alt="avatar" />
        </div>
        <div>
          <button>
            FOLLOW
          </button>
        </div>
      </span>

      <span>
        <div>
          {props.userInfo.fullName}
        </div>
        <div>
          {props.userInfo.status}
        </div>
        <div>
          {props.userInfo.location.city}, {props.userInfo.location.country}
        </div>
      </span>
    </div>
  )
}

export default User