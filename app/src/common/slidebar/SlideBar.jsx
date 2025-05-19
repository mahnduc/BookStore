import styles from "./slidebar.module.css";

function SlideBar({ onSelect }) {
  return (
    <div className={styles.sidebar}>
      <button className={styles.button} onClick={() => onSelect("info")}>
        Thông Tin Cá Nhân
      </button>
      <button className={styles.button} onClick={() => onSelect("cart")}>
        Giỏ Hàng
      </button>
      <button className={styles.button} onClick={() => onSelect("history")}>
        Lịch Sử Mua Hàng
      </button>
    </div>
  );
}

export default SlideBar;