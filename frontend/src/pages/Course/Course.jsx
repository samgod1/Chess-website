import { useContext, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router";

import { Accordion, ProgressBar } from "./components/index.js";
import {
    beginnerCourse,
    intermediateCourse,
    professionalCourse,
} from "../../constants.js";
import { CourseContext, UserContext } from "../../contexts/index.js";

import "./Course.css";

const Course = () => {
    const navigate = useNavigate();

    const { completed, setCompleted, isOpen, setIsOpen, total } =
        useContext(CourseContext);
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/signup");
        }
    }, [loading]);

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
                        text={"Professional"}
                        image={"/images/gold-medal.png"}
                        info={professionalCourse}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        index={2}
                    />
                </div>
                <div className="info">
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
                                <h3>Beginner</h3>
                                <ul>
                                    <li>How to move pieces</li>
                                    <li>How to checkmate</li>
                                    <li>Rules of chess</li>
                                </ul>
                            </div>
                            <div className="intermediate">
                                <h3>Intermediate</h3>
                                <ul>
                                    <li>How to move pieces</li>
                                    <li>How to checkmate</li>
                                    <li>Rules of chess</li>
                                </ul>
                            </div>
                            <div className="professional">
                                <h3>Professional</h3>
                                <ul>
                                    <li>How to move pieces</li>
                                    <li>How to checkmate</li>
                                    <li>Rules of chess</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="badges">
                        <h2>Earned badges</h2>
                        <div className="earned">
                            <div className="professional-badge">
                                <img
                                    src="/images/gold-medal.png"
                                    alt="gold-medal"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="intermediate-badge">
                                <img
                                    src="/images/silver-medal.png"
                                    alt="silver-medal"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="beginner-badge">
                                <img
                                    src="/images/bronze-medal.png"
                                    alt="bronze-medal"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
