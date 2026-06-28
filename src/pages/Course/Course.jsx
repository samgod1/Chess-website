import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Accordion, ProgressBar } from "../../components/index.js";

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
                        text={"Professional"}
                        image={"/images/gold-medal.png"}
                    />
                </div>
                <div className="info">
                    <div className="progress-container">
                        <span>Progress</span>
                        <ProgressBar total={10} completed={0} />
                        <div className="progress-count"></div>
                    </div>
                    <div className="learning-info">
                        <span>What you'll learn</span>
                        <div className="beginner">
                            <span>Beginner</span>
                            <ul></ul>
                        </div>
                        <div className="intermediate">
                            <span>Intermediate</span>
                            <ul></ul>
                        </div>
                        <div className="professional">
                            <span>Professional</span>
                            <ul></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
