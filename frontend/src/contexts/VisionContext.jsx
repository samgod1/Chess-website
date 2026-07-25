import { useState, createContext } from "react";

export const VisionContext = createContext();

const VisionContextProvider = ({ children }) => {
    const [hasStarted, setHasStarted] = useState(false); //Vision practice
    const [attempts, setAttempts] = useState([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [hasCountdownCompleted, setHasCountdownCompleted] = useState(false);

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
            }}
        >
            {children}
        </VisionContext.Provider>
    );
};

export default VisionContextProvider;
