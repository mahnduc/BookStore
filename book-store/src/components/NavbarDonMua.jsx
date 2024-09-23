import { useState } from "react";
import ChoThanhToan from "../pages/ChoThanhToan";
import LichSuMuaHang from "../pages/LichSuMuaHang";
import ThanhToan from "../pages/ThanhToan";
export default function NavbarDonMua(props) {
    const [datmua, setDatmua] = useState('')
    const isDatMua = datmua
    return (
        <div>
            <div className="container-fluid row text-center">
                <button className="btn btn-primary" style={{marginTop:'20px'}}>Lịch sử mua hàng</button>
                {/*<button className="col btn btn-primary" style={{marginTop:'5px', marginRight:'5px'}} onClick={() => {setDatmua(true)}} >Lịch sử mua hàng</button>*/}
                {/*<button className="col btn btn-primary" style={{marginTop:'5px', marginLeft:'5px'}} onClick={() => {setDatmua(false)}} >Chờ thanh toán</button>*/}
            </div>
            <div className="row">
                {/*{ isDatMua ? <LichSuMuaHang/> : <ChoThanhToan name={props.name} price={props.price} /> }*/}
                <LichSuMuaHang />
            </div>
        </div>
    );
}