import React from 'react'

import navbarItemStyles from './NavbarItem.module.css'

const NavbarItem = (props) => {
  return (
      <div>
        <a href="#c" className={navbarItemStyles.item}>{props.value}</a>
      </div>
  );
}

export default NavbarItem
