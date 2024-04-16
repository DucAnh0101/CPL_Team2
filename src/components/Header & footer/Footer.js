import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer container-fluid bg-light py-3">
            <div className="container">
                <Link to="/" className="text-success fw-bold mx-2 h5">Conduit</Link>
                <span className="text-muted">An interactive learning project from
                    <a href="https://thinkster.io/" className="text-success ms-1" target="_blank" rel='noreferrer'>Thinkster</a>. Code & design licensed under MIT.</span>
            </div>
        </footer>
    )
}