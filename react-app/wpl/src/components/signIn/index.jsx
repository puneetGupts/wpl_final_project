import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import Loading from "../loading";
import ErrorMessage from "../errorMessage"
import Footer from "../footer";
import styles from "./style.module.scss";
// import {Link} from "react-router-dom";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const[loading,setLoading]=useState(false);
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

  useEffect(()=>{
    const userInfo=localStorage.getItem("user");
    if(userInfo ){
      var isTutor=JSON.parse(userInfo).isTutor;
      var tutorId=JSON.parse(userInfo)._id;

      if(isTutor){
        navigate(`tutorHome/${tutorId}`);
      }else
      navigate("/studentHome");
      // window.location.reload();

    }
  },[navigate]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // setShow(true);
    // console.log(email,password)
    try {
      setLoading(true);
      const data = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // you will get user information from login form

          email: email,
          password: password,
        }),
      });
      const response = await data.json();
      // console.log(data.status==200);
      if (data.status===200) {
        // Store response body normally

        localStorage.setItem("user", JSON.stringify(response));

        const localstorage_user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
            setShow(false);
        // console.log(localstorage_user.token);
        if (localstorage_user) {
          fetch("http://localhost:3001/welcome/", {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "x-auth-token": localstorage_user.token,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.auth) {
                window.location.reload();
                // navigate("/studentHome");
              }
            });
        }
      }
      if (data.status === 400) {
        setLoading(false);
        setShow(true);
        console.log(response)
        setError(response.msg);

      }

    } catch (error) {
      // console.error(error.message);
      setError(error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-0 d-flex flex-column flex-lg-row justify-content-evenly mb-5 ">
        {/* Heading */}
        <div>
          <div className="text-center text-lg-start mt-0 pt-0 mt-lg-5 pt-lg-5">
            <h1 className="fw-bold fs-0">
              <span
                style={{
                  fontFamily: "'Allerta Stencil' ,'sans-serif'",
                }}
              >
                Geek<em style={{ color: "#009bb5" }}>Hunt</em>
              </span>
            </h1>
            <p className="w-75 mx-auto fs-4 mx-lg-0">
              GeekHunt helps you connect and grow with the tutors in your life.
            </p>
          </div>
        </div>
        {/* Form Card */}
        {loading && <Loading/>}
        <div style={{ maxWidth: "28rem", width: "100%" }}>
          <form id="myForm" onSubmit={onSubmitForm}>
            {/* Login Form */}
            {/*first was form tag   */}
            <div className="bg-white shadow rounded p-2 input-group-lg">
              {/* {console.log(show)} */}
              <div className="flex-column flex-lg-row">
                <h2 className="d-flex align-items-center justify-content-center text-muted ">
                  <i
                    className="fas fa-lock m-3"
                    style={{ fontsize: "2rem" }}
                  ></i>
                  Sign In
                </h2>
                {error && show && <ErrorMessage variant="danger" showCross={setShow} shows={show} >{error} </ErrorMessage>}

              </div>
              <input
                type="email"
                id="email"
                value={email}
                className="form-control my-3"
                placeholder="E-Mail address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="password"
                value={password}
                className="form-control my-3"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <Link to="/studentHome" > */}
              <button
                className="btn btn-primary w-100 my-3 col-dark"
                type="submit"
              >
                Sign In
              </button>
              {/* </Link> */}
              {/* <Link to="#" className="text-decoration-none text-center">
                <p>Forgot password?</p>
              </Link> */}
              {/* create form */}
              <hr />
              <div className="text-center my-4">
                <Link to="/register"
                  className="btn btn-success btn-lg"
                  type="button"
                  // data-bs-toggle="modal"
                  // data-bs-target="#createModal"
                >
                  Create New Account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default SignIn;
