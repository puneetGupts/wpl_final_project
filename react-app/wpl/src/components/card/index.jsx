import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import styles from "./style.module.scss";

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
            <div className={styles.card_grid}>
                <div className={styles.card_grid_header}>
                    <div className={styles.card_grid_img}>
                        <img src={tutor.avatar} className={styles.img} alt={tutor.avatar} />
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
                            onChildClick(tutor);
                            setIsFavorite(!isFavorite);
                        }}
                    >
                        {isFavorite ? "Delete Favorite" : "Add Favorite"}
                    </div>
                </div>
                <div className={styles.card_grid_body}>
                    <p className={styles.card_grid_text}>{tutor.info}</p>
                    <div className={styles.card_grid_btn_wrapper}>
                        <button className={styles.card_grid_btn}>
                            <NavLink className="navlink"
                                to="/detail"  state={{props: tutor}}
                            >
                                PROFILE
                            </NavLink></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;