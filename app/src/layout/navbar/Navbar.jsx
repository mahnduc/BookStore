import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./navbar.module.css";
import RegisterModal from "../../components/auth/Register";
import LoginModal from "../../components/auth/Login";
import useAuth from "../../hooks/context/useAuth";

import { FaUserCircle, FaShoppingCart, FaHome, FaBook, FaThLarge } from "react-icons/fa";

export default function Navbar() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleOpenLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleCloseRegister = () => setShowRegisterModal(false);
  const handleCloseLogin = () => setShowLoginModal(false);

  const handleLogin = (token) => {
    login(token);
    handleCloseLogin();
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/bookstore?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>BookStore</Link>
          <div className={styles.iconLinks}>
            <Link to="/" className={styles.icon} title="Trang Chủ" aria-label="Trang Chủ">
              <FaHome size={22} />
            </Link>
            <Link to="/bookstore" className={styles.icon} title="Sách" aria-label="Sách">
              <FaBook size={22} />
            </Link>
            <Link to="/genres" className={styles.icon} title="Thể Loại" aria-label="Thể Loại">
              <FaThLarge size={22} />
            </Link>
          </div>
        </div>

        <div className={styles.center}>
          <input
            type="text"
            placeholder="Tìm kiếm sách..."
            className={styles.searchInput}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className={styles.authButtons}>
          {!user ? (
            <>
              <button className={styles.btn} onClick={handleOpenRegister}>
                Đăng Ký
              </button>
              <button className={styles.btnOutline} onClick={handleOpenLogin}>
                Đăng Nhập
              </button>
            </>
          ) : (
            <>
              <Link
                to="/profile?section=cart"
                className={styles.icon}
                title="Giỏ Hàng"
              >
                <FaShoppingCart size={22} />
              </Link>
              <Link
                to="/profile"
                className={styles.icon}
                title={user.email}
              >
                <FaUserCircle size={24} />
              </Link>
              <button className={styles.btnOutline} onClick={logout}>
                Đăng Xuất
              </button>
            </>
          )}
        </div>
      </nav>

      {showRegisterModal && <RegisterModal onClose={handleCloseRegister} />}
      {showLoginModal && (
        <LoginModal onClose={handleCloseLogin} onLogin={handleLogin} />
      )}
    </>
  );
}
