import { useEffect, useState } from "react";
import BookShelve from "../components/Bookshelve";
import Navbar from "../components/Navbar";
import ProductLink from "../components/ProductLink";
function Product() {
    const [vanhocvietnam, setvanhocvietnamState] = useState(true)
    const [vanhocnguocngoai, setvanhocnguocngoaiState] = useState('')
    const [truyentranh, settruyentranhState] = useState('')
    const [manga, setmangaState] = useState('')
    return (
        <div>
            <div className="row">
                <Navbar/>
            </div>
            
            <div className="row">
                <div className="col-6 col-sm-3">
                    <ProductLink/>
                </div>
                <div className="col-12 col-sm-6 col-md-9" style={{marginTop:'62px'}}>
                    render all sách
                </div>
            </div>
            
            {/*
            <div style={{width:'100%', height:'90px',}} className="container"></div>
            <div className="row no-gutters">
                <div className="col-6 col-sm-3">
                    <div><button type="button" className="btn btn-light" style={{width:'80%', marginTop:'10px', marginLeft:'20px'}} 
                    onClick={() => {
                        setvanhocvietnamState(true)
                        setvanhocnguocngoaiState(false)
                        settruyentranhState(false)
                        setmangaState(false)
                    }} >Văn học Việt Nam</button></div>
                    <div><button type="button" className="btn btn-light" style={{width:'80%', marginTop:'10px', marginLeft:'20px'}} 
                    onClick={() => {
                        setvanhocvietnamState(false)
                        setvanhocnguocngoaiState(true) 
                        settruyentranhState(false)
                        setmangaState(false)
                        }} >Văn học nước ngoài</button></div>
                    <div><button type="button" className="btn btn-light" style={{width:'80%', marginTop:'10px', marginLeft:'20px'}} onClick={() => {
                        setvanhocvietnamState(false)
                        setvanhocnguocngoaiState(false)
                        settruyentranhState(true)
                        setmangaState(false)
                    }} >Truyện tranh</button></div>
                    <div><button type="button" className="btn btn-light" style={{width:'80%', marginTop:'10px', marginLeft:'20px'}} onClick={() => {
                        setvanhocvietnamState(false)
                        setvanhocnguocngoaiState(false)
                        settruyentranhState(false)
                        setmangaState(true)
                    }} >Manga-comic</button></div>
                </div>
                <div className="col-12 col-sm-6 col-md-9">
                    {
                        vanhocvietnam ? <VanHocVietNam/> : null  ||
                        vanhocnguocngoai ? <VanHocNuocNgoai/> : null ||
                        truyentranh ? <TruyenTranh/> : null ||
                        manga ? <Manga/> : null
                    }
                </div>
            </div>
            */}
        </div>
    );
}
function VanHocVietNam() {
    return (
        <div>
            <h2>VanHocVietNam</h2>
        </div>
    );
}
function VanHocNuocNgoai() {
    return (
        <div>
            <h2>VanHocNuocNgoai</h2>
        </div>
    );
}
function TruyenTranh() {
    return (
        <div>
            <h2>TruyenTranh</h2>
        </div>
    );
}
function Manga() {
    return (
        <div>
            <h2>Manga</h2>
        </div>
    );
}
export default Product;