import React from "react";

import "./PuzzleSection.css";

const PuzzleSection = () => {
    return (
        <section className="puzzle-section">
            <div className="wrapper" id="first">
                <div className="text-container">
                    <h1>
                        Improve by
                        <br /> solving puzzles
                    </h1>
                    <p>
                        Build pattern recognition by solving puzzles designed
                        for players of all levels.
                    </p>
                </div>
            </div>
            <div className="wrapper" id="second">
                <div className="svg-container">
                    <img src="/images/step.png" alt="puzzle-image" />
                </div>
            </div>
        </section>
    );
};

export default PuzzleSection;
