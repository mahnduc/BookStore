import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1>Chào mừng đến với <span className={styles.highlight}>BookStore</span></h1>
        <p>
          Khám phá hàng ngàn tựa sách hấp dẫn, từ văn học kinh điển đến sách kỹ năng và học thuật.
          Trải nghiệm mua sắm dễ dàng và nhanh chóng.
        </p>
        <div className={styles.actions}>
          <Link to="/bookstore" className={styles.btn}>Khám Phá Sách</Link>
          <Link to="/signup" className={styles.btnOutline}>Đăng Ký Ngay</Link>
        </div>
      </div>

      {/* About Me section */}
      <div className={styles.aboutMe}>
        <h2>Giới thiệu về BookStore</h2>
        <p>
          BookStore là nền tảng sách trực tuyến hàng đầu, nơi bạn có thể tìm thấy hàng ngàn đầu sách đa dạng từ mọi thể loại.
          Với giao diện thân thiện, hiệu suất mượt mà và trải nghiệm người dùng được tối ưu, chúng tôi cam kết mang lại cho bạn hành trình đọc sách thú vị và thuận tiện nhất.
        </p>
        <p>
          Hãy khám phá, tìm kiếm và mua sách một cách dễ dàng chỉ với vài cú nhấp chuột. Chúng tôi không chỉ bán sách – chúng tôi truyền cảm hứng đọc cho cộng đồng.
        </p>
      </div>
    </header>
  );
}
