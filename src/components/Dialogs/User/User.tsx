import React from 'react'
import { NavLink } from 'react-router-dom';

import userStyles from './User.module.css'

type PropsType = {
  userName: string
}

const User: React.FC<PropsType> = ({ userName }) => {
  return (
    <div className={userStyles.item}>
      <NavLink to={`/dialogs/${userName}`}>
        {userName}
      </NavLink>
    </div>
  )
}

export default User
