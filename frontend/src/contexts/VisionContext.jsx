import { useState, useEffect, createContext, useContext } from "react";

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

    const { user, loading } = useContext(UserContext);
    const { setColor } = useContext(ChessboardContext);

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

    useEffect(() => {
        if (hasStarted && selectedColor == "random") selectRandomColor();
    }, [hasStarted]);

    useEffect(() => {
        setBestScore(user.bestScore);
    }, []);

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
            }}
        >
            {children}
        </VisionContext.Provider>
    );
};

export default VisionContextProvider;
