import { useEffect, useContext } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import { useGSAP } from "@gsap/react";

import { puzzles } from "../../../../../../constants";
import "./PuzzlesSidebarBody.css";
import { PuzzlesContext } from "../../../../../../contexts/index.js";

const PuzzlesSidebarBody = () => {
    const {
        setHasPuzzleStarted,
        sidebarMode,
        setSidebarMode,
        selectedLevel,
        setSelectedLevel,
        highestLevelReached,
        hintPiece,
        showHint,
        setShowHint,
    } = useContext(PuzzlesContext);

    const sidebarModeConfig = {
        started: {
            className: "hint-btn",
            text: "Hint",
            onClick: () => {
                setShowHint(true);
            },
        },
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
        if (i == selectedLevel) return "level-btn selected";
        if (i <= highestLevelReached) return "level-btn completed";
        if (i > highestLevelReached) return "level-btn locked";
    }

    function handleBack() {
        setSidebarMode("notStarted");
    }

    useGSAP(() => {
        if (hintPiece) {
            const hintText = SplitText.create(".text", { type: "chars" });

            gsap.from(hintText.chars, {
                autoAlpha: 0,
                duration: 0.2,
                stagger: 0.02,
                ease: "back.inOut",
            });
        }
    }, [hintPiece]);

    return (
        <div className="puzzles-sidebar-body">
            {sidebarMode === "notStarted" && (
                <div className="levels-container">
                    {[...Array(puzzles.length)].map((_, i) => {
                        return (
                            <div
                                className={getLevelClassName(i + 1)}
                                key={i + 1}
                                onClick={() => {
                                    if (i + 1 <= highestLevelReached) {
                                        setSelectedLevel(i + 1);
                                    }
                                }}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </div>
            )}
            {sidebarMode !== "notStarted" && (
                <div className="hint-container">
                    {sidebarMode === "started" && hintPiece && (
                        <>
                            <span className="title">Hint:</span>
                            <span className="text">
                                It has to do something with the {hintPiece}
                            </span>
                        </>
                    )}
                </div>
            )}
            <div className="buttons-container">
                {sidebarMode !== "notStarted" && sidebarMode !== "started" && (
                    <button className="back-btn" onClick={handleBack}>
                        Back
                    </button>
                )}
                <button
                    className={className}
                    onClick={onClick}
                    disabled={text === "Hint" ? showHint : false}
                >
                    {text}
                </button>
            </div>
        </div>
    );
};

export default PuzzlesSidebarBody;
