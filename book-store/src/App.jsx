import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import User from './pages/User';
import VanHocVietNam from './pages/VanHocVietNam';
import VanHocNuocNgoai from './pages/VanHocNuocNgoai';
import TruyenTranh from './pages/TruyenTranh';
import Manga from './pages/Manga';
import Detail from './components/BookDetail';
import ChoThanhToan from './pages/ChoThanhToan';
import TatCaSach from './pages/TatCaSach';
import ThanhToan from './pages/ThanhToan';
{/* admin */}
import DashBroad from './admin/dashbroad';
import AddBook from './admin/AddBook';
import PatchData from './admin/PatchBook';
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        {/* User */}
        <Route path='/' element={<HomePage/>} /> 
        <Route path='product' element={<TatCaSach/>} />
        <Route path='register' element={<Register/>} />
        <Route path='login' element={<Login/>} />
        <Route path='user' element={<User/>} />
        <Route path='/product/vanhocvietnam' element={<VanHocVietNam/>} />
        <Route path='/product/vanhocnuocngoai' element={<VanHocNuocNgoai/>} />
        <Route path='/product/truyentranh' element={<TruyenTranh/>} />
        <Route path='/product/manga' element={<Manga/>} />
        <Route path='/detail' element={<Detail/>} />
        <Route path='/payment' element={<ThanhToan/>} />
        {/* admin */}
        <Route path='/admin' element={<DashBroad/>} />
        <Route path='/addbook' element={<AddBook/>} />
        <Route path='/patch' element={<PatchData/>} />
      </Routes>
    </div>
  )
}

export default App;
