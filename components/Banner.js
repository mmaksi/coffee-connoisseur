import styles from "./banner.module.css";

const Banner = ({ buttonText, clickHandler }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee stores!</p>
      <button className={styles.button} onClick={clickHandler}>
        {buttonText}
      </button>
    </div>
  );
};

export default Banner;
