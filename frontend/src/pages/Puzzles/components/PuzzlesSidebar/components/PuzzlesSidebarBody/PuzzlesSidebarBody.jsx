import React, { useContext, useEffect } from "react";

import { puzzles } from "../../../../../../constants";
import "./PuzzlesSidebarBody.css";
import {
    ChessboardContext,
    PuzzlesContext,
} from "../../../../../../contexts/index.js";

const PuzzlesSidebarBody = () => {
    const { puzzleLevel, setPuzzleLevel, resetBoard } =
        useContext(ChessboardContext);
    const { setHasPuzzleStarted, sidebarMode, setSidebarMode } =
        useContext(PuzzlesContext);

    const sidebarModeConfig = {
        started: {},
        notStarted: {
            className: "start-puzzle-btn",
            text: "Start Puzzle",
            onClick: () => {
                setHasPuzzleStarted(true);
            },
        },
        completed: {
            className: "next-puzzle-btn",
            text: "Next Puzzle",
            onClick: () => {
                setPuzzleLevel((prev) => prev + 1);
            },
        },
        retry: {
            className: "retry-puzzle-btn",
            text: "Retry Puzzle",
            onClick: () => {
                resetBoard({ retryLevel: true });
            },
        },
    };

    const { className, text, onClick } = sidebarModeConfig[sidebarMode];

    function getLevelClassName(i) {
        if (i < puzzleLevel) return "level-btn completed";
        if (i == puzzleLevel) return "level-btn current";
        if (i > puzzleLevel) return "level-btn locked";
    }

    return (
        <div className="puzzles-sidebar-body">
            <div className="levels-container">
                {sidebarMode === "notStarted" && (
                    <>
                        {[...Array(puzzles.length)].map((_, i) => {
                            return (
                                <div className={getLevelClassName(i)} key={i}>
                                    {i}
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
            {sidebarMode !== "started" && (
                <button className={className} onClick={onClick}>
                    {text}
                </button>
            )}
        </div>
    );
};

export default PuzzlesSidebarBody;
