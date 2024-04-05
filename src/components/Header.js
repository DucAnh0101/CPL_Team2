import { useState } from "react"
import { Link } from "react-router-dom";

export default function Header() {

    const [login, setLogin] = useState(0);

    return (
        <>
            {
                login === 0 ? (
                    <div className="container-fluid bg-white">
                        <div className="container d-flex align-items-center justify-content-between">
                            <Link className="text-success h1 text-decoration-none" to='/'>
                                conduit
                            </Link>
                            <div className="d-flex justify-content-evenly">
                                <Link className="text-decoration-none text-black" to='/'>Home</Link>
                                <Link className="mx-3 text-secondary text-decoration-none">Sign in</Link>
                                <Link className="text-secondary text-decoration-none">Sign up</Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container-fluid bg-white">
                        <div className="container d-flex align-items-center justify-content-between">
                            <Link className="text-success h1 text-decoration-none" to='/'>
                                conduit
                            </Link>
                            <div className="d-flex justify-content-evenly">
                                <Link className="text-decoration-none text-black" to='/'>Home</Link>
                                <Link className="text-decoration-none mx-3 text-secondary"><i class="fa-regular fa-pen-to-square"></i>New Article</Link>
                                <Link className="text-decoration-none text-secondary"><i class="fa-solid fa-gear"></i>Setting</Link>
                                <Link className="text-decoration-none mx-3 text-secondary"><i class="fa-regular fa-user"></i>User</Link>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="container-fluid bg-success text-center text-white">
                <div className="py-4">
                    <h1 className="mb-3">CONDUIT</h1>
                    <p>A place to share your knowledge</p>
                </div>
            </div>
        </>
    )
}