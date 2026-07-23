import { useEffect, useState } from "react";

import "./Vision.css";
import { Chessboard } from "../../components/index.js";

const Vision = () => {
    const [started, setStarted] = useState(false); //Vision practice
    const [attempts, setAttempts] = useState([]);

    return (
        <div className="vision-page">
            <Chessboard
                started={started}
                attempts={attempts}
                setAttempts={setAttempts}
            />
            <div className="sidebar">
                <div className="sidebar-header">
                    <img
                        src="/images/vision.png"
                        alt="vision"
                        width={40}
                        height={40}
                    />
                    <p>Vision</p>
                </div>
                <div className="sidebar-body">
                    <div className="attempts-container">
                        <div className="attempts">
                            {attempts.map(({ square, isCorrect }, i) => {
                                return isCorrect ? (
                                    <div className="square correct" key={i}>
                                        {square}
                                    </div>
                                ) : (
                                    <div className="square incorrect" key={i}>
                                        {square}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="options">
                        <div className="show-coordinates">
                            <input type="checkbox" />
                            <span>Show coordinates</span>
                        </div>
                        <div className="button-container">
                            <button className="time">
                                <img
                                    src="/images/time.png"
                                    alt="time"
                                    width={20}
                                    height={20}
                                />
                                <span>Time</span>
                            </button>
                            <button className="color">
                                <img
                                    src="/images/color.png"
                                    alt="pawn"
                                    width={20}
                                    height={20}
                                />
                                <span>Color</span>
                            </button>
                        </div>
                    </div>
                    <button
                        className="start"
                        onClick={() => {
                            setStarted(true);
                        }}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Vision;
