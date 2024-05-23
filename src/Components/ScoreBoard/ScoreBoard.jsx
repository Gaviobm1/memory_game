import styles from "../../../styles/game.module.css";

export default function ScoreBoard({ current, best }) {
  return (
    <div className={styles.gameScore}>
      <h2>
        Score: <span className={styles.gameScoreNum}>{current}</span>
      </h2>
      <h2>
        Best Score: <span className={styles.gameScoreNum}>{best}</span>
      </h2>
    </div>
  );
}
