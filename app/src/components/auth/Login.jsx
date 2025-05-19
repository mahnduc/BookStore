import React, { useState } from 'react';
import styles from './auth.module.css';

function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3100/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
        onClose(); // Đóng modal sau khi đăng nhập thành công
      } else {
        alert(data.error || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error('Lỗi kết nối server:', err);
      alert('Lỗi kết nối server');
    }
  };

  return (
    <div className={styles.registerModalOverlay}>
      <div className={styles.registerModal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="modal-username">Tên đăng nhập:</label>
            <input
              type="text"
              id="modal-username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="modal-password">Mật khẩu:</label>
            <input
              type="password"
              id="modal-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
