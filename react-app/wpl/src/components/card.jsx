import React from 'react'
import { NavLink } from 'react-router-dom';
function Card(props) {
    return (
        <>
            <div className='col-md-4 col-10 mx-auto'>
                <div className="card">
                    <div className='col-md-3 mt-1 mr-1'>
                    <img src={props.imgsrc} className="card-img-top" alt={props.imgsrc}  />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold">{props.info}</h5>
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        <NavLink to="/" className="btn btn-primary">Go somewhere</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;