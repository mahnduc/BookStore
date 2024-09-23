import { Link } from "react-router-dom";
import Navbar from "./Navbar";
export default function ProductLink () {
    return (
        <div>
            <div className="col" style={{marginTop:'62px'}}>
                <Link to='/product'><button type="button" className="btn btn-light" style={{width:'80%', marginTop:'10px', marginLeft:'20px'}}>Tổng hợp</button></Link>
                <Link to='/product/vanhocvietnam'><button type="button" className="btn btn-light" style={{width:'80%', marginTop:'10px', marginLeft:'20px'}}>Văn học Việt Nam</button></Link>
                <Link to='/product/vanhocnuocngoai'><button type="button" className="btn btn-light" style={{width:'80%', marginTop:'10px', marginLeft:'20px'}}>Văn học nước ngoài</button></Link>
                <Link to='/product/truyentranh'><button type="button" className="btn btn-light" style={{width:'80%', marginTop:'10px', marginLeft:'20px'}}>Truyện tranh</button></Link>
                <Link to='/product/manga'><button type="button" className="btn btn-light" style={{width:'80%', marginTop:'10px', marginLeft:'20px'}}>Manga-Comic</button></Link>   
            </div>
        </div>
    );
}