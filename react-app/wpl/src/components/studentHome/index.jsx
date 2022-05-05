import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CamblyConstants from '../../constant/camblyConstant';
import Card from '../card';
import FilterTop from '../filterTop';
// import Header from '../header';
import styles from "./style.module.scss";
import Container from '../container';
import Banner from '../banner';
import setFavorite from "../../helpers";
import stylesCommon from "../../assets/common/style.module.scss";
import Layout from '../layout';

function StudentHome() {

  // const [searchTutor, setsearchTutor] = useState(CamblyConstants.TUTORS);
  const [searchTutor, setsearchTutor] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const userInfo=localStorage.getItem("user");
    if(userInfo){
      navigate("/studentHome");

    }else{
      navigate("/")
    }
  },[navigate]);  
  useEffect(()=>{
    getTutors();
}, []);

  const handleSearch = (e) => {
    setsearchTutor(
      CamblyConstants.TUTORS.filter((t) => t.name.toLowerCase().includes(e))
    );
  };

  const getTutors = async() => {
    try {
        
        
        const response = await fetch(`http://localhost:3001/tutors`);
        const jsonData = await response.json();
        setsearchTutor(jsonData);
        localStorage.setItem('cachedTutors',searchTutor);
        console.log(searchTutor);
    } catch (error) {
        console.error(error.message);
    }
}


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
        </Layout>
      </main>
    </>
  )
}

export default StudentHome;