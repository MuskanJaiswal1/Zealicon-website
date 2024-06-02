import React from "react";
import styles from "./Zeal.module.css";
import { useSelector } from "react-redux";

const Zeal = () => {
  const { zealId, userData } = useSelector((state) => state.allReducers);
  return (
    <div className={styles.formCont}>
      <div className={styles.nameWrap}>
        <span>👋 Hi, {userData?.name} </span>
      </div>
      <a className={styles.imgWrap} href={userData?.secure_url}>
        <img src={userData?.secure_url} alt="" />
      </a>
      <div className={styles.zealWrap}>
        <p>Your Zeal ID is</p>
        <div className={styles.header}>{zealId}</div>
      </div>
    </div>
  );
};

export default Zeal;
