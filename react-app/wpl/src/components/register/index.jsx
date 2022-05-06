import React, { useState, useEffect } from "react"
import Navbar from "../navbar"
import Form from "react-bootstrap/Form"
import { Row, Col } from "react-bootstrap"
import ContainerFluid from "../containerFluid"
import Loading from "../loading";
import ErrorMessage from "../errorMessage"


// function handleKeyUp() {
//   const term = document.getElementById('personalInfo');
// }

function Register() {

  // Student Form fields
  const [name, setName] = useState("");
  const [avatar, setavatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpswd, setconfirmpswd] = useState("");

  // JS form validation (for student)
  const params = {name:"", email:"", avatar:"", password:"", confirmpswd:""};
  const [formValues, setFormValues] = useState(params);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(false);
  // const[loading,setLoading]=useState(false);
  const [IsSubmit, setIsSubmit] =  useState(false);
  // const [IsSubmitSuccess, setIsSubmitSuccess] =  useState(false);

  const [show, setShow] = useState(true);


  const handleChange = (e) => {
    //console.log(e.target);
    const {name, value} = e.target;
    setFormValues({ ...formValues, 
      [name]: value
    });
    //console.log(formValues);
  };


  const onSubmitForm = async  (e)=>{
    console.log(formErrors)
      e.preventDefault();
      setFormErrors(validate(formValues));
      try {

      const registerResponse = await fetch(`http://localhost:3001/register`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            username: formValues.name,
            email: formValues.email,
            password: formValues.password,
            pic: formValues.avatar.toString().split("\\").pop(),
            isTutor:false
    })})  
    const response = await registerResponse.json();
    if (registerResponse.status===201) {
      setShow(false);
      setIsSubmit(true);
      setFormValues(params);
    }
    if (registerResponse.status === 400) {
      setIsSubmit(false);
      setError(error);
      setError(response.msg);

    }
}
catch (error) {
    // console.error(error.message);
    setError(error);
  }
    };
  
    // useEffect(() => {
    //   // onSubmitForm(e);
    //   // console.log(formErrors);
    //   // if(Object.keys(formErrors).length === 0) {
    //   //  setLoading(false);
    //   // }
    // },[]);

    const validate = (values) => {
      const errors = {};
      const reg_email = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i;
      const reg_pswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/i;

      if(!values.name) {
        errors.name = "Username is required.";
      }

      if(!values.avatar) {
        errors.avatar = "Avatar not uploaded. Please upload image.";
      }

      if(!values.email) {
        errors.email = "Email is required.";
      }
      else if(!reg_email.test(values.email)) {
        errors.email = "This is not a valid email format";
      }

      if(!values.password) {
        errors.password = "Either or both password fields are blank.";
      }
      else if (!reg_pswd.test(values.password)) {
        errors.password = "Invalid password format.\n";
        errors.password += "NOTE: Password should have minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character";
      }
      if(values.password !== values.confirmpswd) {
        errors.confirmpswd = "Passwords do not match. Try again.";
        if(!values.confirmpswd) {
          errors.confirmpswd += "\nKindly type above password to confirm";
        }
      }
      return errors;
    };

  return (
    <>
    <Navbar/>
    <ContainerFluid>
    
    {/* {Object.keys(formErrors).length === 0 && IsSubmit ? (<div className="success">Signed in successfully</div>) : (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>)} */}

        <h1>Register</h1>
        {/* {loading && <Loading/>} */}
        <Form onSubmit={onSubmitForm}>
        {(error && show  &&<ErrorMessage variant="danger" showCross={setShow} shows={show} >{error} </ErrorMessage>)}
          {/* {IsSubmitSuccess && show  && <ErrorMessage variant="success" showCross={setShow} shows={show} >{"Registered Successfully"}</ErrorMessage>} */}
          <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                id="name"
                name = "name"
                placeholder="Enter name"
                // onChange={(e) => setName(e.target.value)}
                onChange = {handleChange}
                value = {formValues.name}
              />
          </Form.Group>
          <p>{ formErrors.name }</p>

          <Form.Group as={Col}>
            <Form.Label>Upload Avatar</Form.Label>
            <Form.Control
              type="file"
              id="avatar"
              accept="image/x-png,image/png,image/jpeg,image/jpg"
              name="avatar"
              // onChange={(e) => setavatar(e.target.value)}
              onChange = {handleChange}
              onSubmit = {(e) => setavatar(e.target.value)}
              value = {formValues.avatar}
            />
          </Form.Group>
          <p>{ formErrors.avatar }</p>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                id="email"
                name = "email"
                placeholder="Enter email"
                // onChange={(e) => setEmail(e.target.value)}
                onChange = {handleChange}
                value = {formValues.email}
              />
            </Form.Group>
            <p>{ formErrors.email }</p>

            <Form.Group as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                id="password"
                name = "password"
                placeholder="Password"
                // onChange={(e) => setPassword(e.target.value)}
                onChange = {handleChange}
                value={formValues.password}
              />
            </Form.Group>
            <p>{ formErrors.password }</p>
          </Row>

          <Form.Group as={Col}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password"
              id = "confirmpswd"
              name = "confirmpswd"
              placeholder="Confirm Password"
              // onChange={(e) => setconfirmpswd(e.target.value)}
              onChange = {handleChange}
              value={formValues.confirmpswd}
            />
          </Form.Group>
          <p>{ formErrors.confirmpswd }</p>
        
          <Form.Group as={Row} className="mb-3">
            <button className="btn btn-primary w-100 my-3 col-dark"
                type="submit" onClick={onSubmitForm}>
                Register
            </button>
          </Form.Group>    

        </Form>

        </ContainerFluid>
    </>
  )
}

export default Register;