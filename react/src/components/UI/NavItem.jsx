import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

function NavItem({ to, children, dot = false, onClick, phone = false }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive: navIsActive }) =>
        ` px-1 py-2 font-roboto font-normal transition-all duration-300 ease-in-out ${
          phone ? "flex items-center space-x-2" : ""
        } ${
          navIsActive
            ? "text-stone-800 rounded-full bg-white px-3 font-semibold"
            : "text-gray-700 hover:text-stone-400"
        }`
      }
      end={to === "/"}
    >
      {isActive && dot ? "." : ""}
      {children}
    </NavLink>
  );
}

export default NavItem;
