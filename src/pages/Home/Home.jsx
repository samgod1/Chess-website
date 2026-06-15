import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import "./Home.css";
import { HeroSection, CoursesSection } from "./sections/index.js";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    return (
        <div className="home-page">
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

            <HeroSection />
            <CoursesSection />

            <section className="puzzles-section"></section>
        </div>
    );
};

export default Home;
