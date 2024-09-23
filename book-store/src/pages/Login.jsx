import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3030/auth/login', {email, password})
        .then(result => {
            //console.log(result);
            if (result.data === "email hoac password khong dung") {
                alert('Incorrect password or email! Please try again.')
            } 
            else if (result.data === "admin") {
                navigate('/admin')
            }
            else {
                alert(`Dang nhap thanh cong`)
                const token = result.data.accessToken
                sessionStorage.setItem('token',JSON.stringify(token))
                const id = result.data.validateAccount._id
                sessionStorage.setItem('id', JSON.stringify(id))
                navigate('/', {state:{login: true}})
            }
            /*
            if(result.data === "Success"){
                console.log("Login Success");
                alert('Login successful!')
                navigate('/');
            }
            else{
                alert('Incorrect password or email! Please try again.');
            }
            */
        })
        .catch(err => console.log(err));
    }


    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(360deg,#d8a8a1,#0f324d)"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary' style={{fontWeight:'bold'}}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    {/* TO add ' appostopee */}
                    <p className='container my-2'>Don&apos;t have an account?</p>
                    <Link to='/register' className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;