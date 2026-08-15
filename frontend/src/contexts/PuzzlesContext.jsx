import { useState, useEffect, createContext, useContext } from "react";
import { puzzles } from "../constants";
import { UserContext } from "./UserContext";

export const PuzzlesContext = createContext();

const PuzzlesContextProvider = ({ children }) => {
    const [hasPuzzleStarted, setHasPuzzleStarted] = useState(false);
    const [color, setColor] = useState("white");
    const [puzzleLevel, setPuzzleLevel] = useState(0);

    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (hasPuzzleStarted) {
            // Set color opposite to fen
            let startColor = puzzles[puzzleLevel].split(" ")[1];
            startColor == "b" ? setColor("white") : setColor("black");
        }
    }, [hasPuzzleStarted]);

    useEffect(() => {
        if (!loading && user) {
            setPuzzleLevel(user.puzzleLevel);
        }
    }, [loading]);

    return (
        <PuzzlesContext.Provider
            value={{
                hasPuzzleStarted,
                setHasPuzzleStarted,
                color,
                setColor,
                puzzleLevel,
                setPuzzleLevel,
            }}
        >
            {children}
        </PuzzlesContext.Provider>
    );
};
export default PuzzlesContextProvider;
