import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './purchaseHistory.module.css';

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3100/api/order/history', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setHistory(res.data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi lấy lịch sử mua hàng:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className={styles.message}>Đang tải lịch sử mua hàng...</p>;

  if (history.length === 0) return <p className={styles.message}>Chưa có đơn hàng nào</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lịch sử mua hàng</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sách</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Ngày đặt</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.Title}</td>
              <td>{item.Quantity}</td>
              <td>{item.PriceAtPurchase.toLocaleString('vi-VN')} ₫</td>
              <td>{new Date(item.OrderDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;
