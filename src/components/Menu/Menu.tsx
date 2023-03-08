import React from "react";
import { NavLink } from 'react-router-dom'

import cn from 'classnames'

import styles from "./Menu.module.css"

import { menuList } from "../../helpers/menuList";

const Menu = () => {

  
  // Ф-ция linkClassNameDefinition определяет стилизацию для пунктов меню.
  // Если {isActive} true, то этот элемент отображен.
  // <NavLink to="/" className={linkClassNameDefinition}>

  const activeLink: string = cn(styles.menu__link, styles.menu__link_active)
  const normalLink: string = styles.menu__link
  const linkClassNameDefinition = ({ isActive }: { isActive: boolean }): string => isActive ? activeLink : normalLink

  return (
    <div className={styles.menu}>

      <div className={styles.menu__prevBlock}>
        {/* For some content */}
      </div>

      <nav className={styles.menu__body}>
        {menuList.map((item) => {
          return (
            <NavLink
              key={item.name}
              to={item.url}
              className={linkClassNameDefinition}
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