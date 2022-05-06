import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CamblyConstants from "../../constant/camblyConstant";
import Card from "../card";
import FilterTop from "../filterTop";
// import Header from '../header';
import styles from "./style.module.scss";
import Container from "../container";
import Banner from "../banner";
import setFavorite from "../../helpers";
import stylesCommon from "../../assets/common/style.module.scss";
import Layout from "../layout";

function StudentHome() {
  const [favTutors, setFavTutors] = useState("");
  const [searchTutor, setsearchTutor] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const getFavTutors = async() => {

    try {
     const localstorage_user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`http://localhost:3001/favourites?studentId=${localstorage_user._id}`);
      const jsonData = await response.json();
      const tutors=JSON.parse(localStorage.getItem("cachedTutors"));
      const tutorData = jsonData;
      const favTutorsList = tutors.filter((elem) => tutorData.find(({ tutorId }) => elem._id === tutorId) );
      setFavTutors(favTutorsList);

  } catch (error) {
      console.error(error.message);
  }}

  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      navigate("/studentHome");
      getTutors();
      getFavTutors();

    } else {
      navigate("/");
    }
  }, [navigate]);

  // useEffect(() => {
  //   getTutors();
  //   // getFavTutors();
  // }, []);

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    const tutorData = searchTutor;
    if (searchInput !== '') {
const filteredData = tutorData.filter((t) => {
        
          return Object.values(t.name).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData);
  }
  else{
      setFilteredResults(tutorData)
  }
  };
  const getTutors = async () => {
    fetch("http://localhost:3001/tutors", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setsearchTutor(data);
        localStorage.setItem("cachedTutors", JSON.stringify(data));
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        // setError(error);
        // setLoading(false);
      });

    // try {

    //     const response = await fetch(`http://localhost:3001/tutors`);
    //     const jsonData = await response.json();
    //     setsearchTutor(jsonData);
    //     console.log(searchTutor[0]);
    //     // localStorage.setItem('cachedTutors',jsonData);
    //     // console.log(searchTutor);
    // } catch (error) {
    //     console.error(error.message);
    // }
  };

  return (
    <>
      <main>
        <Layout>
          <section className={stylesCommon.banner}>
            <Container>
              <Banner />
            </Container>
          </section>

          <section className={stylesCommon.filterTopWrapper}>
            <Container>
              <FilterTop
                handleKeyUp={(value) => handleSearch(value)}
                status="homepage"
              />
            </Container>
          </section>
          <section className={styles.cardsWrapper}>
            <Container>
              <div className={styles.card_wrapper}>
                {
                                searchInput.length >= 1 ? (
                                  filteredResults && filteredResults.map((results,ind) => {
                                    return(<Card
                                    key={ind+1}
                                      tutor={results}
                                      favTutors={filteredResults}
                                      onChildClick={setFavorite}
                                    />
                                  )})
                              ):
                searchTutor.map((tutor, ind) => {
                  return (
                    <Card
                      key={ind + 1}
                      tutor={tutor}
                      favTutors={favTutors}
                      status="homepage"
                      onChildClick={setFavorite}
                    />
                  );
                })}
              </div>
            </Container>
          </section>
        </Layout>
      </main>
    </>
  );
}

export default StudentHome;
