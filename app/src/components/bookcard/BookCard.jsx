import React, { useState, useEffect } from "react";
import styles from "./bookcard.module.css";
import QuantityBook from "./QuantityBook";

function BookCard({ book }) {
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  useEffect(() => {
    console.log("Dữ liệu sách nhận từ API:", book);
  }, [book]);

  const handleAddClick = () => setShowQuantityModal(true);
  const handleClose = () => setShowQuantityModal(false);

  const handleConfirm = (quantity) => {
    console.log(`Thêm ${quantity} sản phẩm của ${book.Title}`);
    setShowQuantityModal(false);
  };

  // Dùng fallback nếu thuộc tính chính không tồn tại
  const author = book.AuthorName || book.name_author || "Không rõ";
  const publisher = book.PublisherName || book.name_publisher || "Không rõ";
  const type = book.TypeBookName || book.book_type || "Không rõ";

  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.title}>{book.Title}</h2>
        <p className={styles.detail}><strong>Tác giả:</strong> {author}</p>
        <p className={styles.detail}><strong>Nhà xuất bản:</strong> {publisher}</p>
        <p className={styles.detail}><strong>Thể loại:</strong> {type}</p>
        <p className={styles.price}><strong>Giá:</strong> {book.Price?.toLocaleString()} VND</p>
        <p className={styles.detail}><strong>Tồn kho:</strong> {book.Stock}</p>
        <button className={styles.button} onClick={handleAddClick}>
          Thêm vào giỏ hàng
        </button>
      </div>

      {showQuantityModal && (
        <QuantityBook
          book={book}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

export default BookCard;
