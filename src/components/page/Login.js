import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Header from "../Header/Header";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handelSignIn = () => {
        axios.post('https://api.realworld.io/api/users/login', {
            user: {
                email: email,
                password: password
            }
        })
        .then((res) => {
            localStorage.setItem('token', res.data.user.token);
            navigate('/');
        })
    }

    return (
        <>
        <Header/>
            <div className="container d-flex flex-column text-center align-item-center justify-content-center w-50">
                <h1>Sign in</h1>
                <Link className="text-success" to="/register">Need an account?</Link>
                <div className="container d-flex flex-column justify-content-center">
                    <input type="text" placeholder="Email" className="p-2   mx-3 mt-3 rounded border" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" className="p-2 m-3 rounded border" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="btn btn-success mx-5" onClick={handelSignIn}>Sign in</button>
                </div>
            </div>
        </>
    )
}