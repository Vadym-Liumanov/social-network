import React from 'react'

import headerStyles from './Header.module.css'
import logo from '../../assets/images/logo_nike.jpg'

const Header = () => {
  return (
    <div className={headerStyles.header}>
      <div>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default Header
