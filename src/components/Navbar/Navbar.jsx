import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="nav-container">
            <nav>
                <span className="logo">Logo</span>
                <ul>
                    <li>
                        <Link to="/courses">Courses</Link>
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
