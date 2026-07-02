import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useNavigate, useLocation, useParams } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Navbar.css";

const Navbar = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [isWatchingCourse, setIsWatchingCourse] = useState(false);

    const navTl = useRef(null);

    useGSAP(() => {
        const containerHeight =
            document.querySelector(".nav-container").offsetHeight;
        const navHeight = document.querySelector("nav").offsetHeight;
        const yCenter = -((containerHeight - navHeight) / 2);

        navTl.current = gsap.timeline({ paused: true });
        navTl.current.to("nav", {
            width: "100%",
            y: yCenter,
        });
    }, []);

    useGSAP(() => {
        if (pathname === "/") {
            navTl.current.reverse();
        } else {
            navTl.current.play();
        }
    }, [pathname]);

    useEffect(() => {
        if (params.courseId) {
            setIsWatchingCourse(true);
        } else {
            setIsWatchingCourse(false);
        }
    }, [params]);

    return (
        <div className="nav-container">
            <nav>
                <Link className="logo" to="/">
                    Logo
                </Link>
                {isWatchingCourse ? (
                    <div className="buttons-container">
                        <button
                            className="back"
                            onClick={() => {
                                navigate("/course");
                            }}
                        >
                            Go Back
                        </button>
                        <button className="finish">Finish lesson</button>
                    </div>
                ) : (
                    <ul>
                        <li>
                            <Link to="/course">Courses</Link>
                        </li>
                        <li>
                            <Link to="/puzzles">Puzzles</Link>
                        </li>
                        <li>
                            <Link to="/visualization">Visualization</Link>
                        </li>
                        <button>Let's go</button>
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
