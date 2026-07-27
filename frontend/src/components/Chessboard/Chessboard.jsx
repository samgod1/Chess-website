import { useState, useRef, useEffect, useContext } from "react";
import gsap from "gsap";

import "./Chessboard.css";
import { VisionContext, ChessboardContext } from "../../contexts";
import Coords from "./components/Coords.jsx/Coords";

const Chessboard = () => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];

    const [countdown, setCountdown] = useState(3);

    const countdownInterval = useRef(null);

    const {
        hasStarted,
        attempts,
        setAttempts,
        setScore,
        hasCountdownCompleted,
        setHasCountdownCompleted,
        randomSquare,
        setRandomSquare,
    } = useContext(VisionContext);

    const { color } = useContext(ChessboardContext);

    function generateRandomChessSquare() {
        const firstRandomNumber = Math.floor(Math.random() * 8);
        const secondRandomNumber = Math.floor(Math.random() * 8);

        const randomSquare =
            files[firstRandomNumber] + ranks[secondRandomNumber];

        setRandomSquare(randomSquare);
    }

    function checkUserInput(e) {
        if (!hasStarted || !hasCountdownCompleted) return;

        generateRandomChessSquare();
        hideSquareDisplay();

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

    function hideSquareDisplay() {
        gsap.killTweensOf(".display");
        gsap.fromTo(
            ".display",
            {
                opacity: 1,
            },
            {
                opacity: 0,
                delay: 0.5,
            },
        );
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

    useEffect(() => {
        if (hasCountdownCompleted) hideSquareDisplay();
    }, [hasCountdownCompleted]);

    return (
        <div className="chessboard-container">
            {hasStarted && !hasCountdownCompleted && (
                <div className="display">{countdown}</div>
            )}
            {hasStarted && hasCountdownCompleted && (
                <div className="display">{randomSquare}</div>
            )}
            <div className={`chessboard ${color}`}>
                {ranks.map((rank, i) => {
                    //Alternating ranks
                    return i % 2 == 0 ? (
                        <div className="rank" key={i}>
                            {files.map((file, i) => {
                                //Alternating squares
                                return i % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={file + rank}
                                        onClick={checkUserInput}
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={file + rank}
                                        onClick={checkUserInput}
                                        key={i}
                                    ></div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rank" key={i}>
                            {files.map((file, i) => {
                                // Alternating squares
                                return (i + 1) % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={file + rank}
                                        onClick={checkUserInput}
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={file + rank}
                                        onClick={checkUserInput}
                                        key={i}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                })}
                <Coords files={files} ranks={ranks} color={color} />
            </div>
        </div>
    );
};

export default Chessboard;
