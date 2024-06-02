import styles from "./Ghost.module.css";

export default function Ghost() {
  return (
    <>
      <img
        className={styles.Ghost1}
        aria-hidden
        src="./images/ghosts/ghost1.svg"
      ></img>
      <img
        className={styles.Ghost2}
        aria-hidden
        src="./images/ghosts/ghost2.svg"
      ></img>
    </>
  );
}
