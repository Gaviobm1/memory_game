import styles from "../../../styles/game.module.css";

function Card({ img, name, handleScoreChange }) {
  return (
    <div className={styles.gameBoardCard} onClick={handleScoreChange}>
      <img src={img} alt="" className={styles.gameBoardCardImg} />
      <p className={styles.gameBoardCardName}>{name}</p>
    </div>
  );
}

export default Card;
