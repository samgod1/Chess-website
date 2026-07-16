import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router";

import "./Signup.css";
import signup from "../../../apis/auth/signup.js";
import guest from "../../../apis/auth/guest.js";
import { UserContext } from "../../contexts";

const Signup = () => {
    const navigate = useNavigate();

    const { getUser } = useContext(UserContext);

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
                    <form
                        className="form"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const success = await signup(
                                email,
                                password,
                                username,
                            );
                            if (success) {
                                await getUser();
                                navigate("/course");
                            }
                        }}
                    >
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
                                    value={username}
                                />
                            </div>
                        </div>
                        <div className="buttons-container">
                            <button className="signup-button" type="submit">
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="form-container">
                    <form
                        className="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setHasContinued(true);
                        }}
                    >
                        <h1>Create your account</h1>
                        <div className="input-container">
                            <div className="input-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                    value={email}
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
                                    value={password}
                                />
                            </div>
                        </div>
                        <div className="buttons-container">
                            <button className="continue-button" type="submit">
                                Continue
                            </button>
                            <p className="divider">-------- or --------</p>
                            <button
                                className="guest-button"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const success = await guest();
                                    if (success) {
                                        await getUser();
                                        navigate("/course");
                                    }
                                }}
                            >
                                Login as guest
                            </button>
                        </div>
                        <p className="redirect">
                            Already have an account?{" "}
                            <Link to={"/login"}>Login</Link>
                        </p>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Signup;
