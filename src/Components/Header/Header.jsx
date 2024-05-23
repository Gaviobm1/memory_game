import Heading from "../Heading/Heading";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import styles from "../../../styles/game.module.css";

export default function Header({ title, children, current, best }) {
  return (
    <div className={styles.gameHeader}>
      <Heading title={title}>{children}</Heading>
      <ScoreBoard current={current} best={best} />
    </div>
  );
}
