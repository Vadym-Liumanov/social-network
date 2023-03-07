import React from "react";
import { NavLink } from 'react-router-dom'

import cn from 'classnames'

import styles from "./Menu.module.css"

import { menuList } from "../../helpers/menuList";

const Menu = () => {

  // Внутри <NavLink /> доступно св-во {isActive}, показывающее, активен ли данный роут.
  // Т.е. если активен '/profile', то активным будет указывающий на него Navlink

  // const activeLink = "nav-list__link nav-list__link--active"
  // const normalLink = "nav-list__link"
  // const linkClassNameDefinition = ({ isActive }) => isActive ? activeLink : normalLink

  // <NavLink to="/" className={linkClassNameDefinition}>

  // const activeLink: string = cn(styles.menu__link, styles.menu__link_active) 
  // const normalLink: string = styles.menu__link

  // const linkClassNameDefinition = ({ isActive }: { isActive: boolean }): string => isActive ? activeLink : normalLink

  return (
    <div className={styles.menu}>

      <div className={styles.menu__prevBlock}>
        {/* For some content in mobile */}
      </div>

      <nav className={styles.menu__body}>
        {menuList.map((item) => {
          return (
            <NavLink
              key={item.name}
              to={item.url}
              className={styles.menu__link}
              // className={cn(styles.menu__link, {
              //   [styles.menu__link_active]: true
              // })}
              
            >
              {item.name}
            </NavLink>
          )
        })
        }
      </nav>
    </div>
  )
}

export default React.memo(Menu)