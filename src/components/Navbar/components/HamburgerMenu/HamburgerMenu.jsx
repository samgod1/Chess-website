import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import "./HamburgerMenu.css";
import { UserContext } from "../../../../contexts";

const HamburgerMenu = ({ isHamburgerMenuOpen, setIsHamburgerMenuOpen }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);

    function logout() {
        setIsHamburgerMenuOpen(false);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }

    return (
        <div
            className="hamburger-menu-container"
            style={{
                pointerEvents: isHamburgerMenuOpen ? "auto" : "none",
            }}
        >
            <div
                className="overlay"
                style={{
                    backdropFilter: isHamburgerMenuOpen
                        ? "blur(3px)"
                        : "blur(0px)",
                }}
                onClick={() => setIsHamburgerMenuOpen(false)}
            ></div>
            <div
                className="hamburger-menu"
                style={{
                    transform: isHamburgerMenuOpen
                        ? "translateX(0%)"
                        : "translateX(100%)",
                }}
            >
                <div className="close-btn-container">
                    <button
                        className="close"
                        onClick={() => setIsHamburgerMenuOpen(false)}
                    >
                        <img
                            src="/images/close.png"
                            alt="close"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
                <ul>
                    <li
                        className={pathname === "/course" ? "selected" : ""}
                        onClick={() => setIsHamburgerMenuOpen(false)}
                    >
                        <Link to="/course">Courses</Link>
                    </li>
                    <li
                        className={pathname === "/puzzles" ? "selected" : ""}
                        onClick={() => setIsHamburgerMenuOpen(false)}
                    >
                        <Link to="/puzzles">Puzzles</Link>
                    </li>
                    <li
                        className={pathname === "/vision" ? "selected" : ""}
                        onClick={() => setIsHamburgerMenuOpen(false)}
                    >
                        <Link to="/vision">Vision</Link>
                    </li>
                </ul>
                {user ? (
                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <Link
                        to={"/signup"}
                        onClick={() => setIsHamburgerMenuOpen(false)}
                        className="signup-redirect"
                    >
                        Signup
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HamburgerMenu;
