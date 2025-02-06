import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to={"/"} className="logo-main">
      Polyhaven
    </NavLink>
  );
}

export default Logo;
