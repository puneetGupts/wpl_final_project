import React, { useState } from 'react';
import CamblyConstants from '../../constant/camblyConstant';
import Card from '../card';
import FilterTop from '../filterTop';
import Header from '../header';
import styles from "./style.module.scss";
import Container from '../container';
import Banner from '../banner';
import setFavorite from "../../helpers";
import stylesCommon from "../../assets/common/style.module.scss";


function StudentHome() {
  const [searchTutor, setsearchTutor] = useState(CamblyConstants.TUTORS);

  const handleSearch = (e) => {
    setsearchTutor(
      CamblyConstants.TUTORS.filter((t) => t.name.toLowerCase().includes(e))
    );
  };
  return (
    <>
      <Header />
      <section className={stylesCommon.banner}>
        <Container>
          <Banner/>
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
          <div className={styles.card_wrapper} >
            {
              searchTutor.map((tutor, ind) => {
                return <Card
                  key={ind + 1}
                  tutor={tutor}
                  onChildClick={setFavorite}
                />
              })
            }
          </div>
        </Container>
      </section>

    </>
  )
}

export default StudentHome;