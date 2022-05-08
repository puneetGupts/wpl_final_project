import React, { useState } from "react";
import styles from "./style.module.scss";

function Banner({}) {
  const localstorage_user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <h2 className={styles.banner_title}>Welcome Back, {localstorage_user.username}</h2>
      <div className={styles.word_map}></div>
    </>
  );
}

export default Banner;
