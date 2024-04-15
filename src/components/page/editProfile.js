import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header & footer/Header";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({
        image: "",
        username: "",
        email: "",
        bio: "",
        password: ""
    });
    const navigate = useNavigate();

    const updateUser = async () => {
        try {
            const response = await axios.put(
                "https://api.realworld.io/api/user",
                { user },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedUser = response.data.user;
            localStorage.setItem("token", updatedUser.token);
            navigate("/");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "https://api.realworld.io/api/user",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const userData = response.data.user;
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <>
            <Header />
            <div className="container text-center w-50 mt-5">
                <h1 className="display-5 fw-normal">Your Setting</h1>
                <input
                    className="form-control form-control-sm border my-3"
                    name="image"
                    value={user.image}
                    onChange={handleChange}
                />
                <input
                    className="form-control border"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
                <textarea
                    className="form-control form-control-sm border my-3"
                    name="bio"
                    placeholder="Short bio about you"
                    value={user.bio}
                    onChange={handleChange}
                    style={{ height: "200px" }}
                />
                <input
                    className="form-control border"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                />
                <input
                    className="form-control border my-3"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                />
                <div className=" d-flex justify-content-end border-bottom pb-3">
                    <button
                        className="btn btn-success py-3 px-4"
                        onClick={updateUser}
                    >
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
};

export default EditProfile;
