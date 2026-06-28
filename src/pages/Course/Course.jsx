import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Accordion } from "../../components/index.js";

import "./Course.css";

const Course = () => {
    return (
        <div className="course-page">
            <div className="banner">This is a banner</div>
            <div className="wrapper">
                <div className="course">
                    <Accordion
                        text={"Beginner"}
                        image={"/images/bronze-medal.png"}
                    />
                    <Accordion
                        text={"Intermediate"}
                        image={"/images/silver-medal.png"}
                    />
                    <Accordion
                        text={"Advanced"}
                        image={"/images/gold-medal.png"}
                    />
                </div>
                <div className="info"></div>
            </div>
        </div>
    );
};

export default Course;
