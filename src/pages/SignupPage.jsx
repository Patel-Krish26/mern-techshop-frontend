import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { AuthContext } from "../context/AuthContext";

import "../styles/auth.css";

export default function SignupPage() {

    const navigate = useNavigate();

    const { signup } = useContext(AuthContext);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);

        const result = await signup(name, email, password);

        setLoading(false);

        if (result.success) {

            alert("Signup successful");

            navigate("/login");

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

                    <div className="card shadow signupCard">

                        <div className="card-body">

                            <h2 className="text-center mb-3 pb-2">
                                Signup
                            </h2>

                            <p className="form-label text-white">
                                Enter Your Name :
                            </p>

                            <input
                                type="text"
                                className="form-control mb-3 signupInp"
                                placeholder="Enter Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <p className="form-label text-white">
                                Enter Your Email :
                            </p>

                            <input
                                type="email"
                                className="form-control mb-3 signupInp"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <p className="form-label text-white">
                                Create Password :
                            </p>

                            <input
                                type="password"
                                className="form-control mb-3 signupInp"
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                className="btn text-white w-100 mt-3 signupBtn"
                            >
                                {loading ? "Loading..." : "Create Account"}
                            </button>

                            <p className="text-center mt-3 text-white">

                                Already have account?

                                <Link to="/login" className="text-white ms-2">
                                    Login
                                </Link>

                            </p>

                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}