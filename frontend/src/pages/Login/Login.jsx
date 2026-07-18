import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";

import "./Login.css";
import login from "../../../apis/auth/login.js";
import guest from "../../../apis/auth/guest.js";
import { UserContext } from "../../contexts/index.js";

const Login = () => {
    const navigate = useNavigate();

    const { getUser } = useContext(UserContext);

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
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const success = await login(email, password);
                        if (success) {
                            await getUser();
                            navigate("/course");
                        }
                    }}
                >
                    <div
                        className="back"
                        onClick={() => {
                            navigate("/");
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
                        Don't have an account?{" "}
                        <Link to={"/signup"}>Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
