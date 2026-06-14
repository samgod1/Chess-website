import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";

import "./Home.css";
import { coursesText } from "../../constants";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const [courseTitle, setCourseTitle] = useState("How to play chess");

    useGSAP(() => {
        let split = SplitText.create(".hero-text", { type: "lines" });

        const heroTl = gsap.timeline();

        heroTl.from(".img-container", {
            delay: 0.5,
            autoAlpha: 0,
            duration: 1.5,
        });

        heroTl.from(
            ".h-text",
            {
                stagger: 0.1,
                yPercent: 100,
                ease: "back.inOut",
                duration: 1.5,
            },
            "-=1.5",
        );

        heroTl.from(
            ".cta",
            {
                autoAlpha: 0,
                duration: 0.5,
            },
            "-=.5",
        );

        // Stacking and shrinking page animation
        ScrollTrigger.create({
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: true,
            animation: gsap.to(".hero-container", {
                scale: 0.9,
            }),
        });

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
        const thumbnailAnime = coursesSectionTl.to("#second-card", {
            top: "1rem",
            duration: 4,
            onUpdate: function () {
                if (this.progress() === 1) {
                    setCourseTitle("Intermediate chess openings");
                } else {
                    setCourseTitle("How to play chess");
                }
            },
        });

        coursesSectionTl.to("#third-card", {
            top: "2rem",
            duration: 4,
            onUpdate: function () {
                if (this.progress() === 1) {
                    setCourseTitle("Professional chess openings");
                } else {
                    setCourseTitle("Intermediate chess openings");
                }
            },
        });
    }, []);

    const coursesTextArray = coursesText.split(" ");

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
            <section className="hero-section">
                <div className="hero-container">
                    <div className="main-content">
                        <div className="hero-text">
                            <span className="hide-text">
                                <p className="h-text">LEARNING</p>
                            </span>
                            <span className="hide-text">
                                <p className="h-text">CHESS IS FUN</p>
                            </span>
                        </div>
                        <button className="cta">Let's go</button>
                    </div>
                    <div className="img-container">
                        <img src="/images/hero-img.png" alt="image" />
                    </div>
                </div>
                <div className="gradient"></div>
            </section>

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
                        <div className="text">
                            <div className="level">
                                <span>Level: </span>
                                <span>Beginner</span>
                            </div>
                            <div className="title">{courseTitle}</div>
                        </div>
                        <div className="card-container" id="first-card">
                            <div className="thumbnail-card">
                                <img
                                    src="thumbnail2.jpg"
                                    alt="first-thumbnail"
                                />
                            </div>
                            <div className="thumbnail-card" id="second-card">
                                <img
                                    src="thumbnail1.jpg"
                                    alt="second-thumbnail"
                                />
                            </div>
                            <div className="thumbnail-card" id="third-card">
                                <img
                                    src="thumbnail3.jpg"
                                    alt="third-thumbnail"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="puzzles-section"></section>
        </div>
    );
};

export default Home;
