import styles from './homepage.module.css';
import Header from '../../layout/header/Header';

export default function HomePage() {
  return (
    <div className={styles.homepage}>
      <Header />
      <h2>Featured Books</h2>
      <div className={styles.books}>
        <div className={styles.bookCard}>Book 1</div>
        <div className={styles.bookCard}>Book 2</div>
      </div>
    </div>
  );
}
