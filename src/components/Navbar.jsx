import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const loggedInUser = localStorage.getItem("loggedInUser");

    const handleLogout = () => {
        localStorage.clear();
        alert("Logged out successfully!");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">Tech Shop</Link>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>

                        {!token ? (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="nav-link bg-transparent border-0" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}