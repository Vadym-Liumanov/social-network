import React from 'react'

import userInfoStyles from'./UserInfo.module.css'

const UserInfo = () => {
  return (
    <div className={userInfoStyles.info}>
      <div>
        Vadym Liumanov
      </div>
      <div>
        Aka Vadzzzila
      </div>
    </div>
  );
}

export default UserInfo
