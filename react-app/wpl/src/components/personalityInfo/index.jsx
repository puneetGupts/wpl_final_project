import React, { useState } from "react";
import styles from "./style.module.scss";

function PersonalityInfo({ about, language,teachingStyle,workEx,education,certification }) {
  return (
    <div className={styles.list_wrapper}>
      <div className={styles.list}>
        <h3>About Me</h3>
        <p>{about}</p>
      </div>
      <div className={styles.list}>
        <h3>Language</h3>
        <p className={styles.language}>{language}</p>
      </div>
      <div className={styles.list}>
        <h3>Teaching Style</h3>
        <p >{teachingStyle}</p>
      </div>
      <div className={styles.list}>
        <h3>Work Experience</h3>
        <p >{workEx}</p>
      </div>
      <div className={styles.list}>
        <h3>Education</h3>
        <p >{education}</p>
      </div>
      <div className={styles.list}>
        <h3>Certifications</h3>
        <p >{certification}</p>
      </div>
    </div>
  );
}

export default PersonalityInfo;
