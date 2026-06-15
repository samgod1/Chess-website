import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import "./CoursesSection.css";
import { coursesTextArray } from "../../../../constants";

const CoursesSection = () => {
    const [courseLevel, setCourseLevel] = useState("Beginner");
    const [courseTitle, setCourseTitle] = useState("How to play chess");

    useGSAP(() => {
        // Text revealing animation in courses section
        const coursesSectionTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".courses-section",
                start: "top top",
                end: "+=1000px",
                pin: true,
                pinSpacing: true,
                scrub: true,
            },
        });

        // Text Reveal Animation
        coursesSectionTl.to(".ghost-block", {
            opacity: 0,
            stagger: 0.075,
            duration: 1,
        });

        coursesSectionTl.from(
            ".word",
            {
                opacity: 0,
                stagger: 0.075,
                duration: 1,
            },
            "<",
        );

        // Card Stacking animation
        coursesSectionTl.to("#second-card", {
            top: "1rem",
            duration: 4,
        });

        coursesSectionTl.to(".courseTitle", {
            opacity: 0,
        });

        coursesSectionTl.call(
            () => {
                const direction = coursesSectionTl.scrollTrigger.direction;
                if (direction === 1) {
                    setCourseLevel("Intermediate");
                    setCourseTitle("Intermediate chess openings");
                } else if (direction === -1) {
                    setCourseLevel("Beginner");
                    setCourseTitle("How to play chess");
                }
            },
            null,
            ">",
        );

        coursesSectionTl.to(".courseTitle", {
            opacity: 1,
        });

        coursesSectionTl.to("#third-card", {
            top: "2rem",
            duration: 4,
        });

        coursesSectionTl.to(".courseTitle", {
            opacity: 0,
        });

        coursesSectionTl.call(
            () => {
                const direction = coursesSectionTl.scrollTrigger.direction;
                if (direction === 1) {
                    setCourseLevel("Professional");
                    setCourseTitle("Professional chess openings");
                } else if (direction === -1) {
                    setCourseLevel("Intermediate");
                    setCourseTitle("Intermediate chess openings");
                }
            },
            null,
            ">",
        );

        coursesSectionTl.to(".courseTitle", {
            opacity: 1,
        });
    }, []);

    return (
        <section className="courses-section">
            <div className="text-content">
                <p className="text">
                    {coursesTextArray.map((text, i) => (
                        <React.Fragment key={i}>
                            <span className="wrapper">
                                <span className="word">{text}</span>
                                <span className="ghost-block"></span>
                            </span>
                            <span> </span>
                        </React.Fragment>
                    ))}
                </p>
            </div>
            <div className="thumbnail-content">
                <div className="wrapper">
                    <div className="courseInfo">
                        <div className="level">
                            <span>Level: </span>
                            <span className="courseLevel">{courseLevel}</span>
                        </div>
                        <div className="courseTitle">{courseTitle}</div>
                    </div>
                    <div className="card-container" id="first-card">
                        <div className="thumbnail-card">
                            <img src="thumbnail2.jpg" alt="first-thumbnail" />
                        </div>
                        <div className="thumbnail-card" id="second-card">
                            <img src="thumbnail1.jpg" alt="second-thumbnail" />
                        </div>
                        <div className="thumbnail-card" id="third-card">
                            <img src="thumbnail3.jpg" alt="third-thumbnail" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
