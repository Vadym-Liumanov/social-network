import React from 'react'

import userStyles from'./User.module.css'

const User = (props) => {
  return (
    <div className={userStyles.item + ' ' + userStyles.active}>
      <div>
        {props.userName}
      </div>
    </div>
  );
}

export default User
