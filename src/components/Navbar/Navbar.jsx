import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router";
import { useLocation, useParams, useNavigate } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Navbar.css";
import { CourseContext } from "../../contexts/CourseContext.jsx";

const Navbar = () => {
    const { pathname } = useLocation();
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [isWatchingCourse, setIsWatchingCourse] = useState(false);

    const navTl = useRef(null);

    const { completed, setCompleted } = useContext(CourseContext);

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

    useEffect(() => {
        console.log(completed);
        console.log(params);
        console.log(location);
    }, [completed]);

    return (
        <div className="nav-container">
            <nav>
                <Link className="logo" to="/">
                    Logo
                </Link>
                {isWatchingCourse ? (
                    <div className="buttons-container">
                        <Link className="back" to={"/course"}>
                            Go Back
                        </Link>
                        <button
                            className="finish"
                            onClick={() => {
                                setCompleted([...completed, params.courseId]);
                                navigate("/course");
                            }}
                        >
                            Finish lesson
                        </button>
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
