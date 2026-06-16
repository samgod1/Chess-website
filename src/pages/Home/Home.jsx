import React from "react";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import "./Home.css";
import {
    HeroSection,
    CoursesSection,
    PuzzleSection,
} from "./sections/index.js";
import { Navbar } from "../../components/index.js";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <HeroSection />
            <CoursesSection />
            <PuzzleSection />
        </div>
    );
};

export default Home;
