import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Dora1 from '../assets/book/doraemon/doraemon1.jpg'
import AppItem from '../assets/webstore/market.svg'
import '../css/book.css'

function Book(props) {
    const dataBook = {
      image: props.image,
      price: props.price,
      name: props.name
    }
    const navigate = useNavigate()
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
    const isLogin = login
    const handleClick = () => {
      if (isLogin == false) {
        alert('Bạn cần đăng nhập để sử dụng tính năng này!')
        navigate('/login')
      }else {
        alert('Chúc bạn một ngày tốt lành')
      }
    }
    return (
        <div className='container-fluid row align-items-end'style={{display:'flex', border:'1px solid white', backgroundColor:'lightblue'}} >
          <img className='col-3' src={props.image} style={{ height:'270px', width:'230px'}} />
          <div className='col-4' style={{color:'black', backgroundColor:'lightblue', marginBottom:'20px'}}>
            <p className='row' style={{fontWeight:'bold', fontSize:'32px'}}>{props.name}</p>
            <p >{props.price}</p> 
            <button className='btn btn-light' onClick={handleClick}>
              <Link to='/detail' state={dataBook}>Mua</Link>
            </button>
          </div>
        </div>
    );
}

export default Book;