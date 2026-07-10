import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import "./ProgressBar.css";

const ProgressBar = ({ total, completed }) => {
    const progress = Math.floor((completed / total) * 100);

    useGSAP(() => {
        gsap.to(".progress", {
            width: progress + "%",
        });
    }, [progress]);

    return (
        <div className="progress-bar">
            <div className="progress"></div>
        </div>
    );
};

export default ProgressBar;
