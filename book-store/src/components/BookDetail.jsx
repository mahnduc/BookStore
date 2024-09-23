import { useState } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Dora from '../assets/book/doraemon/doraemon1.jpg'
import '../css/bookdetail.css'
import { Link } from "react-router-dom";
import ChoThanhToan from "../pages/ChoThanhToan";
export default function Detail() {
    let [soluong, setsoluong] = useState(1)
    if (soluong < 1) {
        setsoluong(1)
    }
    
    const location = useLocation();
    const data = location.state;

    const thanhtien = data.price * soluong

    const data2 = {
        name: data.name,
        image: data.image,
        price: thanhtien,
    }
    
    return (
        <div>
            <div className="row" >
                <Navbar/>
            </div>
            <div className="row" style={{marginTop:'140px'}}>
                <div className="container " style={{display:'grid', gridTemplateColumns:'20% 60% 20%'}}>
                    <div style={{gridColumn:'2', border:'1px solid white', display:'flex'}}>
                        <div>
                            <img src={data.image} className="img-size" />
                        </div>
                        <div className="content">

                            <div className="title"> {data.name} </div>
                            <div style={{padding:'30px'}}>
                                <div style={{height:'150px'}}>
                                    Info
                                </div>
                            </div>
                            <div style={{display:'flex'}} className="container" >
                                <div style={{border:'1px solid white', width:'70px', color:'black', backgroundColor:'white'}} className="text-center">{thanhtien}</div>
                                <div className="soluong" style={{display:'flex'}}>
                                    <button onClick={() => setsoluong((soluong) => soluong - 1)} style={{marginLeft:'10px', marginRight:'10px', height:'35px', width:'35px', padding:'0'}} className="btn btn-outline-primary" >-</button>
                                    <div style={{ backgroundColor:'gray', width:'60px'}} className="text-center">{soluong}</div>
                                    <button onClick={() => setsoluong((soluong) => soluong + 1)} style={{marginLeft:'10px', marginRight:'10px', height:'35px', width:'35px', padding:'0'}} className="btn btn-outline-primary" >+</button>
                                </div>
                            <div>
                                <Link to="/payment" state={data2}><button>Thêm vào giỏ hàng</button></Link>
                                {/* /payment */}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}