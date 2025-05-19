import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../../components/bookcard/BookCard";
import Filter from "../../components/filter/Filter";
import axios from "axios";
import styles from "./bookstore.module.css";

function BookStore() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("q");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const endpoint = keyword
          ? `http://localhost:3100/api/search?q=${encodeURIComponent(keyword)}`
          : `http://localhost:3100/api/books`;

        const response = await axios.get(endpoint);

        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sách:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [keyword]);

  useEffect(() => {
    const timeout = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Nhận dữ liệu lọc từ component Filter
  const handleFilterResult = (filteredBooks) => {
    setBooks(filteredBooks);
    setShowWelcome(false); // ẩn dòng chào mừng khi lọc
  };

  return (
    <div className={styles.container}>
      <section className={styles.fullWidthFilter}>
        <Filter onFilter={handleFilterResult} />
      </section>
      {showWelcome && (
        <h1 className={`${styles.title} ${styles.fadeOut}`}>BookStore</h1>
      )}

      {keyword ? (
        <p className={styles.description}>
          Kết quả tìm kiếm cho: "{keyword}"
        </p>
      ) : (
        showWelcome && (
          <p className={`${styles.description} ${styles.fadeOut}`}>
            Chào mừng bạn đến với cửa hàng sách của chúng tôi!
          </p>
        )
      )}

      {loading ? (
        <p>Đang tải dữ liệu sách...</p>
      ) : books.length > 0 ? (
        <div className={styles.grid}>
          {books.map((book) => (
            <BookCard key={book.BookID} book={book} />
          ))}
        </div>
      ) : (
        <p>Không tìm thấy sách phù hợp.</p>
      )}
    </div>
  );
}

export default BookStore;
