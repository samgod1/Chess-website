import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

import "./VisualizationSection.css";
import { visualizedMoves } from "../../../../constants.js";

const VisualizationSection = () => {
    useGSAP(() => {
        const textSplit = SplitText.create(".visualization-heading", {
            type: "chars",
        });
        const visualizationTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".visualization-section",
                start: "top top",
                pin: true,
                pinSpacing: true,
                scrub: true,
            },
        });
        visualizationTl.from(textSplit.chars, {
            autoAlpha: 0,
            stagger: 0.05,
        });
        visualizationTl.to(".visualization-heading", {
            scale: 0.9,
            opacity: 0,
        });
        visualizationTl.from(".person-visualizing-img", {
            opacity: 0,
        });
        visualizationTl.from(".move", {
            opacity: 0,
            scale: 0.9,
            stagger: 0.05,
        });
    }, []);

    return (
        <section className="visualization-section">
            <div className="text-wrapper">
                <p className="visualization-heading">Practice Visualization</p>
            </div>

            <div className="body-wrapper">
                <div className="img-container">
                    {visualizedMoves.map((info, i) => {
                        return (
                            <span className="move" key={i} style={info}>
                                {info.move}
                            </span>
                        );
                    })}
                    <img
                        src="/images/visualization-person.png"
                        alt="person-visualizing-img"
                        className="person-visualizing-img"
                    />
                </div>
            </div>
        </section>
    );
};

export default VisualizationSection;
