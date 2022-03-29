import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import SignIn from "./components/signIn";
import About from "./components/about";
import Register from "./components/register";
import StudentHome from "./components/studentHome";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import {
  Routes,
  Route,Navigate
} from "react-router-dom";
import Favorites from "./favorites";
function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route exact="true" path="/" element={<SignIn />} />
        <Route exact="true" path="/about" element={<About/>} />
        <Route exact="true" path="/register" element={<Register/>} />
        <Route exact="true" path="/studentHome" element={<StudentHome/>} />
        <Route exact="true" path="/favorite" element={<Favorites/>} />
        <Route path="*" element={<Navigate to="/" replace />}
    />        
        </Routes>
      <Footer/>
    </>
  );
}

export default App;
