import { useState, useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Chessboard.css";
import { VisionContext, ChessboardContext } from "../../contexts";
import Coords from "./components/Coords.jsx/Coords";

const Chessboard = () => {
    const [countdown, setCountdown] = useState(3);

    const countdownInterval = useRef(null);
    const correctAudioRef = useRef(null);
    const incorrectAudioRef = useRef(null);
    const countdownAudioRef = useRef(null);
    const startAudioRef = useRef(null);

    const {
        hasStarted,
        attempts,
        setAttempts,
        setScore,
        hasCountdownCompleted,
        setHasCountdownCompleted,
        randomSquare,
        setRandomSquare,
        isCoordinates,
    } = useContext(VisionContext);

    const {
        color,
        files,
        ranks,
        fen,
        chessboardRef,
        chessboardContainerRef,
        setChessboardWidth,
        displayCorrectPiece,
    } = useContext(ChessboardContext);

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

        if (isCorrect) {
            correctAudioRef.current.currentTime = 0;
            correctAudioRef.current.play();
        } else {
            incorrectAudioRef.current.currentTime = 0;
            incorrectAudioRef.current.play();
        }

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
            countdownAudioRef.current.play();
        }
    }, [hasStarted]);

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(countdownInterval.current);
            generateRandomChessSquare();
            setHasCountdownCompleted(true);
            startAudioRef.current.play();
        }

        if (hasStarted && !countdown <= 0) {
            countdownAudioRef.current.currentTime = 0;
            countdownAudioRef.current.play();
        }
    }, [countdown]);

    useEffect(() => {
        if (hasCountdownCompleted) hideSquareDisplay();
    }, [hasCountdownCompleted]);

    useEffect(() => {
        setChessboardWidth();
    }, []);

    return (
        <div className="chessboard-container" ref={chessboardContainerRef}>
            {hasStarted && !hasCountdownCompleted && (
                <div className="display">{countdown}</div>
            )}
            {hasStarted && hasCountdownCompleted && (
                <div className="display">{randomSquare}</div>
            )}
            <div className={`chessboard ${color}`} ref={chessboardRef}>
                {/* Ranks and Files */}
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

                {isCoordinates && (
                    <Coords files={files} ranks={ranks} color={color} />
                )}

                {/* Mapping out pieces through fen */}
                {fen
                    .split(" ")[0]
                    .split("/")
                    .map((row, i) => {
                        let squareIndex = 0;
                        return row.split("").map((piece, j) => {
                            const isNumber = /^[0-9]+$/.test(piece);
                            if (!isNumber) {
                                squareIndex += 1;
                                return (
                                    <div
                                        className="piece"
                                        style={{
                                            transform: `translate(${(chessboardRef.current?.offsetWidth / 8) * (squareIndex - 1) || 0}px, ${(chessboardRef.current?.offsetHeight / 8) * i || 0}px)`,
                                        }}
                                        key={j}
                                    >
                                        {displayCorrectPiece(piece)}
                                    </div>
                                );
                            } else {
                                squareIndex += piece;
                                return;
                            }
                        });
                    })}
            </div>
            <audio src="/sounds/success.mp3" ref={correctAudioRef} />
            <audio src="/sounds/error.mp3" ref={incorrectAudioRef} />
            <audio src="/sounds/countdown.mp3" ref={countdownAudioRef} />
            <audio src="/sounds/start.mp3" ref={startAudioRef} />
        </div>
    );
};

export default Chessboard;
