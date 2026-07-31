import { useState, createContext } from "react";

export const ChessboardContext = createContext();

const ChessboardContextProvider = ({ children }) => {
    const [color, setColor] = useState("white");
    const [selectedPiece, setSelectedPiece] = useState(null);

    return (
        <ChessboardContext.Provider value={{ color, setColor }}>
            {children}
        </ChessboardContext.Provider>
    );
};

export default ChessboardContextProvider;
