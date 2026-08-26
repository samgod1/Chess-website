import { useState, createContext, useEffect } from "react";

export const PuzzlesContext = createContext();

const PuzzlesContextProvider = ({ children }) => {
    const [hasPuzzleStarted, setHasPuzzleStarted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [highestLevelReached, setHighestLevelReached] = useState(null);
    const [sidebarMode, setSidebarMode] = useState("notStarted");
    const [colorChangeTrigger, setColorChangeTrigger] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [hintPiece, setHintPiece] = useState(null);
    const [isHintButtonDisabled, setIsHintButtonDisabled] = useState(false);

    useEffect(() => {
        console.log(isHintButtonDisabled);
    }, [isHintButtonDisabled]);

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
                showHint,
                setShowHint,
                hintPiece,
                setHintPiece,
                isHintButtonDisabled,
                setIsHintButtonDisabled,
            }}
        >
            {children}
        </PuzzlesContext.Provider>
    );
};
export default PuzzlesContextProvider;
