import React from "react";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

import "./Home.css";
import {
    HeroSection,
    CoursesSection,
    PuzzleSection,
    VisualizationSection,
} from "./sections/index.js";
import { Navbar } from "../../components/index.js";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const Home = () => {
    useGSAP(() => {
        ScrollSmoother.create({
            smooth: 1,
            effects: true,
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
        });
    }, []);

    return (
        <div id="smooth-wrapper">
            <div className="home-page" id="smooth-content">
                <HeroSection />
                <CoursesSection />
                <PuzzleSection />
                <VisualizationSection />
            </div>
        </div>
    );
};

export default Home;
