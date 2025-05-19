import React, { useState } from 'react';
import styles from './auth.module.css';

function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      };

      const res = await fetch('http://localhost:3100/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Đăng ký thất bại');
      } else {
        alert('Đăng ký thành công');
        onClose();
      }
    } catch (err) {
      setError('Lỗi máy chủ');
    }
  };

  return (
    <div className={styles.registerModalOverlay}>
      <div className={styles.registerModal}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2>Đăng ký</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Mật khẩu:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Xác nhận mật khẩu:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Họ:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Tên:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label>Số điện thoại:</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>

          <button type="submit">Đăng ký</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;