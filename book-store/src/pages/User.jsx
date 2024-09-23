import Navbar from '../components/Navbar'
import Avata1 from '../assets/avata/avata1.jpg'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarDonMua from '../components/NavbarDonMua';
import '../css/user.css';
import axios from 'axios';

function TaiKhoan() {
    return (
        <form>
            <div className="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"/>
            
        </div>
        <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{marginTop: '20pxp'}}>Submit</button>
        </form>
    );
}
function DonMua(props) {
    return (
        <div>
            <NavbarDonMua />
        </div>
    );
}
{/*
function DonMua() {
    const [tatca, settatca] = useState(true)
    const [chothanhtoan, setchothanhtoan] = useState('') 
    const [hoanthanh, sethoanthanh] = useState('')
    const [dahuy, setdahuy] = useState('')
    return (
        <div className='container' style={{marginTop:'10px'}}>
            <div className='row'>
                <button type='button' className='col btn btn-outline-primary' onClick={() => {
                    settatca(true)
                    setchothanhtoan(false)
                    sethoanthanh(false)
                    setdahuy(false)
                }}>Tất cả</button>
                <button type='button' className='col btn btn-outline-primary' onClick={() => {
                    settatca(false)
                    setchothanhtoan(true)
                    sethoanthanh(false)
                    setdahuy(false)
                }} >Chờ thanh toán</button>
                <button type='button' className='col btn btn-outline-primary' onClick={() => {
                    settatca(false)
                    setchothanhtoan(false)
                    sethoanthanh(true)
                    setdahuy(false)
                }} >Hoàn thành</button>
                <button type='button' className='col btn btn-outline-primary' onClick={() => {
                    settatca(false)
                    setchothanhtoan(false)
                    sethoanthanh(false)
                    setdahuy(true)
                }} >Đã hủy</button>
            </div>
            <div className='row'>
                { 
                    tatca ? <TatCa/> : null ||
                    chothanhtoan ? <ChoThanhToan/> : null ||
                    hoanthanh ? <HoanThanh/> : null ||
                    dahuy ? <DaHuy/> : null
                }
            </div>
        </div>
    );
}
*/}
function User(){
    const [trangthai, setTrangthai] = useState('')
    const isGoal = trangthai
    const SignOut = () => {
        sessionStorage.clear()
        window.location.reload()
    }
    const location = useLocation();
    const data2 = location.state;

    const getDataUser = sessionStorage.getItem('id')
    console.log(getDataUser)
    /*
    const datauser = ()=> {axios.get('http://localhost:3030/auth/datauser/:id',getDataUser)
    .then(()=>{
        console.log()
    })
    }
    */
    return (
        <div>
            <Navbar />
            <div className='row profile' >
                <div style={{width:'100%', height:'62px'}}></div>
                <div className="card-container">
                    <span className="pro">PRO</span>
                    <img className="round" src={Avata1} style={{height:'260px', width:'260px'}} alt="user" />
                    <h3>Mạnh Đức</h3>
                    {/*<h6>New York</h6>*/}
                    <p>State</p>
                    <div className="buttons">
                        <button className="btn btn-outline-primary" type='button' onClick={() => setTrangthai(true)} style={{width: '100%',marginLeft:'7px' }}> 
                            Tài khoản
                        </button>
                        <br/>
                        <button className="btn btn-outline-primary" type='button' onClick={() => setTrangthai(false)} style={{width: '100%', marginTop:'20px',marginLeft:'7px' }}>
                            Lịch sử mua hàng
                        </button>
                        <br/>
                        <button className="btn btn-outline-danger" type='button'style={{marginTop:'20px'}} onClick={SignOut} >
                            <Link to='/login' style={{textDecoration:'none', color:"white"}}>Đăng xuất</Link>
                        </button>
                    </div>
                    <div className="skills">
                        <h6>Điểm tích lũy</h6>
                        <ul>
                            <li>Chuyên gia săn sale</li>
                        </ul>
                    </div>
                </div>
                <div className='container col'>
                    
                    { isGoal ? <TaiKhoan/> : <DonMua/> }
                    
                    {/*name={data2.name} image={data2.image} price={data2.price}*/}
                </div>
            </div>
            
        </div>
    );
}
{/*
function TatCa() {
    return(
        <div>
            <h2>Tat ca</h2>
        </div>
    );
}
function ChoThanhToan() {
    return (
        <div>
            <h2>Cho thanh toan</h2>
        </div>
    )
}
*/}
export default User;