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
        calculateChessboardWidth,
        chessboardWidth,
        squareWidth,
        displayCorrectPiece,
        destinationSquares,
        movePiece,
        handlePieceClick,
        handleSquareClick,
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
        calculateChessboardWidth();
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
                                        onClick={() => {
                                            checkUserInput();
                                            handleSquareClick();
                                        }}
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={file + rank}
                                        onClick={() => {
                                            checkUserInput();
                                            handleSquareClick();
                                        }}
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
                                        onClick={() => {
                                            checkUserInput();
                                            handleSquareClick();
                                        }}
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={file + rank}
                                        onClick={() => {
                                            checkUserInput();
                                            handleSquareClick();
                                        }}
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
                        // Looping through the rows
                        let squareIndex = 0;
                        return row.split("").map((piece, j) => {
                            // Mapping the pieces in the row

                            //Testing if the fen character is a number with regex
                            const isNumber = /^[0-9]+$/.test(piece);

                            if (!isNumber) {
                                // squareIndex for skipping squares where there are no pieces
                                squareIndex += 1;
                                return (
                                    <div
                                        className="piece"
                                        style={{
                                            transform: `translate(${squareWidth * (squareIndex - 1)}px, ${squareWidth * i}px)`,
                                        }}
                                        // Finding which square the piece (Right works now only for white pieces) Fix this later
                                        squareid={
                                            files[squareIndex - 1] +
                                            ranks[7 - i]
                                        }
                                        key={j}
                                        onClick={handlePieceClick}
                                    >
                                        {displayCorrectPiece(piece)}
                                    </div>
                                );
                            } else {
                                squareIndex += Number(piece);
                                return;
                            }
                        });
                    })}

                {/* Mapping out destination squares */}
                {destinationSquares.map((square, i) => {
                    const fileNumber = files.indexOf(square.split("")[0]);
                    const rankNumber = 7 - Number(square.split("")[1] - 1);

                    return (
                        <div
                            className="destSquare"
                            style={{
                                transform: `translate(${fileNumber * squareWidth}px, ${rankNumber * squareWidth}px)`,
                            }}
                            key={i}
                            squareid={square}
                            onClick={movePiece}
                        >
                            <img src="/images/dot.png" alt="dot" />
                        </div>
                    );
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
