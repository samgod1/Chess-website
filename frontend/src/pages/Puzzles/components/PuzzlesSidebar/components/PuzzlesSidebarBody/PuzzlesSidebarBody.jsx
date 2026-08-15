import React, { useContext, useEffect } from "react";

import { puzzles } from "../../../../../../constants";
import "./PuzzlesSidebarBody.css";
import {
    ChessboardContext,
    PuzzlesContext,
} from "../../../../../../contexts/index.js";

const PuzzlesSidebarBody = () => {
    const { puzzleLevel } = useContext(ChessboardContext);
    const { setHasPuzzleStarted } = useContext(PuzzlesContext);

    function getLevelClassName(i) {
        if (i < puzzleLevel) return "level-btn completed";
        if (i == puzzleLevel) return "level-btn current";
        if (i > puzzleLevel) return "level-btn locked";
    }

    return (
        <div className="puzzles-sidebar-body">
            <div className="levels-container">
                {[...Array(puzzles.length)].map((_, i) => {
                    return (
                        <div className={getLevelClassName(i)} key={i}>
                            {i}
                        </div>
                    );
                })}
            </div>
            <button
                className="start-puzzle-btn"
                onClick={() => {
                    setHasPuzzleStarted(true);
                }}
            >
                Start Puzzle
            </button>
        </div>
    );
};

export default PuzzlesSidebarBody;
