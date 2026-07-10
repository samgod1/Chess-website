import { Link } from "react-router";

import "./Signup.css";

const Signup = () => {
    return (
        <div className="signup-page">
            <div className="img-container">
                <img
                    src="/images/abstract-chess.png"
                    alt="abstract-chess-image"
                />
            </div>

            <div className="form-container">
                <div className="form">
                    <h1>Create your account</h1>
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
                        <button className="signup-button">Signup</button>
                        <p className="divider">-------- or --------</p>
                        <button className="guest-button">Login as guest</button>
                    </div>
                    <p className="redirect">
                        Already have an account?{" "}
                        <Link to={"/login"}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
