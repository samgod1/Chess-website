import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router";
import { useLocation, useParams, useNavigate } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import confetti from "@hiseb/confetti";

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

    function finishLesson() {
        setCompleted([...completed, params.courseId]);
        navigate("/course");
        confetti({
            size: 2,
            velocity: 300,
            fade: true,
        });
    }

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

        if (pathname !== "/") {
            navTl.current.progress(1);
        }
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
