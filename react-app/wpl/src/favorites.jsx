import React, { useEffect, useState } from 'react';
// import CamblyConstants from "./constant/camblyConstant.jsx";
import Card from './components/card';
import FilterTop from './components/filterTop';
import setFavorite from "./helpers";
import Container from './components/container/index.jsx';
import Banner from './components/banner/index.jsx';
import styles from "./assets/common/style.module.scss";

function Favorites() {
  const [favTutors, setFavTutors] = useState("");

  useEffect(() => {
    setFavTutors(JSON.parse(localStorage.getItem("tutor")));
  }, []);
  const handleSearch = (e) => {
    const tutorData = JSON.parse(localStorage.getItem("tutor"));
    setFavTutors(tutorData.filter((t) => t.name.toLowerCase().includes(e)));
  };
  return (
    <>
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
              {favTutors &&
                favTutors.map((tutor) => (
                  <Card
                    tutor={tutor}
                    favTutor={favTutors}
                    onChildClick={setFavorite}
                  />
                ))}
            </div>
          </Container>
        </section>

    </>
  )
}

export default Favorites;