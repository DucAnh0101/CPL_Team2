import { Link } from "react-router-dom";
import Header from "./Header";

export default function Register() {
    return (
        <>
            <Header />
            <div className="container d-flex flex-column text-center align-item-center justify-content-center">
                <h1>Sign up</h1>
                <Link className="text-success" to="/login">Have an account?</Link>
                <input type="text" placeholder="Username" className="p-2 m-3 mt-5 rounded border"/>
                <input type="text" placeholder="Email" className="p-2 mx-3 rounded border"/>
                <input type="password" placeholder="Password" className="p-2 m-3 rounded border"/>
                <button className="btn btn-success btn-lg">Sign up</button>
            </div>
        </>
    )
}