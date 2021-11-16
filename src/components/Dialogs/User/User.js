import React from 'react'
import { NavLink } from 'react-router-dom';

import userStyles from'./User.module.css'

const User = (props) => {
  return (
    <div className={userStyles.item}>
      <NavLink to={`/dialogs/${props.userName}`}>
        {props.userName}
      </NavLink>
    </div>
  );
}

export default User
