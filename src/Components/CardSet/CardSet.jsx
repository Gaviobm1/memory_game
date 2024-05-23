import styles from "../../../styles/game.module.css";
import Card from "../Card/Card";

function CardSet({ set, handleScoreChange }) {
  return (
    <div className={styles.gameBoard}>
      {set.map((item, index) => (
        <Card
          name={item.name}
          img={item.sprites.front_default}
          key={index}
          handleScoreChange={() => handleScoreChange(item.name)}
        />
      ))}
    </div>
  );
}

export default CardSet;
