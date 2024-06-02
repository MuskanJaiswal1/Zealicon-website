import styles from "./Button.module.css";

export default function Button({ type, text, action, size=3.5 }) {
  return (
    <div role="button" onClick={action} className={styles.buttonCont}>
      <img
        src={
          type === "small"
            ? "./images/smallButtonBg.svg"
            : "./images/largeButtonBg.svg"
        }
        style={{ height: `${size}rem` }}
        aria-hidden
      />
      <p>{text}</p>
    </div>
  );
}
