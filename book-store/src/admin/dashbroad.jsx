import { useState, useEffect } from "react";
import axios from "axios";
import Book from "../components/Book";
import { Link } from "react-router-dom";
export default function DashBroad(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () =>{
        setLoading(true);
        try {
            const {data: response} = await axios.get('http://localhost:3030/book/allbook');
            setData(response);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        }

        fetchData();
    }, []);
    const [dele, setDele] = useState('')
    const handleClick =  (dele)=>{
        axios.delete(`http://localhost:3030/book/deleteone/${dele}`)
        .then(()=>{
            console.log('delete successful')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <div className="row text-center containe-fluidr">
                <p style={{padding:'30px', fontWeight:'bold', fontSize:'32px', marginTop:'40px'}}>DashBroad</p>
            </div>
            <div className="row">
                <div className="col-3 container" style={{border: '1px solid white', marginTop:'30px'}}>
                    <div style={{margin: '20px'}}>
                    <Link to='/addbook' style={{textDecoration:'none', color:'white'}}><button className="btn btn-primary" style={{width:'100%'}}>Add</button></Link>
                    </div>

                    <div style={{margin: '20px'}}>
                    <Link to='/patch'><button className="btn btn-light" style={{width:'100%'}}>Sửa</button></Link>
                    </div>

                    <div style={{margin: '20px'}}>
                        <input type="text" placeholder="Nhập mã sách cần xóa" className="text-center" style={{width:'100%'}} onChange={(e) => {setDele(e.target.value)}}/>
                        <button type="submit" className="btn btn-danger" style={{width:'100%', marginTop:'20px'}} onClick={handleClick(dele)}>Xóa</button>
                    </div>

                    <hr style={{backgroundColor:'white', height:'5px'}}/>
                    <div style={{margin: '20px'}}>
                    <Link to='/' style={{textDecoration:'none', color:'white'}}><button className="btn btn-danger" style={{width:'100%'}}>Đăng xuất</button></Link>
                    </div>
                </div>
                <div className="col-9">
                <div>
                    {loading && <div>Loading</div>}
                    {!loading && (
                    <div >
                        {data.map(item => (
                        <div className="container-fluid" style={{marginTop:'30px'}} >
                            <div className="container-fluid" style={{width:'100%', height:'300px',}}>
                                <div className='container-fluid row align-items-end'style={{display:'flex', border:'1px solid white', backgroundColor:'lightblue'}} >
                                    <img className='col-3' src={item.image} style={{ height:'270px', width:'230px'}} />
                                    <div className='col-5 align-items-end' style={{color:'black', backgroundColor:'lightblue', marginBottom:'20px', display:'flex'}}>
                                        <div>
                                        <h2>{item.name}</h2>
                                        <p>Mã sách: {item._id}</p>
                                        </div>
                                        <p style={{marginLeft:'20px', marginRight:'20px'}}>Giá: {item.price}</p> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}
function Delete(props){
    //const [thamso, setThamso] = useState('')
    /*
    axios.delete(`http://localhost:3030/book/deleteone/${props.key}`)
    .then(()=>{
        alert('da xoa')
    })
    .catch((err) => {
        console.log(err)
    })
        */
    return (
        <div>
            <button className="btn btn-danger">Delete</button>
        </div>
    );
}
