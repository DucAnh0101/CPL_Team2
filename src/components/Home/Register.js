import { Link, useNavigate } from "react-router-dom";
import Header from '../Header & footer/Header'
import { useState } from "react";
import axios from 'axios'

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const handelSignUp = () => {
        axios.post('https://api.realworld.io/api/users', {
            user: {
                username: userName,
                email: email,
                password: password
            }
        })
            .then((res) => {
                console.log(res.data.user);
                localStorage.setItem('token', res.data.user.token);
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                if (!email) {
                    setError(`Email ${err.response.data.errors.email}`);
                } else if (!userName) {
                    setError(`Username ${err.response.data.errors.username}`);
                } else if (!password) {
                    setError(`Password ${err.response.data.errors.password}`);
                } else {
                    setError('');
                }
            })
    }
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            handelSignUp()
        }
      }
    
      document.addEventListener('keydown', handleKeyDown)
    return (
        <>
            <Header />
            <div className="container d-flex flex-column text-center align-item-center justify-content-center w-50">
                <h1>Sign up</h1>
                <Link className="text-success" to="/login">Have an account?</Link>
                <div className="container d-flex flex-column justify-content-center">
                    {error && <span className="text-danger">{error}</span>}
                    <input type="text" placeholder="Username" className="p-2 m-3 rounded border" onChange={(e) => setUserName(e.target.value)} />
                    <input type="text" placeholder="Email" className="p-2 mx-3 rounded border" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" className="p-2 m-3 rounded border" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-flex justify-content-end">
                <button className="btn btn-success mx-4 px-5" onClick={handelSignUp}>Sign up</button>
                </div>
            </div>
        </>
    )
}