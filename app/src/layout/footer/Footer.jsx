import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>Về Chúng Tôi</h3>
          <p>
            Chào mừng bạn đến với cửa hàng sách trực tuyến của chúng tôi! Chúng tôi cung cấp đa dạng các loại sách với giá cả cạnh tranh và dịch vụ tận tâm.
          </p>
        </div>
        <div className={styles.column}>
          <h3>Liên Kết Nhanh</h3>
          <ul>
            <li><Link to="/">Trang Chủ</Link></li>
            <li><Link to="/books">Sách</Link></li>
            <li><Link to="/genres">Thể Loại</Link></li>
            <li><Link to="/contact">Liên Hệ</Link></li>
            <li><Link to="/faq">Hỏi Đáp</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Thông Tin Liên Hệ</h3>
          <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
          <p>Email: info@examplebookstore.com</p>
          <p>Điện thoại: (028) 123 456 789</p>
        </div>
        <div className={styles.column}>
          <h3>Theo Dõi Chúng Tôi</h3>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Trang Web Bán Sách Của Bạn. Đã đăng ký bản quyền.</p>
        <p>
          <Link to="/privacy-policy">Chính Sách Bảo Mật</Link> |{" "}
          <Link to="/terms-of-service">Điều Khoản Dịch Vụ</Link>
        </p>
      </div>
    </footer>
  );
}