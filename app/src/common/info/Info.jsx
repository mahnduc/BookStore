import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './info.module.css';

const Info = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:3100/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        if (!res.ok) throw new Error('Không thể tải dữ liệu người dùng');
        return res.json();
      })
      .then(data => {
        if (data === -1) {
          setUser({});
          setEditedUser({});
        } else {
          const cleaned = {};
          for (const key in data) {
            cleaned[key] = data[key] === -1 ? '' : data[key];
          }
          setUser(cleaned);
          setEditedUser(cleaned);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [token, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    fetch('http://localhost:3100/api/user/modify', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedUser),
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể cập nhật thông tin');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setEditedUser(data);
        setSuccessMsg('Cập nhật thành công!');
        setIsEditing(false);
      })
      .catch(err => setError(err.message))
      .finally(() => setSaving(false));
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
    setSuccessMsg(null);
    setError(null);
  };

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.profileFrame}>
      <h2>Thông tin tài khoản</h2>
      <div className={styles.profileGrid}>
        <div className={styles.profileLeft}>
          {/* Avatar */}
          <div className={styles.avatarPlaceholder}>
            {editedUser.Avatar ? (
              <img src={editedUser.Avatar} alt="Avatar" className={styles.avatarImg} />
            ) : (
              <div className={styles.noAvatar}>Không có ảnh</div>
            )}
          </div>

          {/* FirstName */}
          <div className={styles.fieldGroup}>
            <label>Họ</label>
            <input
              type="text"
              name="FirstName"
              value={editedUser.FirstName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* LastName */}
          <div className={styles.fieldGroup}>
            <label>Tên</label>
            <input
              type="text"
              name="LastName"
              value={editedUser.LastName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* PhoneNumber */}
          <div className={styles.fieldGroup}>
            <label>Số điện thoại</label>
            <input
              type="text"
              name="PhoneNumber"
              value={editedUser.PhoneNumber || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* DateOfBirth */}
          <div className={styles.fieldGroup}>
            <label>Ngày sinh</label>
            <input
              type="date"
              name="DateOfBirth"
              value={editedUser.DateOfBirth ? editedUser.DateOfBirth.split('T')[0] : ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Gender */}
          <div className={styles.fieldGroup}>
            <label>Giới tính</label>
            <input
              type="text"
              name="Gender"
              value={editedUser.Gender || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* City */}
          <div className={styles.fieldGroup}>
            <label>Thành phố</label>
            <input
              type="text"
              name="City"
              value={editedUser.City || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Country */}
          <div className={styles.fieldGroup}>
            <label>Quốc gia</label>
            <input
              type="text"
              name="Country"
              value={editedUser.Country || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Buttons */}
          {isEditing ? (
            <div className={styles.profileActions}>
              <button onClick={handleSave} disabled={saving}>
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
              <button onClick={handleCancel} className={styles.cancelBtn}>Hủy</button>
            </div>
          ) : (
            <div className={styles.profileActions}>
              <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
            </div>
          )}

          {/* Success Message */}
          {successMsg && <div className={styles.success}>{successMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default Info;
