//import StoreIcon from '../assets/whale.svg'
import Voucher from '../assets/webstore/voucher.svg'
import Delivery from '../assets/webstore/fastdelivery2.svg'
import User from '../assets/webstore/account.svg'
import Cart from '../assets/webstore/cart3.svg'
import Menu from'../assets/webstore/more.svg'
import Home from '../assets/webstore/home.svg'
import Avata from '../assets/webstore/avata-login.svg'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const NotLogIn = () => {
    return (
        <li className='nav-item dropdown'>
            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={User} style={{height:'30px', width:'30px'}} />
            </a>
            <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to='/register'>Sign Up</Link></li>
                <li><Link className="dropdown-item" to='/login'>Log In</Link></li>
            </ul>
        </li>
      );
}
const LogIned = () => {
    const empty = {
        name: '',
        image: '',
        price: ''
    }
    return (
        <li className='nav-item nav-link active'>
            <Link to='/user' state={empty}>
                    <img src={Avata} style={{height:'35px', width:'35px'}} />
            </Link>
        </li>
      );
}
function Navbar() {
    const [login, setLogin] = useState('')
    useEffect(() => {
        const checkLogin = sessionStorage.getItem("token")
        //alert(`${checkLogin}`)
        if (checkLogin === null){
            setLogin(false)
        }else {
            setLogin(true)
        }
    }, [])
    
    const isLogIn = login
    return (
        <div>
            <nav className='bg-body-tertiary' style={{paddingTop:'8px', position:'fixed', width:'100%'}}>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to='/'>
                            <img src={Home} style={{height:'30px', width:'30px'}} />
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" >
                            <img src={Menu} style={{height:'30px', width:'30px'}} />
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to='/product'>Tổng hợp</Link></li>
                            <li><Link className="dropdown-item" to='/product/vanhocvietnam'>Văn học Việt Nam</Link></li>
                            <li><Link className="dropdown-item" to='/product/vanhocnuocngoai'>Văn học nước ngoài</Link></li>
                            <li><Link className="dropdown-item" to='/product/truyentranh'>Truyện tranh</Link></li>
                            <li><Link className="dropdown-item" to='/product/manga'>Manga-Comic</Link></li>
                        </ul>
                    </li>
                    <li className='nav-item'>
                    <div className="container-fluid">
                        <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to='/product'>
                            <img src={Cart} style={{height:'30px', width:'30px'}} />
                        </Link>
                    </li>
                    
                    <li className='nav-item'>
                        {isLogIn ? <LogIned/> : <NotLogIn/>}
                    </li>

                </ul>
            </nav>
        </div>
    );
}

export default Navbar;