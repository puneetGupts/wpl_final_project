import React from "react";
import { NavLink ,Link} from "react-router-dom";
import CamblyConstants from '../../constant/camblyConstant';
import styles from "./style.module.scss";
import HeaderNav from "../headerNav";
import ContainerFluid from "../containerFluid";
import Notifications from "../notifications";
import CalenderInfo from "../calenderInfo";
import ProfileButton from "../profileButton";
import Logo from "../../images/logo.png"
import InfoPlan from "../infoPlan";
import shortid from "shortid";



function Header({}) {
    return (
      <header className={styles.header}>
        <ContainerFluid>
          <div className={styles.header_wrapper}>
            <div className={styles.left_side}>
              <Link to="/">
                <a className="logo">
                <img src={Logo} alt="" width="30" height="30" 
                className="d-inline-block align-top"/>
                </a>
              </Link>
              <HeaderNav />
            </div>
            <div className={styles.right_side}>
              <InfoPlan />
              <Notifications />
              <ProfileButton id={1}/>
            </div>
          </div>
        </ContainerFluid>
      </header>
    );
  }
// function Header({}) {
//     return (
//         <header className="header">
//             <div className="container-fluid">
//                 <div className="header_wrapper">
//                     <div className="left_side">
//                         <NavLink to="/">
//                             <a className="logo">
//                                 <img
//                                     src="img2.png"
//                                     width="30"
//                                     height="30"
//                                     className="d-inline-block align-top"
//                                     alt=""
//                                 />
//                             </a>
//                         </NavLink>
//                         <nav className="navbars">
//                             {CamblyConstants.HEADER.map((item) => (
//                                 <NavLink to={item.slug} key={shortid.generate()}>
//                                     <a>{item.value}</a>
//                                 </NavLink>
//                             ))}
//                         </nav>
//                     </div>
//                     <div className="right_side">
//                         <InfoPlan />
//                         <Notifications />
//                         {/* <CalenderInfo /> */}
//                         {/* <ProfileButton id={1} /> */}
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

export default Header;
