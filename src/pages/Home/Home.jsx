import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";

import "./Home.css";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
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

		ScrollTrigger.create({
			trigger: ".hero-section",
			start: "top top",
			end: "bottom top",
			pin: true,
			pinSpacing: false,
			scrub: true,
		});
	}, []);

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
				<p className="text">
					Brand has courses for all levels of players. The courses are
					structured precisely to help you improve quickly. The courses are
					designed by top chess players with decades of experience
				</p>
			</section>

			<section className="puzzles-section"></section>
		</div>
	);
};

export default Home;
