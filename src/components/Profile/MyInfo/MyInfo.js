import React from 'react'
import DefaultUserPhoto from '../../common/DefaultUserPhoto/DefaultUserPhoto'

import myInfoStyles from './MyInfo.module.css'

const MyInfo = (props) => {
  return (
    <div className={myInfoStyles.info}>
      <DefaultUserPhoto />
      <div>
        Vadym Liumanov
      </div>
      <div>
        aka Vadzzzila
      </div>
    </div>
  );
}

export default MyInfo
