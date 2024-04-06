import { Link } from "react-router-dom";
import Header from "./Header";

export default function Login() {
    return (
        <>
            <Header />
            <div className="container d-flex flex-column text-center align-item-center justify-content-center">
                <form className="form-control">
                    <h1>Sign in</h1>
                    <Link className="text-success" to="/register">Need an account?</Link>
                    <input type="text" placeholder="Email" className="p-2 mx-3 mt-3 rounded border" />
                    <input type="password" placeholder="Password" className="p-2 m-3 rounded border" />
                    <button className="btn btn-success">Sign up</button>
                </form>
            </div>
        </>
    )
}