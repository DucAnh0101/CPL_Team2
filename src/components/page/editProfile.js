import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState([]);
    const [image, setImage] = useState("");
    const [userName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const updateUser = () => {
        axios.put('https://api.realworld.io/api/user', {
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
                <h1>Your Setting</h1>
                <form className="form-group w-100 d-flex flex-column borer-bottom">
                    <input
                        className="form-control form-control-sm border my-3"
                        onChange={(e) => setImage(e.target.value)}
                        value={user.image}
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
                    />
                    <input
                        className="form-control border"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="form-control border my-3"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </form>
                <button className="btn btn-success" onClick={updateUser}>
                    Update setting
                </button>
                <button className="btn btn-outline-danger" onClick={logOut}>
                    Or click here to log out
                </button>
            </div>
        </>
    );
}
