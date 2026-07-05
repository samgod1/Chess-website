import { useState, useRef, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Accordion.css";
import { CourseCard } from "../index.js";
import { CourseContext } from "../../../../contexts/CourseContext.jsx";

const Accordion = ({ text, image, info, isOpen, setIsOpen, index }) => {
    const hiddenInnerRef = useRef(null);
    const downArrowRef = useRef(null);

    const { completed } = useContext(CourseContext);

    useGSAP(() => {
        if (isOpen[index]) {
            gsap.to(hiddenInnerRef.current, {
                height: "auto",
            });
            gsap.to(
                downArrowRef.current,
                {
                    rotate: 180,
                },
                "<",
            );
        } else {
            gsap.to(hiddenInnerRef.current, {
                height: 0,
            });
            gsap.to(downArrowRef.current, {
                rotate: 0,
            });
        }
    }, [isOpen]);

    return (
        <div className="accordion">
            <div
                className="card"
                onClick={() => {
                    setIsOpen((prev) => {
                        const updatedArray = [...prev];
                        updatedArray[index] = !updatedArray[index];
                        return updatedArray;
                    });
                }}
            >
                <div className="difficulty">
                    <img src={image} alt="medal" width={32} height={32} />
                    <p>{text}</p>
                </div>
                <img
                    src="images/down-arrow.png"
                    alt="down-arrow"
                    width={32}
                    height={32}
                    className="down-arrow"
                    ref={downArrowRef}
                />
            </div>
            <div className="hidden-inner" ref={hiddenInnerRef}>
                <div className="course-cards-container">
                    {info.map(
                        ({ courseId, title, desc, thumbnail, link }, i) => {
                            if (completed.includes(courseId)) {
                                return (
                                    <CourseCard
                                        courseId={courseId}
                                        title={title}
                                        desc={desc}
                                        thumbnail={thumbnail}
                                        link={link}
                                        key={i}
                                        completed={true}
                                    />
                                );
                            } else {
                                return (
                                    <CourseCard
                                        courseId={courseId}
                                        title={title}
                                        desc={desc}
                                        thumbnail={thumbnail}
                                        link={link}
                                        key={i}
                                        completed={false}
                                    />
                                );
                            }
                        },
                    )}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
