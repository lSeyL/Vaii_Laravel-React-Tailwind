import style from "./Nav.module.css";

import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import IconUser from "./Icons/IconUser";
import IconSearch from "./Icons/IconSearch";
import IconCart from "./Icons/IconCart";

function Nav() {
  return (
    <nav className={style.nav}>
      <Logo />
      <ul className={style.ul}>
        <li>
          <NavLink to="/home" className={style}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/home">Catalog</NavLink>
        </li>
        <li>
          <NavLink to="/home">Discord</NavLink>
        </li>
        <li>
          <NavLink to="/info">Info</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/login">
            <IconUser />
          </NavLink>
        </li>
        <li>
          <NavLink to="/home">
            <IconSearch />
          </NavLink>
        </li>
        <li>
          <NavLink to="/home">
            <IconCart />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
