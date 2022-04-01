import React from 'react'
import styles from "./style.module.scss";

// import { NavLink } from 'react-router-dom';
// import CamblyConstants from '../../constant/camblyConstant.jsx';

 function Footer() {
  return (
    // <footer className="footer">
    //   <div className="containers1">
    //     <div className="footer_wrapper">
    //       {/* <FooterNav /> */}
    //       <div className="social_media">
    //         {CamblyConstants.SOCIAL_MEDIA.map((item) => (
    //           <nav>
    //             <NavLink to={item.slug}>
    //               <a>
    //                 {" "}
    //                 <img src={item.icon} />{" "}
    //               </a>
    //             </NavLink>
    //           </nav>
    //         ))}
    //       </div>
    //       <span className="copyright">
    //         CAMBLY INC. © COPYRIGHT 2021. ALL RIGHTS RESERVED.
    //       </span>
    //     </div>
    //   </div>
    // </footer>    
    <footer className="col-light text-muted fixed-bottom">
      <div className="container">
        <div className="d-flex flex-wrap pt-4">
          <p className="mx-2 fs-7 mb-0">Contact Us</p>
          <p className="mx-2 fs-7 mb-0">Teach on GeetHunt</p>
          <p className="mx-2 fs-7 mb-0">Our Tutors</p>
          <p className="mx-2 fs-7 mb-0">Our Courses</p>
          <p className="mx-2 fs-7 mb-0">Help & Support</p>
        </div>
        <hr />
      </div>
      <div className="mt-4 mx-2 text-center">
          <p className="fs-7">GeekHunt &copy; 2021</p>
        </div>
        <div></div>
    </footer>
  )
}


export default Footer;