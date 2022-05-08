import React, { useEffect, useState } from 'react';
// import CamblyConstants from "./constant/camblyConstant.jsx";
import Layout from './components/layout';
import Card from './components/card';
import FilterTop from './components/filterTop';
import setFavorite from "./helpers";
import Container from './components/container/index.jsx';
import Banner from './components/banner/index.jsx';
import styles from "./assets/common/style.module.scss";

function Favorites() {
  const [favTutors, setFavTutors] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    getFavTutors();
  }, []);

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


  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    const tutorData = favTutors;
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
  return (
    <>
        <main>
        <Layout>
          <section className={styles.banner}>
            <Container>
              <Banner />
            </Container>
          </section>

          <section className={styles.filterTopWrapper}>
            <Container>
              <FilterTop
                handleKeyUp={(value) => handleSearch(value)}
                status="favorite"
              />
            </Container>
          </section>

          <section className={styles.cardsWrapper}>
            <Container>
              <div className={styles.card_wrapper}>
                {
                searchInput.length >= 1 ? (
                  filteredResults && filteredResults.map((results) => {
                    return(<Card
                      tutor={results}
                      favTutors={filteredResults}
                      onChildClick={setFavorite}
                    />
                  )})
              ):
                favTutors &&
                  favTutors.map((tutor) => {
                    return (<Card
                      tutor={tutor}
                      favTutors={favTutors}
                      status="favorite"
                      onChildClick={setFavorite}
                    />
                  )})}
              </div>
            </Container>
          </section>
          </Layout>
        </main>
    </>
  )
}

export default Favorites;