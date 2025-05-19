import { Routes, Route } from 'react-router-dom';
import './styles/global.css';
import styles from './app.module.css';

import Navbar from './layout/navbar/Navbar';
import Footer from './layout/footer/Footer';

import HomePage from './pages/homepage/HomePage';
import BookStore from './pages/bookstore/BookStore';
import Profile from './pages/profile/Profile';
import MockUp from './components/mockup/mockup';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookstore" element={<BookStore />} />
          <Route path='/profile' element={<Profile /> } />
          <Route path='/genres' element={<MockUp />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
