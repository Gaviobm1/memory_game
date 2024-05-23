import styles from "../../../styles/game.module.css";

export default function LoadingIcon({ photoSrc }) {
  return (
    <div className={styles.loadingContainer}>
      <img className={styles.loadingStar} src={photoSrc} />
    </div>
  );
}
