import axios from "axios";
import ProductLink from "../components/ProductLink";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Book from "../components/Book";
function TatCaSach(){
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
                <div>
                    {loading && <div>Loading</div>}
                    {!loading && (
                    <div >
                        {data.map(item => (
                            <div className="container-fluid" >
                                <div className="container-fluid " style={{width:'100%', height:'300px'}}>
                                    <div>
                                        <Book name={item.name} image={item.image} price={item.price} />
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
export default TatCaSach;