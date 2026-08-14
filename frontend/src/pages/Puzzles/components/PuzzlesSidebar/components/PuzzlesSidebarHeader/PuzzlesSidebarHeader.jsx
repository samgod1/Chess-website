import React from "react";

import "./PuzzlesSidebarHeader.css";

const PuzzlesSidebarHeader = () => {
    return (
        <div className="puzzles-sidebar-header">
            <img src="/images/puzzle.png" alt="vision" width={40} height={40} />
            <p>Puzzles</p>
        </div>
    );
};

export default PuzzlesSidebarHeader;
