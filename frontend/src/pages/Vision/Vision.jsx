import { useEffect, useState } from "react";

import "./Vision.css";
import { Chessboard } from "../../components/index.js";
import { ColorMenu, TimeMenu, Progress } from "./components/index.js";

const Vision = () => {
    const [started, setStarted] = useState(false); //Vision practice
    const [attempts, setAttempts] = useState([]);
    const [color, setColor] = useState("white");
    const [time, setTime] = useState("15s");
    const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
    const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);
    const [score, setScore] = useState(0);

    return (
        <div className="vision-page">
            <Chessboard
                started={started}
                attempts={attempts}
                setAttempts={setAttempts}
                color={color}
                setScore={setScore}
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
                    {started ? (
                        <Progress score={score} time={time} />
                    ) : (
                        <>
                            <div className="options">
                                <div className="show-coordinates">
                                    <input type="checkbox" />
                                    <span>Show coordinates</span>
                                </div>
                                <div className="button-container">
                                    <button
                                        className="time"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsTimeMenuOpen(!isTimeMenuOpen);
                                            if (isColorMenuOpen) {
                                                setIsColorMenuOpen(false);
                                            }
                                        }}
                                    >
                                        <img
                                            src="/images/time.png"
                                            alt="time"
                                            width={20}
                                            height={20}
                                        />
                                        <span>Time</span>
                                        {isTimeMenuOpen && (
                                            <TimeMenu
                                                time={time}
                                                setTime={setTime}
                                                setIsTimeMenuOpen={
                                                    setIsTimeMenuOpen
                                                }
                                            />
                                        )}
                                    </button>
                                    <button
                                        className="color"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsColorMenuOpen(
                                                !isColorMenuOpen,
                                            );
                                            if (isTimeMenuOpen) {
                                                setIsTimeMenuOpen(false);
                                            }
                                        }}
                                    >
                                        <img
                                            src="/images/color.png"
                                            alt="pawn"
                                            width={20}
                                            height={20}
                                        />
                                        <span>Color</span>
                                        {isColorMenuOpen && (
                                            <ColorMenu
                                                color={color}
                                                setColor={setColor}
                                                isColorMenuOpen={
                                                    isColorMenuOpen
                                                }
                                                setIsColorMenuOpen={
                                                    setIsColorMenuOpen
                                                }
                                            />
                                        )}
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Vision;
