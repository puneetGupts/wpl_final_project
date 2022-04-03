import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
function Card({tutor,onChildClick}) {
    const [isFavorite, setIsFavorite] = useState(false);

    const changeText = (data) => {
        let storageTutor = JSON.parse(localStorage.getItem("tutor"));
        console.log("The storage data are :"+storageTutor);
        if (storageTutor !== null) {
            const tutor = storageTutor.filter((e) => e.id == data.id);

            if (tutor.length > 0) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        }
    };

    useEffect(() => {
        changeText(tutor);
    }, []);

    return (
        <>
            {/* <div className='col-md-4 col-10 mx-auto '> */}
            <div className="card_grid">
                <div className="card_grid_header">
                    <div className='card_grid_img'>
                        <img src={tutor.avatar} className="img" alt={tutor.avatar} />
                    </div>
                    <div className="card_grid_info">
                        <h4 className="card_grid_title">{tutor.name}</h4>
                        <span className="card_grid_location">
                            <img className="card_grid_badge" src={tutor.badge} />
                            {tutor.location}
                        </span>
                        <div className='card_grid_certificate'>
                            {tutor.chats && (
                                <div className="info_card">{tutor.chats}</div>
                            )}
                            {tutor.teacher && (
                                <div className="info_card">{tutor.teacher}</div>
                            )}
                        </div>
                    </div>
                    <div
                        className="card_fav_action"
                        onClick={() => {
                            onChildClick(tutor);
                            setIsFavorite(!isFavorite);
                        }}
                    >
                        {/* {console.log(isFavorite)} */}
                        {isFavorite ? "Delete Favorite" : "Add Favorite"}
                    </div>
                </div>
                <div className="card_grid_body">
                    <p className="card_grid_text">{tutor.info}</p>
                    <div className="card_grid_btn_wrapper">
                        <button className="card_grid_btn">
                            <NavLink className="navlink"
                                to="/detail" state={{ props: tutor}}
                            >
                                PROFILE
                            </NavLink></button>
                    </div>
                </div>
                {/* <div className="card-body"> */}
                {/* <h5 className="card-title font-weight-bold">{tutor.info}</h5> */}
                {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                {/* <NavLink to="/" className="btn btn-primary">Go somewhere</NavLink> */}
                {/* </div> */}
            </div>
            {/* </div> */}
        </>
    )
}

export default Card;