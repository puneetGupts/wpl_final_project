import React, { useState, useEffect } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import Header from '../header';
import Form from "react-bootstrap/Form"
import { Row, Col } from "react-bootstrap"
import ContainerFluid from "../containerFluid"
import Loading from "../loading"

 function EditTutor() {
  let { id } = useParams();
  const navigate = useNavigate();

  const localstorage_user = JSON.parse(localStorage.getItem("user"));
  const localstorage_tutors = JSON.parse(localStorage.getItem("cachedTutors"));

  const [tutors, setTutor] = useState([]);
    // Teacher Form Fields
  const params = {
    tname: localstorage_user.username,
    tavatar: "",
    location: localstorage_tutors[0].location,
    profession: "",
    personalInfo: localstorage_tutors[0].personalInfo,
    about: localstorage_tutors[0].about,
    education: localstorage_tutors[0].education,
    workEx: localstorage_tutors[0].workEx,
    lang: localstorage_tutors[0].languages,
    teachingStyle: localstorage_tutors[0].teachingStyle,
    cert: localstorage_tutors[0].certification,
    chats: localstorage_tutors[0].chats,
    // temail: "",
    // tpassword: "",
    // tconfirmpswd: ""
  };
  const [FormValues, setFormValues] = useState(params);
  const [FormErrors, setFormErrors] = useState({});
  const [error, setError] = useState(false);
  // const [show, setShow] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const[loading,setLoading]=useState(false);

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

// console.log(FormValues.tavatar);
    // console.log(FormValues.tavatar.toString().split("\\").pop())
    setFormErrors(val_tutor(FormValues));
    var formErrorsForm=val_tutor(FormValues);


    // setIsSubmit(true);
    try {
      // setLoading(true);
      if (Object.keys(formErrorsForm).length ===0 && !isSubmit) {
      const registerResponseUser = await fetch(`http://localhost:3001/update/${localstorage_user._id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            username: localstorage_user.username,
            email: localstorage_user.email,
            password: localstorage_user.password,
            pic: FormValues.tavatar.toString().split("\\").pop(),
            isTutor:true
    })})  
        const registerResponse = await fetch(`http://localhost:3001/tutors/${localstorage_tutors[0]._id}`,{
          method: "PUT",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            _id: localstorage_user._id,
            slug: FormValues.tname,
            name: FormValues.tname,
            badge: "https://www.cambly.com/static/images/country-flag-icons/US.png",
            location: FormValues.location,
            info: "Architect- ESL teacher",
            video: "",
            avatar: FormValues.tavatar.toString().split("\\").pop(),
            about: FormValues.about,
            languages: FormValues.lang,
            chats: FormValues.chats,
            personalInfo: FormValues.personalInfo,
            education: FormValues.education,
            certification: "TOEFL",
            teachingStyle: FormValues.teachingStyle,
            workEx: FormValues.workEx,
            rating: localstorage_tutors[0].rating,
            reviews: localstorage_tutors[0].reviews,
      })})  
      const response = await registerResponse.json();

      localstorage_user.pic=FormValues.tavatar.toString().split("\\").pop();
      localStorage.setItem('user', JSON.stringify(localstorage_user));
      localstorage_tutors[0].avatar=FormValues.tavatar.toString().split("\\").pop();
      localStorage.setItem('cachedTutors', JSON.stringify(localstorage_tutors[0]));
      if (registerResponse.status===201) {
        // localstorage_user["isTutor"]=true;
        navigate(`/tutorHome/${localstorage_tutors[0]._id}`);

      localstorage_user.pic=FormValues.tavatar.toString().split("\\").pop();
      localStorage.setItem('user', JSON.stringify(localstorage_user));
      localstorage_tutors[0].avatar=FormValues.tavatar.toString().split("\\").pop();
      localStorage.setItem('cachedTutors', JSON.stringify(localstorage_tutors[0]));
        // setShow(false);
        setIsSubmit(true);
        setLoading(false);
        setFormValues(params);

        // window.location.reload();



      }
      // if (registerResponse.status === 400) {
      //   // setIsSubmit(false);
      //   setError(error);
      //   setError(response.msg);
  
      // }
    
    }
  }
  catch (error) {
      // console.error(error.message);
      setError(error);
    }    

    // console.log(name + email + password + confirmpswd);
    // console.log(avatar.split('\\').pop());

    // console.log(personalInfo.split("\n"));
    // console.log(tname + badge.split("\\").pop() + temail + tpassword + tconfirmpswd + personalInfo + location + profession + about + education + workEx + lang + teachingStyle + cert);
    // console.log(chats);
  };


  const val_tutor = (values) => {
    const errors = {};
    // const reg_email = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i;
    // const reg_pswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/i;

    if (!values.tname) {
      errors.tname = "Username is required.";
    }
    if (!values.tavatar) {
      errors.tavatar = "Avatar not uploaded. Please upload image.";
    }
    // if (!values.temail) {
    //   errors.temail = "Email is required.";
    // } else if (!reg_email.test(values.temail)) {
    //   errors.temail = "This is not a valid email format";
    // }
    // if (!values.tpassword || !values.tconfirmpswd) {
    //   errors.tpassword = "Either or both password fields are blank.";
    // } else if (!reg_pswd.test(values.tpassword)) {
    //   errors.tpassword = "Invalid password format.\n";
    //   errors.tpassword +=
    //     "NOTE: Password should have minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    // }
    // if (values.tpassword !== values.tconfirmpswd) {
    //   errors.tconfirmpswd = "Passwords do not match. Try again.";
    //   if(!values.tconfirmpswd) {
    //     errors.tconfirmpswd += "\nKindly type above password to confirm";
    //   }
    // }
    
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
      {/* {Object.keys(FormErrors).length === 0 && isSubmit ? (
        <div>Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(FormValues, undefined, 2)}</pre>
      )} */}

      <h1>Become a Mentor Form</h1>
        {loading && <Loading/>}
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
          />
        </Form.Group>
        <p>{FormErrors.tname}</p>

        <Form.Group as={Col}>
          <Form.Label>Upload Avatar: </Form.Label>
          <Form.Control
            type="file"
            id="tavatar"
            accept="image/x-png,image/png,image/jpeg,image/jpg"
            name="tavatar"
            onChange={handleChange}
            value={FormValues.tavatar}
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

        {/* <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="temail"
              placeholder="Enter email"
              onChange={handleChange}
              value={FormValues.temail}
            />
          </Form.Group>
          <p>{FormErrors.temail}</p>

          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="tpassword"
              placeholder="Password"
              onChange={handleChange}
              value={FormValues.tpassword}
            />
          </Form.Group>
          <p>{FormErrors.tpassword}</p>
        </Row>

        <Form.Group as={Col}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="tconfirmpswd"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={FormValues.tconfirmpswd}
          />
        </Form.Group>
        <p>{FormErrors.tconfirmpswd}</p> */}

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
export default EditTutor