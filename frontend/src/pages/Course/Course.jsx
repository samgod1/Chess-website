import { useContext, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { Accordion, ProgressBar } from "./components/index.js";
import {
    beginnerCourse,
    intermediateCourse,
    advanceCourse,
} from "../../constants.js";
import { CourseContext, UserContext } from "../../contexts/index.js";

import "./Course.css";

const Course = () => {
    const navigate = useNavigate();

    const { completed, setCompleted, isOpen, setIsOpen, total, medals } =
        useContext(CourseContext);
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/signup");
            toast.error("You have to signup / login first");
        }
    }, [loading]);

    useEffect(() => {
        console.log(medals);
    }, [medals]);

    return (
        <div className="course-page">
            <div className="banner">
                <img src="/images/banner.png" alt="banner" />
            </div>
            <div className="main-content">
                <div className="course">
                    <Accordion
                        text={"Beginner"}
                        image={"/images/bronze-medal.png"}
                        info={beginnerCourse}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        index={0}
                    />
                    <Accordion
                        text={"Intermediate"}
                        image={"/images/silver-medal.png"}
                        info={intermediateCourse}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        index={1}
                    />
                    <Accordion
                        text={"Advanced"}
                        image={"/images/gold-medal.png"}
                        info={advanceCourse}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        index={2}
                    />
                </div>
                <div className="course-info">
                    <div className="progress-container">
                        <h2>Progress</h2>
                        <div className="progress-info">
                            <ProgressBar
                                total={total}
                                completed={completed.length}
                            />
                            <div className="progress-count">
                                {completed.length}/{total}
                            </div>
                        </div>
                    </div>
                    <div className="learning-info">
                        <h2>What you'll learn</h2>
                        <div className="levels-info">
                            <div className="beginner">
                                <h3>Beginner (0 - 1000)</h3>
                                <ul>
                                    <li>How to move pieces</li>
                                    <li>How to checkmate</li>
                                    <li>Rules of chess</li>
                                    <li>Easy openings for both colors</li>
                                </ul>
                            </div>
                            <div className="intermediate">
                                <h3>Intermediate (1000-1600)</h3>
                                <ul>
                                    <li>
                                        Basic principles that good players
                                        follow
                                    </li>
                                    <li>Different tactics and tips</li>
                                    <li>
                                        Making plans and calculating positions
                                    </li>
                                    <li>Basic endgames</li>
                                    <li>Analyzing your games</li>
                                    <li>Time management</li>
                                </ul>
                            </div>
                            <div className="advanced">
                                <h3>Advanced (1600 - 2000)</h3>
                                <ul>
                                    <li>Simple but effective rules</li>
                                    <li>Importance of pawn play</li>
                                    <li>Spotting weaknesses in positions</li>
                                    <li>The woodpecker method</li>
                                    <li>Approaching endgames like a pro</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="badges">
                        <h2>Earned badges</h2>
                        <div className="earned">
                            {medals?.includes("gold") ? (
                                <div className="professional-badge">
                                    <img
                                        src="/images/gold-medal.png"
                                        alt="gold-medal"
                                        height={40}
                                    />
                                </div>
                            ) : (
                                <div className="hollow-badge">
                                    <img
                                        src="/images/hollow-medal.png"
                                        alt="hollow-medal"
                                        height={40}
                                    />
                                </div>
                            )}
                            {medals?.includes("silver") ? (
                                <div className="intemediate-badge">
                                    <img
                                        src="/images/silver-medal.png"
                                        alt="silver-medal"
                                        height={40}
                                    />
                                </div>
                            ) : (
                                <div className="hollow-badge">
                                    <img
                                        src="/images/hollow-medal.png"
                                        alt="hollow-medal"
                                        height={40}
                                    />
                                </div>
                            )}

                            {medals?.includes("bronze") ? (
                                <div className="beginner-badge">
                                    <img
                                        src="/images/bronze-medal.png"
                                        alt="bronze-medal"
                                        height={40}
                                    />
                                </div>
                            ) : (
                                <div className="hollow-badge">
                                    <img
                                        src="/images/hollow-medal.png"
                                        alt="hollow-medal"
                                        height={40}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
