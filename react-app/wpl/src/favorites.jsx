import React, {useEffect, useState}from 'react';
import CamblyConstants from './components/camblyConstant';
import Card from './components/card';
import FilterTop from './components/filterTop';
import setFavorite from "./setFavorite";


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
      <div className='my-5'>
        <h1 className='text-center'>Tutors</h1>
      </div>

      <section className="filterTopWrapper">
          <div className='containers1'>
            <FilterTop
              handleKeyUp={(value) => handleSearch(value)}
              status="favorite"
            />
          </div>
        </section>

      {/* <section className="col-10 mx-auto cardsWrapper"> */}
      <section className="cardsWrapper">
        
      {/* <div className="container-fluid mb-5"> */}
      <div className="containers1">
        {/* <div className="row"> */}
          {/* <div className="col-10 mx-auto"> */}
            {/* <div className='row gy-4 card_wrapper'> */}
            <div className='card_wrapper'>
            {favTutors &&
              favTutors.map((tutor,ind)=>{
                return <Card key={ind+1}
                // imgsrc={val.avatar}
                tutor={tutor}
                favTutor={favTutors}
                // info={val.info}
                // name={val.name}
                // badge={val.badge}
                // location={val.location}
                // teacher={val.teacher}
                // chats={val.chats}
                // infos={val.info}
                onChildClick={setFavorite}
                />
              })
            }
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}
      </section>

    </>
  )
}

export default Favorites;