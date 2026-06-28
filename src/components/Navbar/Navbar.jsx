import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Navbar.css";

const Navbar = () => {
    const { pathname } = useLocation();
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

    return (
        <div className="nav-container">
            <nav>
                <Link className="logo" to="/">
                    Logo
                </Link>
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
            </nav>
        </div>
    );
};

export default Navbar;
