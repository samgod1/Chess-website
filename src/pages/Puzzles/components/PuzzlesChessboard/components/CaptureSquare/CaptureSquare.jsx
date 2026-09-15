import React from "react";
import { useDroppable } from "@dnd-kit/react";

const CaptureSquare = ({ square, squareWidth, files, capturePiece }) => {
    const fileNumber = files.indexOf(square.split("")[0]);
    const rankNumber = 7 - Number(square.split("")[1] - 1);

    return (
        <div
            className="captureSquare"
            style={{
                transform: `translate(${fileNumber * squareWidth}px, ${rankNumber * squareWidth}px)`,
            }}
            key={square}
            squareid={square}
            onClick={() => {
                capturePiece(square);
            }}
        >
            <img className="top-left" src="/images/triangle.png" />
            <img className="top-right" src="/images/triangle.png" />
            <img className="bottom-left" src="/images/triangle.png" />
            <img className="bottom-right" src="/images/triangle.png" />
        </div>
    );
};

export default CaptureSquare;
