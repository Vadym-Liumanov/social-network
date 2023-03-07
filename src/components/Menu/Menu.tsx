import React from "react";
import { NavLink } from 'react-router-dom'
import "./Menu.css"

import { menuList } from "../../helpers/menuList";

const Menu = () => {
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