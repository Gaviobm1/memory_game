import styles from "../../../styles/game.module.css";

export default function Heading({ title, children }) {
  return (
    <div>
      <h1 className={styles.gameHeaderTitle}>{title}</h1>
      <p>{children}</p>
    </div>
  );
}
