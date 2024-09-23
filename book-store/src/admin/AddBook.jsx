import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AddBook() {
    const [name, setName] = useState();
    const [image, setimage] = useState();
    const [price, setprice] = useState();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post( 'http://localhost:3030/book/addbook', {name, image, price})
        .then(result => {
            if(result.data === "Add successed"){
                alert("Đã thêm");
                navigate('/admin');
            }
            else{
                alert("Hãy thử lại")
            }
        })
        .catch(err => console.log(err));
    }
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundColor:'#0f324d'}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Add Book</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputimage1" className="form-label">
                                <strong className="text-primary">Tên sách</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Nhập tên sách"
                                className="form-control" 
                                id="exampleInputname" 
                                onChange={(event) => setName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputimage1" className="form-label">
                                <strong className="text-primary">Ảnh</strong>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Image"
                                className="form-control" 
                                id="exampleInputimage1" 
                                onChange={(event) => setimage(event.target.value)}
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputprice1" className="form-label">
                                <strong className="text-primary">Giá</strong>
                            </label>
                            <input 
                                type="price" 
                                placeholder="Đặt giá"
                                className="form-control" 
                                id="exampleInputprice1" 
                                onChange={(event) => setprice(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Thêm</button>
                    </form>

                    
                </div>
            </div>
        </div>
    );
}