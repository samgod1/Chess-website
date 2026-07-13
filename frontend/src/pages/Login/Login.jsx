import { useState } from "react";
import { Link, useNavigate } from "react-router";

import "./Login.css";
import login from "../../../apis/auth/login";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <div className="login-page">
            <div className="img-container">
                <img src="/images/login-page-img.png" alt="login-page-image" />
            </div>

            <div className="form-container">
                <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const success = login(email, password);
                        if (success) {
                            navigate("/course");
                        }
                    }}
                >
                    <h1>Welcome back</h1>
                    <div className="input-container">
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="buttons-container">
                        <button className="login-button" type="submit">
                            Login
                        </button>
                        <p className="divider">-------- or --------</p>
                        <button
                            className="guest-button"
                            onClick={(e) => {
                                e.preventDefault();
                                guest();
                            }}
                        >
                            Login as guest
                        </button>
                    </div>
                    <p className="redirect">
                        Don't have an account?{" "}
                        <Link to={"/signup"}>Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
