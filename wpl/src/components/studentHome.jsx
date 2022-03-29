import React, { useState}from 'react';
import CamblyConstants from './camblyConstant';
import Card from './card';
import FilterTop from './filterTop';
import setFavorite from '../setFavorite';

function StudentHome() {
  const [searchTutor, setsearchTutor] = useState(CamblyConstants.TUTORS);

  const handleSearch = (e) => {
    setsearchTutor(
      CamblyConstants.TUTORS.filter((t) => t.name.toLowerCase().includes(e))
    );
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
              status="homepage"
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
            {
              searchTutor.map((tutor,ind)=>{
                return <Card 
                key={ind+1}
                tutor={tutor}
                // imgsrc={val.avatar}
                // info={val.info}
                // name={val.name}
                // badge={val.badge}
                // location={val.location}
                // teacher={val.teacher}
                // chats={val.chats}
                // infos={val.info}
                imgsrc={tutor.avatar}
                info={tutor.info}
                id ={tutor.id}
                name = {tutor.name}
                location = {tutor.location}
                languages = {tutor.languages}
                education = {tutor.education}
                certification = {tutor.certification}
                teachingStyle = {tutor.teachingStyle}
                workEx = {tutor.workEx}
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

export default StudentHome;