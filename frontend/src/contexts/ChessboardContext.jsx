import { useState, createContext } from "react";

export const ChessboardContext = createContext();

const ChessboardContextProvider = ({ children }) => {
    const [color, setColor] = useState("white");

    return (
        <ChessboardContext.Provider value={{ color, setColor }}>
            {children}
        </ChessboardContext.Provider>
    );
};

export default ChessboardContextProvider;
