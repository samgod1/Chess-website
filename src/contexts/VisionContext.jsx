import { useState, useEffect, createContext, useContext, useRef } from "react";
import gsap from "gsap";

import { UserContext } from "./UserContext";
import updateBestScore from "../apis/user/updateBestScore";

export const VisionContext = createContext();

const VisionContextProvider = ({ children }) => {
    const [hasStarted, setHasStarted] = useState(false);
    const [attempts, setAttempts] = useState([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [hasCountdownCompleted, setHasCountdownCompleted] = useState(false);
    const [selectedColor, setSelectedColor] = useState("white");
    const [randomSquare, setRandomSquare] = useState(null);
    const [bestScore, setBestScore] = useState({
        white: {
            15: 0,
            30: 0,
            45: 0,
        },
        black: {
            15: 0,
            30: 0,
            45: 0,
        },
    });
    const [countdown, setCountdown] = useState(3);
    const [color, setColor] = useState("white");

    const [isCoordinates, setIsCoordinates] = useState(true);

    const countdownInterval = useRef(null);

    function selectRandomColor() {
        const colors = ["white", "black"];
        const randomNumber = Math.floor(Math.random() * 2);

        setColor(colors[randomNumber]);
    }

    //Update best score
    useEffect(() => {
        if (hasStarted && selectedColor === "random") selectRandomColor();

        if (!hasStarted && score > bestScore[color][time]) {
            let updatedBestScore = bestScore;
            updatedBestScore[color][time] = score;

            updateBestScore(updatedBestScore);
            setBestScore((prev) => {
                return {
                    ...prev,
                    [color]: {
                        ...prev[color],
                        [time]: score,
                    },
                };
            });
        }
    }, [hasStarted]);

    return (
        <VisionContext.Provider
            value={{
                color,
                setColor,
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
                setBestScore,
                isCoordinates,
                setIsCoordinates,
                countdown,
                setCountdown,
                countdownInterval,
            }}
        >
            {children}
        </VisionContext.Provider>
    );
};

export default VisionContextProvider;
