import React from "react";
import { NavLink } from 'react-router-dom'
import "./Menu.css"

import { menuList } from "../../helpers/menuList";



const Menu = () => {

  // Внутри <NavLink /> доступно св-во {isActive}, показывающее, активен ли данный роут.
  // Т.е. если активен '/profile', то активным будет указывающий на него Navlink

  // const activeLink = "nav-list__link nav-list__link--active"
  // const normalLink = "nav-list__link"
  // const linkClassNameDefinition = ({ isActive }) => isActive ? activeLink : normalLink

  // <NavLink to="/" className={linkClassNameDefinition}>

  return (
    <div className="menu">

      <div className="menu__prev-block">
        {/* For some content in mobile */}
      </div>

      <nav className="menu__body">
        {menuList.map((item) => {
          return (
            <NavLink
              key={item.name}
              to={item.url}
              className="menu__link"
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