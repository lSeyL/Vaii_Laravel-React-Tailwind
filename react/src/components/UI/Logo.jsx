import { NavLink } from "react-router-dom";

function Logo() {
    return (
        <NavLink to={"/"} className="text-3xl">
            Polyhaven
        </NavLink>
    );
}

export default Logo;
