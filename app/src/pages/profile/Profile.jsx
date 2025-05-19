import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SlideBar from "../../common/slidebar/SlideBar";
import Info from "../../common/info/Info";
import PurchaseHistory from "../../common/purchasehistory/PurchaseHistory";
import CartPage from "../../common/cart/CartPage";
import styles from "./profile.module.css";

function Profile() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultSection = query.get("section") || "info";

  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    setActiveSection(defaultSection);
  }, [defaultSection]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SlideBar onSelect={setActiveSection} />
      </div>
      <div className={styles.content}>
        {activeSection === "info" && <Info />}
        {activeSection === "cart" && <CartPage />}
        {activeSection === "history" && <PurchaseHistory />}
      </div>
    </div>
  );
}

export default Profile;
