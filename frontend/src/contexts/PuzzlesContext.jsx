import { useState, createContext } from "react";

export const PuzzlesContext = createContext();

const PuzzlesContextProvider = ({ children }) => {
    const [hasPuzzleStarted, setHasPuzzleStarted] = useState(false);
    const [color, setColor] = useState("white");

    return (
        <PuzzlesContext.Provider
            value={{
                hasPuzzleStarted,
                color,
                setColor,
            }}
        >
            {children}
        </PuzzlesContext.Provider>
    );
};
export default PuzzlesContextProvider;
