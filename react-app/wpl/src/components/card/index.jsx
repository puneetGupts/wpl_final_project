import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import styles from "./style.module.scss";
import Ratings from '../ratings';
function Card({ tutor, favTutors, status, onChildClick }) {
    const [isFavorite, setIsFavorite] = useState(false);
    // status=status;
    // console.log(status==="homepage");
    // const [favTutorsList, setfavTutorsList] = useState([]);
    // setfavTutorsList(favTutors);

    console.log(favTutors);
    useEffect(() => {
        changeText(tutor);
        // reloadAsync();
    }, [])

    // const reloadAsync = async() => {
    //     if(isFavorite && status==="favorite"){
    //     window.location.reload();}
    // }

    const changeText = async (data) => {
        // let storageTutor = JSON.parse(localStorage.getItem("favtutor"));
        let storageTutors = favTutors;
        // console.log("The storage data are :"+storageTutors);
        if (storageTutors !== null) {
            const tutor = storageTutors.filter((e) => { return e._id == data._id });

            if (tutor.length > 0) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        }
    };

    // useEffect(() => {
    //     changeText(tutor);
    // }, []);
    // const changeText=(data)=>{
    //     console.log("The storage data are :"+ (favTutorsList));
    //         if (favTutorsList !== null) {
    //             const tutor = favTutorsList.filter((e) => e._id == data._id);

    //             if (tutor.length > 0) {
    //                 setIsFavorite(true);
    //             } else {
    //                 setIsFavorite(false);
    //             }
    //         }
    //     };



    return (
        <>
            <div className={styles.card_grid}>
                <div className={styles.card_grid_header}>
                    <div className={styles.card_grid_img}>
                        {/* <img src= {tutor.avatar} className={styles.img} alt={tutor.avatar} /> */}
                        <img src={`./${tutor.avatar}`} className={styles.img} alt={tutor.avatar} />
                    </div>
                    <div className={styles.card_grid_info}>
                        <h4 className={styles.card_grid_title}>{tutor.name}</h4>
                        <span className={styles.card_grid_location}>
                            <img className={styles.card_grid_badge} src={tutor.badge} />
                            {tutor.location}
                        </span>
                        <div className={styles.card_grid_certificate}>
                            {tutor.chats && (
                                <div className={styles.info_card}>{tutor.chats}</div>
                            )}
                            {tutor.teacher && (
                                <div className={styles.info_card}>{tutor.teacher}</div>
                            )}
                        </div>
                    </div>
                    <div
                        className={styles.card_fav_action}
                        onClick={() => {
                            onChildClick(tutor, isFavorite, status);
                            setIsFavorite(!isFavorite);
                        }}
                    >
                        {isFavorite ? "Delete Favorite" : "Add Favorite"}
                    </div>
                </div>
                <div className={styles.card_grid_body}>
                    <p className={styles.card_grid_text}>{tutor.info}</p>

                    <div className={styles.card_grid_btn_wrapper}>
                        {/* <NavLink className="navlink"
                                to="/detail" state={{props: tutor}}
                            > */}
                        <div className={styles.card_grid_reviews_wrapper}><Ratings
                            value={tutor.rating}
                            text={`${tutor.reviews} reviews`}
                        /></div>
                        <button className={styles.card_grid_btn}>

                            <Link to={`tutors/${tutor._id}`} className="navlink">
                                PROFILE
                            </Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;