import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useContext } from "react";

import "./ProgressBar.css";
import { CourseContext } from "../../../../contexts/CourseContext";

const ProgressBar = ({ total }) => {
    const { completed, hasCompleted, setHasCompleted } =
        useContext(CourseContext);

    useGSAP(() => {
        if (hasCompleted) {
            const progress = Math.floor((completed.length / total) * 100);
            setHasCompleted(false);
            gsap.fromTo(
                ".progress",
                {
                    width: 0,
                },
                {
                    width: progress + "%",
                },
            );
        } else {
            const progress = Math.floor((completed.length / total) * 100);

            gsap.set(".progress", {
                width: progress + "%",
            });
        }
    }, [hasCompleted, completed]);

    return (
        <div className="progress-bar">
            <div className="progress"></div>
        </div>
    );
};

export default ProgressBar;
