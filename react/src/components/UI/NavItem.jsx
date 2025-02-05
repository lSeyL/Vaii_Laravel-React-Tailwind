import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

function NavItem({ to, children, dot = false, onClick, phone = false }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive: navIsActive }) =>
        `nav-item ${phone ? "phone" : ""} ${navIsActive ? "active" : ""}`
      }
      end={to === "/"}
    >
      {isActive && dot ? "." : ""}
      {children}
    </NavLink>
  );
}

export default NavItem;
