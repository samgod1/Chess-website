import { useState, createContext } from "react";

export const PuzzlesContext = createContext();

const PuzzlesContextProvider = ({ children }) => {
    const [hasPuzzleStarted, setHasPuzzleStarted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [highestLevelReached, setHighestLevelReached] = useState(null);
    const [sidebarMode, setSidebarMode] = useState("notStarted");
    const [colorChangeTrigger, setColorChangeTrigger] = useState(0);

    return (
        <PuzzlesContext.Provider
            value={{
                hasPuzzleStarted,
                setHasPuzzleStarted,
                selectedLevel,
                setSelectedLevel,
                highestLevelReached,
                setHighestLevelReached,
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
