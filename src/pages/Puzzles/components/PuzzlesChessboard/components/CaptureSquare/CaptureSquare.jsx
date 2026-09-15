import React from "react";
import { useDroppable } from "@dnd-kit/react";

const CaptureSquare = ({ square, squareWidth, files, capturePiece, color }) => {
    const fileNumber =
        color == "white"
            ? files.indexOf(square.split("")[0])
            : 7 - files.indexOf(square.split("")[0]);
    const rankNumber =
        color == "white"
            ? 7 - Number(square.split("")[1] - 1)
            : Number(square.split("")[1] - 1);

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
