import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { AuthContext } from "../context/AuthContext";

import "../styles/auth.css";

export default function LoginPage() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);

        const result = await login(email, password);

        setLoading(false);

        if (result.success) {

            alert("Login successful");

            navigate("/");

        } else {

            alert(result.message);
        }
    };

    return (
        <>
            <Navbar />

            <div className="logsign-container">

                <form
                    onSubmit={handleSubmit}
                    className="needs-validation animate__animated animate__fadeInUp"
                >

                    <div className="card shadow loginCard">

                        <div className="card-body">

                            <h2 className="text-center mb-3 pb-2">
                                Login
                            </h2>

                            <p className="form-label text-white">
                                Enter Your Email :
                            </p>

                            <input
                                type="email"
                                className="form-control mb-3 loginInput text-black"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <p className="form-label text-white">
                                Enter Password :
                            </p>

                            <input
                                type="password"
                                className="form-control mb-3 loginInput text-black"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                className="btn text-white w-100 mt-3 loginBtn"
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>

                            <p className="text-center mt-3 text-white">

                                Don't have an account?

                                <Link to="/signup" className="text-white ms-2">
                                    Signup
                                </Link>

                            </p>

                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}