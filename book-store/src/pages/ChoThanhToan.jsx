import Detail from "../components/BookDetail";
import ThanhToan from "./ThanhToan";
function ChoThanhToan(props) {
    const isDonHang = true
    return (
        <div>
            <DonHang name={props.name} price={props.price} />
        </div>
    );
}
function DonHang(props) {
    return(
        <div>
            <div>
                <h2>Name: {props.name}</h2>
                <p>Price: {props.price}</p>
            </div>
        </div>
    );
}
export default ChoThanhToan;