import style from "./Logo.module.css";

import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/home">
      <img src=".\public\pngwing.com.png" alt="logo" className={style.logo} />
    </Link>
  );
}

export default Logo;
