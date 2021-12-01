import React from 'react'

import userStyles from './User.module.css'

const User = (props) => {
  debugger

  return (
    <div className={userStyles.userCard}>
      <div>
        <div>
          <img src={props.userInfo.avatar} alt="avatar" />
        </div>
        <div>
          <button>
            FOLLOW
          </button>
        </div>
      </div>

      <div>
        <div>
          {props.userInfo.fullName}
        </div>
        <div>
          {props.userInfo.status}
        </div>
      </div>
      <div>
        {props.userInfo.location.city}, {props.userInfo.location.country}
      </div>
    </div>
  )
}

export default User