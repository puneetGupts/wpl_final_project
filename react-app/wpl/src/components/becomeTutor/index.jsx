import React, { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom"
import Navbar from "../navbar"
import Form from "react-bootstrap/Form"
import { Row, Col } from "react-bootstrap"
import ContainerFluid from "../containerFluid"
import Header from "../header"
import Loading from "../loading"

function BecomeTutor() {
    const localstorage_user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

  // JS form validation (for mentor)
  const params = {
    tname: localstorage_user.username,
    tavatar: localstorage_user.pic,
    location: "",
    profession: "",
    personalInfo: [],
    about: "",
    education: "",
    workEx: "",
    lang: "",
    teachingStyle: "",
    cert: "",
    chats: "",
    // temail: "",
    // tpassword: "",
    // tconfirmpswd: ""
  };
  const [FormValues, setFormValues] = useState(params);
  const [FormErrors, setFormErrors] = useState({});
  const [error, setError] = useState(false);
  const [show, setShow] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  // const[loading,setLoading]=useState(false);



  // Teacher Form Fields
  // const [tname, tsetName] = useState("")
  // const [badge, tsetavatar] = useState("");
  // const [temail, tsetEmail] = useState("");
  // const [tpassword, tsetPassword] = useState("");
  // const [tconfirmpswd, tsetconfirmpswd] = useState("");
  // const [personalInfo, setpersonalInfo] = useState("");
  // const [location, setlocation] = useState("");
  // const [profession, setProfession] = useState("");
  // const [about, setAbout] = useState("");
  // const [education, setEducation] = useState("");
  // const [workEx, setworkEx] = useState("");
  // const [lang, setLanguages] = useState("");
  // const [teachingStyle, setteachingStyle] = useState("");
  // const [cert, setcertification] = useState("");
  // const [chats, setchats] = useState("");


  const personalInfoChange = (li) => {
    return li.toString().split("\n");
  };

  const handleChange = (e) => {
    //console.log(e.target);
    const { name, value } = e.target;
    setFormValues({ ...FormValues, [name]: value });
    //console.log(formValues);
  };

  const onSubmitForm = async (e) => {

    e.preventDefault();
    setFormErrors(val_tutor(FormValues));
    var formErrorsForm=val_tutor(FormValues);
console.log(formErrorsForm);
    // console.log(FormValues.tavatar.toString().split("\\").pop())
    // localstorage_user.setItem("isTutor", true);
  
    // setIsSubmit(true);
    try {
      console.log(isSubmit);

      // setLoading(true);
    // if (Object.keys(FormErrors).length === 0 && !isSubmit) {
    if (Object.keys(formErrorsForm).length ===0 && !isSubmit) {
      // console.log(isSubmit);
      console.log(formErrorsForm.length)

    const registerResponseUser = await fetch(`http://localhost:3001/update/${localstorage_user._id}`,{
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
          username: localstorage_user.username,
          email: localstorage_user.email,
          password: localstorage_user.password,
          pic: FormValues.tavatar,
          isTutor:true
  })})
        const registerResponse = await fetch(`http://localhost:3001/tutors`,{
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            _id: localstorage_user._id,
            slug: FormValues.tname,
            name: FormValues.tname,
            badge: "https://www.cambly.com/static/images/country-flag-icons/US.png",
            location: FormValues.location,
            info: "Architect- ESL teacher",
            video: "",
            avatar: FormValues.tavatar,
            about: FormValues.about,
            languages: FormValues.lang,
            chats: FormValues.chats,
            personalInfo: FormValues.personalInfo.toString().split("\n"),
            education: FormValues.education,
            certification: "TOEFL",
            teachingStyle: FormValues.teachingStyle,
            workEx: FormValues.workEx,
            rating: "0",
            reviews: "0",
      })})  
      const response = await registerResponse.json();
      if (registerResponse.status===201) {
        setShow(false);
        setIsSubmit(true);
        // var retrievedObject = localStorage.getItem('user').isTutor;
        localstorage_user.isTutor=true;
        localStorage.setItem('user', JSON.stringify(localstorage_user));
        // localStorage.setItem('', testObject);
        // navigate("/studentHome");

        // setLoading(false);
        setFormValues(params);
        window.location.reload();


      }}else{
        console.log(isSubmit);
        // setFormErrors("");
        // setIsSubmit(false);
      }
      // if (registerResponse.status === 400) {
      //   setIsSubmit(false);
      //   setError(error);
      //   setError(response.msg);
  
      // }
  }
  catch (error) {
      // console.error(error.message);
      setError(error);
    }    

  };

  // useEffect(() => {
  //   // console.log(localstorage_user.isTutor);
  //   // localstorage_user.setItem("isTutor", true);
  //   // localstorage_user.setItem(isTutor, true);


  //   // if (Object.keys(FormErrors).length === 0 && IsSubmit) {
  //   //   console.log(FormValues);
  //   // }
  // }, []);

  const val_tutor = (values) => {
    const errors = {};

    if (!values.tname) {
      errors.tname = "Username is required.";
    }
    if (!values.tavatar) {
      errors.tavatar = "Avatar not uploaded. Please upload image.";
    }
    
    if (!values.location) {
      errors.location = "Location is required";
    }
    if (!values.profession) {
      errors.profession = "Profession field required";
    }

    if (!values.personalInfo === [] || personalInfoChange(values.personalInfo).length < 3) {
      errors.personalInfo =
        "Insufficient number of skill attributes added. Need atleast 3 skills to continue.";
    }
    
    if (!values.about) {
      errors.about = "About field is required";
    }
    if (!values.education) {
      errors.education = "Education (Institute) required";
    }
    if (!values.lang) {
      errors.lang = "Languages required to fill";
    }
    if (!values.teachingStyle) {
      errors.teachingStyle = "Teaching Style required";
    }
    if (!values.cert) {
      errors.cert = "Certification required";
    }
    if (!values.chats) {
      errors.chats = "Social (Chat) Information required";
    }
    if (!values.workEx) {
      errors.workEx = "Kindly mention work experience";
    }

    return errors;
  };

  return (
    <>
    <Header/>
    {/* <div> */}
    <ContainerFluid>
      {Object.keys(FormErrors).length === 0 && isSubmit ? (
        <div>Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(FormValues, undefined, 2)}</pre>
      )}

      <h1>Become a Mentor Form</h1>
        {/* {loading && <Loading/>} */}
      <Form onSubmit={onSubmitForm}>
        <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="tname"
            name="tname"
            placeholder="Enter name"
            onChange={handleChange}
            value={FormValues.tname}
            readOnly
          />
        </Form.Group>
        <p>{FormErrors.tname}</p>

        <Form.Group as={Col}>
          <Form.Label>Upload Avatar: </Form.Label>
          <Form.Control
            // type="file"
            type="text"
            id="tavatar"
            // accept="image/x-png,image/png,image/jpeg,image/jpg"
            name="tavatar"
            onChange={handleChange}
            value={FormValues.tavatar}
            readOnly
          />
        </Form.Group>
        <p>{FormErrors.tavatar}</p>

        <Form.Group as={Col}>
          <Form.Label>Location : </Form.Label>
          <Form.Control
            type="text"
            id="location"
            name="location"
            placeholder="Enter Location"
            onChange={handleChange}
            value={FormValues.location}
          />
        </Form.Group>
        <p>{FormErrors.location}</p>

        <Form.Group as={Col}>
          <Form.Label>Profession : </Form.Label>
          <Form.Control
            type="text"
            name="profession"
            onChange={handleChange}
            value={FormValues.profession}
          />
        </Form.Group>
        <p>{FormErrors.profession}</p>

        <Form.Group className="mb-3">
          <Form.Label>Personal Skills : </Form.Label>
          <textarea
            id="personalInfo"
            name="personalInfo"
            onChange={handleChange}
            value={FormValues.personalInfo}
          />
        </Form.Group>
        <p>{ FormErrors.personalInfo }</p>

        <Form.Group as={Col}>
          <Form.Label>About yourself : </Form.Label>
          <Form.Control
            type="text"
            name="about"
            placeholder="Type something about yourself"
            onChange={handleChange}
            value={FormValues.about}
          />
        </Form.Group>
        <p>{ FormErrors.about }</p>

        <Form.Group as={Col}>
          <Form.Label>Education : </Form.Label>
          <Form.Control
            type="text"
            name="education"
            placeholder="Enter recent education institute"
            onChange={handleChange}
            value={FormValues.education}
          />
        </Form.Group>
        <p>{FormErrors.education}</p>

        <Form.Group as={Col}>
          <Form.Label>Languages : </Form.Label>
          <Form.Control
            type="text"
            name="lang"
            id="lang"
            placeholder="Enter languages (seperated by a ,)"
            onChange={handleChange}
            value={FormValues.lang}
          />
        </Form.Group>
        <p>{FormErrors.lang}</p>

        <Form.Group as={Col}>
          <Form.Label>Your teaching style : </Form.Label>
          <Form.Control
            type="text"
            name="teachingStyle"
            id="teachingStyle"
            onChange={handleChange}
            value={FormValues.teachingStyle}
          />
        </Form.Group>
        <p>{FormErrors.teachingStyle}</p>

        <Form.Group as={Col}>
          <Form.Label>Certification : </Form.Label>
          <Form.Control
            type="text"
            name="cert"
            id="cert"
            onChange={handleChange}
            value={FormValues.cert}
          />
        </Form.Group>
        <p>{FormErrors.cert}</p>

        <Form.Group as={Col}>
          <Form.Label>Social (Chat) Info : </Form.Label>
          <Form.Control
            type="text"
            name="chats"
            id="chats"
            placeholder="Type something about yourself"
            onChange={handleChange}
            value={FormValues.chats}
          />
        </Form.Group>
        <p>{FormErrors.chats}</p>

        <Form.Group as={Col}>
          <Form.Label>Work Experience : </Form.Label>
          <Form.Control
            type="text"
            name="workEx"
            placeholder="Tell us more about your work experience"
            onChange={handleChange}
            value={FormValues.workEx}
          />
        </Form.Group>
        <p>{FormErrors.workEx}</p>
        <Form.Group as={Row} className="mb-3">
          <button
            className="btn btn-primary w-100 my-3 col-dark"
            type="submit"
            onClick={onSubmitForm}
          >
            Submit
          </button>
        </Form.Group>
      </Form>
      </ContainerFluid>
          </>
  )
}

export default BecomeTutor;