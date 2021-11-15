import React from 'react'
import { NavLink } from 'react-router-dom'

import navbarItemStyles from './NavbarItem.module.css'

const NavbarItem = (props) => {
  return (
      <div>
        <NavLink to={props.url} className={navbarItemStyles.item}>{props.value}</NavLink>
      </div>
  );
}

export default NavbarItem
