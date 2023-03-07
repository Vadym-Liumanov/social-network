import React from 'react'
import { NavLink } from 'react-router-dom'

import navbarItemStyles from './NavbarItem.module.css'

type PropsType = {
  url: string
  value: string
}

const NavbarItem: React.FC<PropsType> = ({ url, value }) => {
  return (
    <div className={navbarItemStyles.item}>
      <NavLink to={url}>{value}</NavLink>
    </div>
  )
}

export default NavbarItem
