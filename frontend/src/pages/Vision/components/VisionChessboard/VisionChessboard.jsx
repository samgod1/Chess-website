import { useState, useRef, useEffect, useContext } from "react";
import gsap from "gsap";

import "./VisionChessboard.css";
import { UserContext, VisionContext } from "../../../../contexts";
import Coords from "./components/Coords/Coords";

const VisionChessboard = () => {
    const [files, setFiles] = useState([
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
    ]);
    const [ranks, setRanks] = useState([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
    ]);
    const [chessboardSize, setChessboardSize] = useState(0);

    const countdownInterval = useRef(null);
    const correctAudioRef = useRef(null);
    const incorrectAudioRef = useRef(null);
    const countdownAudioRef = useRef(null);
    const startAudioRef = useRef(null);
    const chessboardContainerRef = useRef(null);

    const {
        color,
        hasStarted,
        setHasStarted,
        attempts,
        setAttempts,
        setScore,
        randomSquare,
        setRandomSquare,
        isCoordinates,
        countdown,
        setCountdown,
        hasCountdownCompleted,
        setHasCountdownCompleted,
        setBestScore,
    } = useContext(VisionContext);
    const { user } = useContext(UserContext);

    function calculateChessboardSize() {
        let chessboardContainerWidth =
            chessboardContainerRef.current.offsetWidth;

        while (chessboardContainerWidth % 4 != 0) {
            chessboardContainerWidth -= 1;
        }

        setChessboardSize(chessboardContainerWidth);
    }

    function startCountdown() {
        countdownInterval.current = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
    }

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

    function handleComponentUnmount() {
        setChessboardSize(0);
        setHasCountdownCompleted(false);
        clearInterval(countdownInterval.current);
        setCountdown(3);
    }

    useEffect(() => {
        if (hasStarted) {
            setCountdown(3);
            startCountdown();
            countdownAudioRef.current.play();
        }
    }, [hasStarted]);

    useEffect(() => {
        // Handle countdown finish
        if (countdown <= 0) {
            clearInterval(countdownInterval.current);
            generateRandomChessSquare();
            setHasCountdownCompleted(true);
            startAudioRef.current.play();
        }

        // Play the countdown audio on every countdown update
        if (hasStarted && !countdown <= 0) {
            countdownAudioRef.current.currentTime = 0;
            countdownAudioRef.current.play();
        }
    }, [countdown]);

    useEffect(() => {
        if (hasCountdownCompleted) hideSquareDisplay();
    }, [hasCountdownCompleted]);

    useEffect(() => {
        calculateChessboardSize();
        setBestScore(user?.bestScore || 0);

        return () => {
            handleComponentUnmount();
        };
    }, []);

    return (
        <div
            className="vision-chessboard-container"
            ref={chessboardContainerRef}
        >
            {hasStarted && !hasCountdownCompleted && (
                <div className="display">{countdown}</div>
            )}
            {hasStarted && hasCountdownCompleted && (
                <div className="display">{randomSquare}</div>
            )}
            <div
                className={`vision-chessboard ${color}`}
                style={{ width: chessboardSize, height: chessboardSize }}
            >
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
            </div>
            <audio src="/sounds/success.mp3" ref={correctAudioRef} />
            <audio src="/sounds/error.mp3" ref={incorrectAudioRef} />
            <audio src="/sounds/countdown.mp3" ref={countdownAudioRef} />
            <audio src="/sounds/start.mp3" ref={startAudioRef} />
        </div>
    );
};

export default VisionChessboard;
