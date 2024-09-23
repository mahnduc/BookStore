import BackGroundBanner from '../assets/webstore/banner.png'
import DoraemonBanner from '../assets/book/doraemon/banner_doraemon.jpg'
import BookShelve from '../components/Bookshelve';
import '../App.css'
const bg = {
    backgroundImage: `url(${BackGroundBanner})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
};
const doraemon  = {
    backgroundImage: `url(${DoraemonBanner})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '20vh',
    marginBottom: '60px'
}
function Banner() {
    return (
        <div>
            <div className='container-fluid' style={bg}></div>
            <div className='container-fluid' style={doraemon}></div>
        </div>
    );
}
export default Banner;