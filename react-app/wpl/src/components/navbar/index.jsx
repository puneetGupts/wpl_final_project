import { NavLink } from 'react-router-dom'
import styles from "./style.module.scss"
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light col-light">
      <div className="container-fluid">
        <div
          className=" d-flex flex-lg-row justify-content-start "
        >
          <NavLink activeclassname="menu_active" className="navbar-brand" to="/">
            <img
              src="logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
          </NavLink >
          <h6><span className="ml-3" style={{
            fontFamily: "Allerta Stencil",
            fontSize: "1.5rem"
          }}> Geek<em style={{ color: "#009bb5" }}>Hunt</em></span></h6>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact="true" activeclassname="menu_active" className="nav-link" aria-current="page" to="/about">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact="true" activeclassname="menu_active" className="nav-link " to="/">Sign In</NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact="true" activeclassname="menu_active" className="nav-link" to="/register">Register</NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink exact="true" activeclassname="menu_active" className="nav-link" to="/studentHome">Student Home</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>)
}

export default Navbar
