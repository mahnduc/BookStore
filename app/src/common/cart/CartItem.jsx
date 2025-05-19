import React from 'react';
import styles from './CartItem.module.css';

const CartItem = ({ item, formatCurrency, onDelete, onSelectChange, isSelected }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectChange(item.CartItemId, e.target.checked)}
        />
      </div>
      <div className={styles.details}>
        <h3 className={styles.title}>{item.BookTitle}</h3>
        <p className={styles.info}>Số lượng: {item.Quantity}</p>
        <p className={styles.info}>Giá mỗi cuốn: {formatCurrency(item.BookPrice)}</p>
        <p className={styles.info}>Ngày thêm: {new Date(item.AddedAt).toLocaleString('vi-VN')}</p>
      </div>
      <div className={styles.actions}>
        <p className={styles.total}>
          {formatCurrency(item.BookPrice * item.Quantity)}
        </p>
        <div className={styles.buttons}>
          <button className={styles.deleteBtn} onClick={() => onDelete(item.CartItemID)}>
            🗑 Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
