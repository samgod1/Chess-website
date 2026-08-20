import { useState, useRef, useEffect, createContext, useContext } from "react";
import { puzzles } from "../constants";
import { UserContext } from "./UserContext";

export const PuzzlesContext = createContext();

const PuzzlesContextProvider = ({ children }) => {
    const [hasPuzzleStarted, setHasPuzzleStarted] = useState(false);
    const [puzzleLevel, setPuzzleLevel] = useState(1);
    const [sidebarMode, setSidebarMode] = useState("notStarted");
    const [colorChangeTrigger, setColorChangeTrigger] = useState(0);

    return (
        <PuzzlesContext.Provider
            value={{
                hasPuzzleStarted,
                setHasPuzzleStarted,
                puzzleLevel,
                setPuzzleLevel,
                sidebarMode,
                setSidebarMode,
                colorChangeTrigger,
                setColorChangeTrigger,
            }}
        >
            {children}
        </PuzzlesContext.Provider>
    );
};
export default PuzzlesContextProvider;
