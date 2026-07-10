import { Link } from "react-router";

import "./Login.css";

const Login = () => {
    return (
        <div className="login-page">
            <div className="img-container">
                <img
                    src="/images/login-page-img.png"
                    alt="abstract-chess-image"
                />
            </div>

            <div className="form-container">
                <div className="form">
                    <h1>Welcome back</h1>
                    <div className="input-container">
                        <div className="input-group">
                            <label>Email</label>
                            <input type="text" placeholder="Enter your email" />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    <div className="buttons-container">
                        <button className="login-button">Login</button>
                        <p className="divider">-------- or --------</p>
                        <button className="guest-button">Login as guest</button>
                    </div>
                    <p className="redirect">
                        Don't have an account?{" "}
                        <Link to={"/signup"}>Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
