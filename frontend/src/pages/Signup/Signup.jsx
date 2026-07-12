import { useState, useRef } from "react";
import { Link } from "react-router";

import "./Signup.css";
import signup from "../../../apis/auth/signup";

const Signup = () => {
    const [hasContinued, setHasContinued] = useState(false); //To switch between forms
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);

    return (
        <div className="signup-page">
            <div className="img-container">
                <img
                    src="/images/signup-page-img.png"
                    alt="signup-page-image"
                />
            </div>

            {hasContinued ? (
                <div className="form-container">
                    <div className="form">
                        <div
                            className="back"
                            onClick={() => {
                                setHasContinued(false);
                            }}
                        >
                            <img
                                src="/images/arrow-left.png"
                                alt="arrow-left"
                                width={24}
                                height={24}
                            />
                            <span>Back</span>
                        </div>
                        <h1>Choose a username</h1>
                        <div className="input-container">
                            <div className="input-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="buttons-container">
                            <button
                                className="signup-button"
                                onClick={() => {
                                    signup(email, password, username);
                                }}
                            >
                                Signup
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="form-container">
                    <div className="form">
                        <h1>Create your account</h1>
                        <div className="input-container">
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="buttons-container">
                            <button
                                className="continue-button"
                                onClick={() => {
                                    setHasContinued(true);
                                }}
                            >
                                Continue
                            </button>
                            <p className="divider">-------- or --------</p>
                            <button className="guest-button">
                                Login as guest
                            </button>
                        </div>
                        <p className="redirect">
                            Already have an account?{" "}
                            <Link to={"/login"}>Login</Link>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
