import React from 'react'
import CamblyConstants from './camblyConstant';
import Card from './card';
function StudentHome() {
  return (
    <>
      <div className='my-5'>
        <h1 className='text-center'>Tutors</h1>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className='row gy-4'>
            {
              CamblyConstants.TUTORS.map((val,ind)=>{
                return <Card key={ind}
                imgsrc={val.avatar}
                info={val.info}
                />
              })
            }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentHome;