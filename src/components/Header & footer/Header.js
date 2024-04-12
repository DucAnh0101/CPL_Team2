import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);

  const handleLogOut = () => {
    localStorage.removeItem('token');
  }

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
      {!token ? (
        <div className="container-fluid p-2 bg-body">
          <div className="container d-flex align-items-center justify-content-between">
            <Link className="text-success fw-bold h3 text-decoration-none" to="/">
              conduit
            </Link>
            <div className="d-flex justify-content-evenly">
              <Link className="text-decoration-none text-black" to="/">
                Home
              </Link>
              <Link
                className="mx-3 text-secondary text-decoration-none"
                to="/login"
              >
                Sign in
              </Link>
              <Link
                className="text-secondary text-decoration-none"
                to="/register"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid p-2 bg-body headers">
          <div className="container d-flex align-items-center justify-content-between">
            <Link className="text-success fw-bold h3 text-decoration-none" to="/">
              conduit
            </Link>
            <div className="d-flex justify-content-evenly">
              <Link className="text-decoration-none text-black" to="/">
                Home
              </Link>
              <Link
                className="text-decoration-none mx-3 text-secondary"
                to="/newArticle"
              >
                <i className="fa-regular fa-pen-to-square"></i>New Article
              </Link>
              <Link
                className="text-decoration-none text-secondary"
                to="/editProfile"
              >
                <i className="fa-solid fa-gear"></i>Setting
              </Link>
              <Link
                className="mx-3 text-secondary"
                onClick={handleLogOut}
                to='/'>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>Log out
              </Link>
              <span
                className="text-secondary"
              >
                <img
                  className="user-avt"
                  alt="user-avt"
                  src={user.image}
                  style={{
                    borderRadius: "15px",
                    width: "20px",
                  }}
                />{" "}
                {user.username}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
