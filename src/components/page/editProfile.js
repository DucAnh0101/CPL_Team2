import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header & footer/Header";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState([]);
    const [image, setImage] = useState('');
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const updateUser = () => {
        axios.put('https://api.realworld.io/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            user: {
                email: email,
                password: password,
                username: userName,
                bio: bio,
                image: image
            }
        })
            .then((res) => {
                console.log(res.data.user);
                localStorage.removeItem('token');
                localStorage.setItem('token', `${res.data.user.token}`);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        axios
            .get("https://api.realworld.io/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="container text-center w-50 mt-5">
                <h1 className="display-5 fw-normal">Your Setting</h1>
                    <input
                        className="form-control form-control-sm border my-3"
                        value={user.image}
                        onChange={(e) => setImage(e.target.value)}
                    ></input>
                    <input
                        className="form-control border"
                        value={user.username}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <textarea
                        className="form-control form-control-sm border my-3"
                        placeholder="Short bio about you"
                        onChange={(e) => setBio(e.target.value)}
                        style={{height: '200px'}}
                    />
                    <input
                        className="form-control border"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="form-control border my-3"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <div className=" d-flex justify-content-end border-bottom pb-3">
                    <button className="btn btn-success py-3 px-4" onClick={updateUser}>
                        Update setting
                    </button>
                </div>
                <div className=" d-flex justify-content-start pt-3">
                    <button className="btn btn-outline-danger" onClick={logOut}>
                        Or click here to log out
                    </button>
                </div>
            </div>
        </>
    );
}
