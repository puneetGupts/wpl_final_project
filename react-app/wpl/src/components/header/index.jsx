import React from "react";
import { NavLink } from "react-router-dom";
import CamblyConstants from '../../constant/camblyConstant';
// import Nav from "../header-nav";
import Notifications from "../notifications";
import CalenderInfo from "../calenderInfo";
import ProfileButton from "../profileButton";
import InfoPlan from "../infoPlan";
import shortid from "shortid";


function Header({}) {
    return (
        <header className="header">
            <div className="container-fluid">
                <div className="header_wrapper">
                    <div className="left_side">
                        <NavLink to="/">
                            <a className="logo">
                                <img
                                    src="img2.png"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt=""
                                />
                            </a>
                        </NavLink>
                        <nav className="navbars">
                            {CamblyConstants.HEADER.map((item) => (
                                <NavLink to={item.slug} key={shortid.generate()}>
                                    <a>{item.value}</a>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                    <div className="right_side">
                        <InfoPlan />
                        <Notifications />
                        {/* <CalenderInfo /> */}
                        {/* <ProfileButton id={1} /> */}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
