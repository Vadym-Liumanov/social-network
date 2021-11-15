import React from 'react'
import { NavLink } from 'react-router-dom'

import navbarItemStyles from './NavbarItem.module.css'

const NavbarItem = (props) => {
  return (
    <div className={navbarItemStyles.item}>
      <NavLink to={props.url}>{props.value}</NavLink>
    </div>
  );
}

export default NavbarItem
