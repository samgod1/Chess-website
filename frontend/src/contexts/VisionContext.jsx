import { useState, useEffect, createContext } from "react";

export const VisionContext = createContext();

const VisionContextProvider = ({ children }) => {
    const [hasStarted, setHasStarted] = useState(false); //Vision practice
    const [attempts, setAttempts] = useState([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [hasCountdownCompleted, setHasCountdownCompleted] = useState(false);
    const [color, setColor] = useState("white");
    const [selectedColor, setSelectedColor] = useState("white");
    const [randomSquare, setRandomSquare] = useState(null);

    function selectRandomColor() {
        const colors = ["white", "black"];
        const randomNumber = Math.floor(Math.random() * 2);
        console.log(colors[randomNumber]);

        setColor(colors[randomNumber]);
    }

    useEffect(() => {
        if (hasStarted && selectedColor == "random") selectRandomColor();
    }, [hasStarted]);

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
                color,
                setColor,
                selectedColor,
                setSelectedColor,
                randomSquare,
                setRandomSquare,
            }}
        >
            {children}
        </VisionContext.Provider>
    );
};

export default VisionContextProvider;
