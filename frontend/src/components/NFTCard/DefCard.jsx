import React from "react";
import styles from "./Card.module.css";

const Cardnft = (props) => {
  return (
    <div className={`${styles["nft-default-card"]} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Cardnft;