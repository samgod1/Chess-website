import { useState, useEffect, useContext, Activity } from "react";

import "./Info.css";
import { VisionContext } from "../../../../../../../../contexts/VisionContext.jsx";

const Info = () => {
    const { randomSquare, score, hasStarted, bestScore, time, color } =
        useContext(VisionContext);

    return (
        <div className="info">
            <div className="square-container">
                <div className="square"></div>
                <span>{randomSquare ? randomSquare : "e4"}</span>
            </div>
            <Activity mode={!hasStarted ? "visible" : "hidden"}>
                <div className="scores-container">
                    <div className="current">
                        <span>Current:</span>
                        <span className="score">{score}</span>
                    </div>
                    <div className="best">
                        <span>Best:</span>
                        <span className="score">{bestScore[color][time]}</span>
                    </div>
                </div>
            </Activity>
        </div>
    );
};

export default Info;
