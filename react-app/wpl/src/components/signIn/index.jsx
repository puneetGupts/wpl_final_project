import React from 'react'
import Navbar from "../navbar";
import Footer from '../footer';
import styles from "./style.module.scss"
// import {Link} from "react-router-dom";
function SignIn() {
  return (
    <>
      <Navbar />
      <div
        className="container mt-5 pt-0 d-flex flex-column flex-lg-row justify-content-evenly mb-5 "
      >
        {/* Heading */}
        <div>
          <div className="text-center text-lg-start mt-0 pt-0 mt-lg-5 pt-lg-5">
            <h1 className="fw-bold fs-0"><span style={{
              fontFamily: "'Allerta Stencil' ,'sans-serif'"
            }}>Geek<em style={{ color: "#009bb5" }}>Hunt</em></span></h1>
            <p className="w-75 mx-auto fs-4 mx-lg-0">
              GeekHunt helps you connect and grow with the tutors in your life.
            </p>
          </div>
        </div>
        {/* Form Card */}
        <div style={{ maxWidth: "28rem", width: "100%" }}>
          {/* Login Form */}
          {/*first was form tag   */}
          <div className="bg-white shadow rounded p-2 input-group-lg">
            <div className="flex-column flex-lg-row">
              <h2 className="d-flex align-items-center justify-content-center text-muted "><i className="fas fa-lock m-3" style={{ fontsize: "2rem" }}></i>
                Sign In</h2>
            </div>
            <input
              type="email"
              className="form-control my-3"
              placeholder="E-Mail address"
            />
            <input
              type="password"
              className="form-control my-3"
              placeholder="Password"
            />
            <a href="#"
            ><button className="btn btn-primary w-100 my-3 col-dark">Sign In</button></a
            >
            <a href="#" className="text-decoration-none text-center"
            ><p>Forgot password?</p></a>
            {/* create form */}
            <hr />
            <div className="text-center my-4">
              <button
                className="btn btn-success btn-lg"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#createModal"
              >
                Create New Account
              </button>
            </div>

          </div>

        </div>
      </div>
      <Footer/></>
  )
}

export default SignIn;