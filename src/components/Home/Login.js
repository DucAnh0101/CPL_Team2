import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Header from '../Header & footer/Header'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState();
  const navigate = useNavigate()

  const handelSignIn = () => {
    axios
      .post('https://api.realworld.io/api/users/login', {
        user: {
          email: email,
          password: password
        }
      })
      .then(res => {
        console.log("có chạy vào đây nhé 1!");
        localStorage.setItem('token', res.data.user.token);
        setErr('');
        navigate('/');
        return;
      })
      .catch(err => {
        console.log("có chạy vào đây nhé 2!");
        if (err.response.data.errors.email) {
          setErr(`Email ${err.response.data.errors.email}`);
        } if (err.response.data.errors.password) {
          setErr(`Password ${err.response.data.errors.password}`);
        } if(err.response.data.errors['email or password']) { 
          setErr(`Email or password ${err.response.data.errors['email or password']}`)
        }
        return;
      })
  }

  // const handleKeyDown = event => {
  //   if (event.key === 'Enter') {
  //     handelSignIn();
  //   }
  // }

  // document.addEventListener('keydown', handleKeyDown);
  return (
    <>
      <Header />
      <div className='container d-flex flex-column text-center align-item-center justify-content-center w-50'>
        <h1>Sign in</h1>
        <Link className='text-success' to='/register'>
          Need an account?
        </Link>
        {err && <span className="text-danger">{err}</span>}
        <div className='container d-flex flex-column justify-content-center'>
          {!err}
          <input
            type='text'
            placeholder='Email'
            className='p-2   mx-3 mt-3 rounded border'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            className='p-2 m-3 rounded border'
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='d-flex justify-content-end'>
          <button className='btn btn-success mx-4 px-5' onClick={handelSignIn}>
            Sign in
          </button>
        </div>
      </div>
    </>
  )
}
