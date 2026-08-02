import { useState, useEffect, createContext, useContext, useRef } from "react";
import gsap from "gsap";

import { UserContext } from "./UserContext";
import updateBestScore from "../../apis/user/updateBestScore";
import { ChessboardContext } from "./ChessboardContext";

export const VisionContext = createContext();

const VisionContextProvider = ({ children }) => {
    const [hasStarted, setHasStarted] = useState(false); //Vision practice
    const [attempts, setAttempts] = useState([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [hasCountdownCompleted, setHasCountdownCompleted] = useState(false);
    const [selectedColor, setSelectedColor] = useState("white");
    const [randomSquare, setRandomSquare] = useState(null);
    const [bestScore, setBestScore] = useState(0);
    const [countdown, setCountdown] = useState(3);

    //Don't want this to update chessboard as a whole, so that's why this isn't place in ChessboardContext
    const [isCoordinates, setIsCoordinates] = useState(true);

    const countdownInterval = useRef(null);
    const correctAudioRef = useRef(null);
    const incorrectAudioRef = useRef(null);
    const countdownAudioRef = useRef(null);
    const startAudioRef = useRef(null);

    const { user, loading } = useContext(UserContext);
    const { setColor, files, ranks } = useContext(ChessboardContext);

    function selectRandomColor() {
        const colors = ["white", "black"];
        const randomNumber = Math.floor(Math.random() * 2);
        console.log(colors[randomNumber]);

        setColor(colors[randomNumber]);
    }

    function checkForNewBest(scoreRef) {
        if (scoreRef.current > bestScore) {
            setBestScore(scoreRef.current);
            updateBestScore(scoreRef.current);
        }
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
        if (hasStarted && selectedColor == "random") selectRandomColor();
    }, [hasStarted]);

    useEffect(() => {
        if (!loading && user) setBestScore(user?.bestScore || 0);
    }, [loading]);

    return (
        <VisionContext.Provider
            value={{
                attempts,
                setAttempts,
                hasStarted,
                setHasStarted,
                score,
                setScore,
                hasCountdownCompleted,
                setHasCountdownCompleted,
                time,
                setTime,
                selectedColor,
                setSelectedColor,
                randomSquare,
                setRandomSquare,
                bestScore,
                checkForNewBest,
                isCoordinates,
                setIsCoordinates,
                countdown,
                setCountdown,
                correctAudioRef,
                incorrectAudioRef,
                countdownAudioRef,
                startAudioRef,
                checkUserInput,
            }}
        >
            {children}
        </VisionContext.Provider>
    );
};

export default VisionContextProvider;
