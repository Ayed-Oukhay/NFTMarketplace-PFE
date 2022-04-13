import React from "react";
import image from "../../assets/img/ryan.jpg";
import styles from "./User.module.css";

const User = (props) => {
  return (
    <div className={styles.user}>
      <img src={image} alt="Profile" />
      <span>
        Creation of <span className={styles.username}>Test User</span>
      </span>
    </div>
  );
};

export default User;