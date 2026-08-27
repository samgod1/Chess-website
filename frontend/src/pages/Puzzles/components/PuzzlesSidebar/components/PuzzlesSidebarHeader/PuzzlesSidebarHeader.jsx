import React from "react";

import "./PuzzlesSidebarHeader.css";

const PuzzlesSidebarHeader = () => {
    return (
        <div className="puzzles-sidebar-header">
            <img src="/images/puzzle.png" alt="vision" width={30} height={30} />
            <p>Puzzles</p>
        </div>
    );
};

export default PuzzlesSidebarHeader;
