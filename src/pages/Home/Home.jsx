import React from "react";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

import "./Home.css";
import {
    HeroSection,
    CoursesSection,
    PuzzleSection,
    VisualizationSection,
} from "./sections/index.js";
import { Navbar } from "../../components/index.js";

gsap.registerPlugin(ScrollTrigger, SplitText);
// gsap.registerPlugin(SplitText);

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <HeroSection />
            <CoursesSection />
            <PuzzleSection />
            <VisualizationSection />
        </div>
    );
};

export default Home;
