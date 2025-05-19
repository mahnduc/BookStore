import React from "react";
import { Link } from "react-router-dom";
import styles from "./mockup.module.css";

function MockUp() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shhhh!</h1>
      <p className={styles.message}>Tính năng này sắp ra mắt</p>
      <Link to="/" className={styles.homeLink}>
        Quay lại trang chủ
      </Link>
    </div>
  );
}

export default MockUp;