import React, { useEffect,useState } from "react";
import { NavLink,useParams  } from "react-router-dom";
import styles from "./style.module.scss";
import CamblyConstants from "../../constant/camblyConstant";
import shortid from "shortid";
// import TutorHome from "../tutorHome";
function HeaderNav() {
  let { id } = useParams();
  const [tutors, setTutor] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {

  //   fetch("http://localhost:3001/tutors/" + id, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTutor(data);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       setError(error);
  //     });
  // }, []);
  console.log(id);
  // const [isTutor, setIsTutor] = useState(false);

  const localstorage_user = JSON.parse(localStorage.getItem("user"));
  // console.log(localstorage_user.isTutor)
  return (
    <nav className={styles.navbar}>
      {CamblyConstants.HEADER.map((item) => (
        ((item.value === "Become Tutor")) ? (
          !localstorage_user.isTutor ?


          <NavLink to={item.slug} key={shortid.generate()}>
            <a>{item.value}</a>
          </NavLink>: (<></>)

          
          // (<NavLink to={"/"}><a>{item.value}</a></NavLink>)
          
          
          ) : 
          
          (
            ((item.value === "Tutors")) ? (
              !localstorage_user.isTutor ?
    
    
              <NavLink to={item.slug} key={shortid.generate()}>
                <a>{item.value}</a>
              </NavLink>: (<NavLink to={`/tutorHome/`+id+`/editTutor`}><a>Edit Profile</a></NavLink>)
    
              
              // (<NavLink to={"/"}><a>{item.value}</a></NavLink>)
              
              
              ):(<></>)
          )
      ))}
    </nav>
  );
}

export default HeaderNav;
