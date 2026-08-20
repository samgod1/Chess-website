import React, { useContext, useEffect } from "react";

import { puzzles } from "../../../../../../constants";
import "./PuzzlesSidebarBody.css";
import { PuzzlesContext } from "../../../../../../contexts/index.js";
import updatePuzzleLevel from "../../../../../../../apis/user/updatePuzzleLevel.js";

const PuzzlesSidebarBody = () => {
    const {
        setHasPuzzleStarted,
        sidebarMode,
        setSidebarMode,
        puzzleLevel,
        setPuzzleLevel,
    } = useContext(PuzzlesContext);

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
                setHasPuzzleStarted(true);
                setSidebarMode("started");
            },
        },
        retry: {
            className: "retry-puzzle-btn",
            text: "Retry Puzzle",
            onClick: () => {
                setHasPuzzleStarted(true);
                setSidebarMode("started");
            },
        },
    };

    const { className, text, onClick } = sidebarModeConfig[sidebarMode];

    function getLevelClassName(i) {
        if (i < puzzleLevel) return "level-btn completed";
        if (i == puzzleLevel) return "level-btn current";
        if (i > puzzleLevel) return "level-btn locked";
    }

    function handleBack() {
        setSidebarMode("notStarted");
    }

    return (
        <div className="puzzles-sidebar-body">
            <div className="levels-container">
                {sidebarMode === "notStarted" && (
                    <>
                        {[...Array(puzzles.length)].map((_, i) => {
                            return (
                                <div
                                    className={getLevelClassName(i + 1)}
                                    key={i + 1}
                                >
                                    {i + 1}
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
            {sidebarMode !== "started" && (
                <div className="buttons-container">
                    {sidebarMode !== "notStarted" && (
                        <button className="back-btn" onClick={handleBack}>
                            Back
                        </button>
                    )}
                    <button className={className} onClick={onClick}>
                        {text}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PuzzlesSidebarBody;
