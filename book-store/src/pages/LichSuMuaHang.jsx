import axios from "axios";
import { useState, useEffect } from "react";

function LichSuMuaHang() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    
    useEffect(() => {
        const fetchData = async () =>{
        setLoading(true);
       
        try {
            const {data: response} = await axios.get('http://localhost:3030/bill/getbill');
            setData(response);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false);
        }

        fetchData();
    }, []);
    const handleDelete = () => {
        axios.delete('http://localhost:3030/bill/delete')
        .then(()=>{
            console/log('delete successful')
            
        })
        .catch((e) => {
            console.log(e)
        })
        
    }
    {/*
    axios.get('http://localhost:3030/auth/',{
        params: {
            id: sessionStorage.getItem('id')
        }
    })
    .then((res) => {
        console.log(res.data)
    }*/}
    return (
        <div>
        {loading && <div>Loading</div>}
                    {!loading && (
                    <div >
                        {data.map(item => (
                            <div className="container-fluid" style={{marginTop:'50px'}} >
                                <div className="container-fluid" style={{width:'100%', height:'300px',}}>
                                    <div className='container-fluid row align-items-end'style={{display:'flex', border:'1px solid white', backgroundColor:'lightblue'}} >
                                        <img className='col-3' src={item.image} style={{ height:'270px', width:'230px'}} />
                                        <div className='col-6 align-items-end' style={{color:'black', backgroundColor:'lightblue', marginBottom:'20px', display:'flex'}}>
                                            <div>
                                            <h2>{item.name}</h2>
                                            <p style={{fontSize:'20px', paddingTop:'100px'}}><strong>Mã sách:</strong> {item._id}</p>
                                            </div>
                                            <p style={{marginLeft:'20px', marginRight:'20px', fontSize:'20px'}}><strong>Giá:</strong> {item.price}</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
            <div className="row" style={{marginTop:'20px'}}>
                <div className="col-10"></div>
                <div className="col-2">
                    <button className="btn btn-danger" onClick={handleDelete} type="button">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default LichSuMuaHang;