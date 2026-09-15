import { useDroppable } from "@dnd-kit/react";

const DestinationSquare = ({ square, squareWidth, files, movePiece }) => {
    const fileNumber = files.indexOf(square.split("")[0]);
    const rankNumber = 7 - Number(square.split("")[1] - 1);

    return (
        <div
            className="destSquare"
            style={{
                transform: `translate(${fileNumber * squareWidth}px, ${rankNumber * squareWidth}px)`,
            }}
            key={square}
            squareid={square}
            onClick={() => {
                movePiece(square);
            }}
        >
            <img src="/images/dot.png" alt="dot" />
        </div>
    );
};

export default DestinationSquare;
