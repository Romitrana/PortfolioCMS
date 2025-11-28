import styles from './Loader.module.css';

const Loader = ({ size = 32 }) => (
  <div className={styles.loaderWrapper}>
    <div
      className={styles.loader}
      style={{ width: size, height: size }}
      aria-label="Loading..."
    />
  </div>
);

export default Loader;
