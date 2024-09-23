import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ThanhToan() {
    const location = useLocation();
    const data2 = location.state;
    const navigate = useNavigate();
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
    const CheckThanhToan = () => {
        if (isLogin == true){
            alert('Thanh toán thành công')
            axios.post('http://localhost:3030/bill/post',{
                name: data2.name,
                image: data2.image,
                price: data2.price
            })
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })
            navigate('/product')
        } else {
            alert('Bạn cần đăng nhập để sử dụng chức năng này!')
            navigate('/login');
        }
    }
    
    return (
        <div>
            <div className="row">
                <Navbar/>
            </div>
            <div className="container" style={{marginTop:'90px', border:'1px solid white', width:'800px', backgroundColor:'#f6efec', color:'black'}}>
                <div className="row" style={{marginTop:'40px', marginLeft:'20px', marginRight:'20px', backgroundColor:'#d8a8a1', color:"black"}}>
                    <div className="col-4" style={{marginLeft:'20px'}}>
                        <img src={data2.image} style={{height: '250px', width:'170px', paddingTop:'30px', paddingBottom:'30px'}} />
                    </div>
                    <div className="col-7">
                        {data2.name}
                    </div>
                    
                </div>
                <div className="row" style={{direction:'rtl', display:'flex'}}>
                    <div className="col-8" style={{marginRight:'20px'}}>
                        <p>Thành tiền: {data2.price}</p>
                    </div>
                    <div className="col-4">
                       
                    </div>
                </div>
                <div className="row" style={{direction:'rtl', display:'flex'}}>
                    <div className="col-9">
                        <button type="button" style={{marginRight:'20px', marginBottom:'40px'}} onClick={CheckThanhToan}>Thanh Toán</button>
                    </div>
                    <div className="col-3">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}