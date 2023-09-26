import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.png";
import Yoda from "../../img/yoda.png";
import Robots from "../../img/robots.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="  pt-3 container">
      <div className="d-flex align-items-center  justify-content-center navbar">
        {/*YODA*/}
        <img src={Yoda} height="170px" className="me-5 d-lg-block d-none" />
        {/*LOGO*/}
        <Link to="/" className="text-decoration-none cursor-pointer">
          <div className="d-flex flex-column">
            <img src={Logo} height="100px" />
            <div className="flashy-border px-4 d-flex justify-content-center py-2 border-none text-light bg-black text-space  outline-none rounded-pill mt-3 title">
              READING LIST
            </div>
          </div>
        </Link>
        {/*LUKE*/}
        <img src={Robots} height="170px" className="ms-5 d-lg-block d-none" />
      </div>
    </nav>
  );
};
