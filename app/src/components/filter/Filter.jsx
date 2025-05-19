import { useEffect, useState } from 'react';
import styles from './filter.module.css';

function Filter({ onFilter }) {
  const [typeBooks, setTypeBooks] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3100/api/typebook')
      .then((res) => res.json())
      .then((data) => setTypeBooks(data))
      .catch((err) => console.error('Lỗi lấy dữ liệu TypeBook:', err));
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = async () => {
    if (selectedTypes.length === 0) {
      alert('Vui lòng chọn ít nhất một thể loại sách!');
      return;
    }

    try {
      const res = await fetch('http://localhost:3100/api/getBooksByTypeBookIds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeBookIds: selectedTypes }),
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        onFilter(data); // Gửi dữ liệu về BookStore
      } else {
        console.error('Kết quả không hợp lệ:', data);
        onFilter([]); // Xoá sách nếu lỗi
      }
    } catch (err) {
      console.error('Lỗi khi lọc sách:', err);
      onFilter([]);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        ☰ {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <div className={styles.dropdownContent}>
          {typeBooks.map((type) => (
            <label key={type.TypeBookID} className={styles.checkboxItem}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedTypes.includes(type.TypeBookID)}
                onChange={() => handleCheckboxChange(type.TypeBookID)}
              />
              {type.TypeBookName}
            </label>
          ))}
          <button onClick={handleSearch} className={styles.searchButton}>
            Tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
}

export default Filter;
