import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./quantityBook.module.css";
import LoginModal from "../auth/Login";

function QuantityBook({ book, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const increment = () => {
    if (quantity < book.Stock) {
      setQuantity((q) => q + 1);
    }
  };

  const decrement = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      const data = {
        BookID: book.BookId,
        Quantity: quantity,
      };

      console.log("Body gửi đi:", data); // ✅ log dữ liệu gửi đi

      const response = await axios.post(
        "http://localhost:3100/api/cart/cartItem",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Đã thêm vào giỏ hàng thành công!");
      onClose();
    } catch (error) {
      const message =
        error.response?.data?.error || "Lỗi khi thêm vào giỏ hàng";
      alert("Lỗi: " + message);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalWindow}>
        <h2>{book.Title}</h2>
        <p><strong>Id:</strong> {book.BookId}</p>
        <p><strong>Tác giả:</strong> {book.name_author}</p>
        <p><strong>Nhà xuất bản:</strong> {book.name_publisher}</p>
        <p><strong>Thể loại:</strong> {book.book_type}</p>
        <p><strong>Giá:</strong> {book.Price?.toLocaleString()} VND</p>
        <p><strong>Tồn kho:</strong> {book.Stock}</p>

        <div className={styles.quantityControl}>
          <button onClick={decrement}>-</button>
          <span>{quantity}</span>
          <button onClick={increment}>+</button>
        </div>

        {quantity >= book.Stock && (
          <p className={styles.stockWarning}>Đã đạt số lượng tối đa tồn kho</p>
        )}

        <div className={styles.actions}>
          <button className={styles.button} onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

export default QuantityBook;