import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router";
import { useLocation, useParams, useNavigate } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import confetti from "@hiseb/confetti";

import "./Navbar.css";
import { CourseContext, UserContext } from "../../contexts/index.js";
import Dropdown from "./components/Dropdown/Dropdown.jsx";

const Navbar = () => {
    const { pathname } = useLocation();
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [isWatchingCourse, setIsWatchingCourse] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { user } = useContext(UserContext);
    const { completed, setCompleted, setHasCompleted } =
        useContext(CourseContext);

    function finishLesson() {
        setCompleted([...completed, params.courseId]);
        navigate("/course");
        setHasCompleted(true);
        confetti({
            size: 2,
            velocity: 300,
            fade: true,
        });
    }

    useGSAP(() => {
        if (isDropdownOpen) {
            gsap.to(".hidden", {
                height: "auto",
                duration: 0.2,
            });
        } else {
            gsap.to(".hidden", { height: "0px", duration: 0.2 });
        }
    }, [isDropdownOpen]);

    useEffect(() => {
        if (params.courseId) {
            setIsWatchingCourse(true);
        } else {
            setIsWatchingCourse(false);
        }
    }, [params]);

    return (
        <nav>
            <Link className="logo" to="/">
                <img src="/images/logo.png" alt="logo" />
                <p>Evochess</p>
            </Link>
            {isWatchingCourse ? (
                <div className="buttons-container">
                    <Link className="back" to={"/course"}>
                        Go Back
                    </Link>
                    {!completed.includes(params.courseId) && (
                        <button className="finish" onClick={finishLesson}>
                            Finish lesson
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <ul>
                        <li>
                            <Link to="/course">Courses</Link>
                        </li>
                        <li>
                            <Link to="/puzzles">Puzzles</Link>
                        </li>
                        <li>
                            <Link to="/vision">Vision</Link>
                        </li>
                        {user ? (
                            <button
                                className="user"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDropdownOpen(!isDropdownOpen);
                                }}
                            >
                                <img
                                    src="/images/user-icon.png"
                                    alt="user-icon"
                                    width={32}
                                    height={32}
                                />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    navigate("/signup");
                                }}
                                className="lets-go"
                            >
                                Let's go
                            </button>
                        )}
                    </ul>
                    <button className="hamburger-menu">
                        <img src="/images/menu.png" alt="hamburger-menu-icon" />
                    </button>
                </>
            )}
            <Dropdown
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
            />
        </nav>
    );
};

export default Navbar;
