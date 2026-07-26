import { useState, useRef, useEffect, useContext } from "react";
import gsap from "gsap";

import "./Chessboard.css";
import { VisionContext } from "../../contexts";

const Chessboard = () => {
    const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

    const [randomSquare, setRandomSquare] = useState(null);
    const [countdown, setCountdown] = useState(3);

    const countdownInterval = useRef(null);

    const {
        hasStarted,
        attempts,
        setAttempts,
        setScore,
        hasCountdownCompleted,
        setHasCountdownCompleted,
        color,
    } = useContext(VisionContext);

    function generateRandomChessSquare() {
        const firstRandomNumber = Math.floor(Math.random() * 8);
        const secondRandomNumber = Math.floor(Math.random() * 8);

        const randomSquare =
            alphabets[firstRandomNumber] + numbers[secondRandomNumber];

        setRandomSquare(randomSquare);
    }

    function checkUserInput(e) {
        if (!hasStarted) return;

        const square = e.target;
        const isCorrect = square.id === randomSquare;

        if (isCorrect) setScore((prev) => prev + 1);

        // Prevent a fast click from racing a previous animation on this square
        gsap.killTweensOf(square);

        gsap.to(square, {
            backgroundColor: isCorrect ? "var(--c-green)" : "var(--c-red)",
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onInterrupt: () => {
                gsap.set(square, { clearProps: "backgroundColor" });
            },
        });

        setAttempts([...attempts, { square: randomSquare, isCorrect }]);
    }

    function startCountdown() {
        countdownInterval.current = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
    }

    useEffect(() => {
        if (hasStarted) {
            setCountdown(3);
            startCountdown();
        }
    }, [hasStarted]);

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(countdownInterval.current);
            generateRandomChessSquare();
            setHasCountdownCompleted(true);
        }
    }, [countdown]);

    return (
        <div className="chessboard-container">
            {hasStarted && !hasCountdownCompleted && (
                <div className="display">{countdown}</div>
            )}
            {hasStarted && hasCountdownCompleted && (
                <div className="display">{randomSquare}</div>
            )}
            <div
                className={`chessboard ${color}`}
                onClick={() => {
                    if (hasStarted) {
                        generateRandomChessSquare();
                    }
                }}
            >
                {numbers.map((number, i) => {
                    //Alternating ranks
                    return i % 2 == 0 ? (
                        <div className="rank" key={i}>
                            {alphabets.map((alphabet, i) => {
                                //Alternating squares
                                return i % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={alphabet + number}
                                        onClick={checkUserInput}
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={alphabet + number}
                                        onClick={checkUserInput}
                                        key={i}
                                    ></div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rank" key={i}>
                            {alphabets.map((alphabet, i) => {
                                // Alternating squares
                                return (i + 1) % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={alphabet + number}
                                        onClick={checkUserInput}
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={alphabet + number}
                                        onClick={checkUserInput}
                                        key={i}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Chessboard;
