import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Accordion.css";
import { CourseCard } from "../index.js";

const Accordion = ({ text, image, info }) => {
    const [isOpen, setIsOpen] = useState(false);

    const hiddenInnerRef = useRef(null);
    const downArrowRef = useRef(null);

    useGSAP(() => {
        if (isOpen) {
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
                    setIsOpen(!isOpen);
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
                            return (
                                <CourseCard
                                    courseId={courseId}
                                    title={title}
                                    desc={desc}
                                    thumbnail={thumbnail}
                                    link={link}
                                    key={i}
                                />
                            );
                        },
                    )}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
