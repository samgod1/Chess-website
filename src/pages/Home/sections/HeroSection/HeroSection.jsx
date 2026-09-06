import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import "./HeroSection.css";

const HeroSection = () => {
    useGSAP(() => {
        let mm = gsap.matchMedia();

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

        mm.add("(min-width: 769px)", () => {
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
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="main-content">
                    <div className="hero-text">
                        <span className="top">
                            <span className="hide-text">
                                <p className="h-text">LEARNING</p>
                            </span>
                        </span>
                        <span className="bottom">
                            <span className="hide-text">
                                <p className="h-text">CHESS</p>
                            </span>
                            <span className="hide-text">
                                <p className="h-text">IS </p>
                            </span>
                            <span className="hide-text">
                                <p className="h-text">FUN</p>
                            </span>
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
    );
};

export default HeroSection;
