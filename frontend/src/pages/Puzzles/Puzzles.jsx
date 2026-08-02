import { useEffect, useContext } from "react";

import "./Puzzles.css";
import { Chessboard } from "../../components";
import PuzzlesSidebar from "./components/PuzzlesSidebar/PuzzlesSidebar";
import { ChessboardContext } from "../../contexts";

const Puzzles = () => {
    const { setMode } = useContext(ChessboardContext);

    useEffect(() => {
        setMode("puzzles");
    }, []);
    return (
        <div className="puzzles-page">
            <Chessboard />
            <PuzzlesSidebar />
        </div>
    );
};

export default Puzzles;
