import ProductLink from "../components/ProductLink";
import Navbar from "../components/Navbar";
import BookShelve from "../components/Bookshelve";

function Manga(){
    return (
        <div>
            <div className="row">
                <Navbar/>
            </div>
            <div className="row">
                <div className="col-6 col-sm-3">
                    <ProductLink/>
                </div>
                <div className="col-12 col-sm-6 col-md-9" style={{marginTop:'70px'}}>
                    <BookShelve/>
                </div>
            </div>
        </div>
    )
}
export default Manga;