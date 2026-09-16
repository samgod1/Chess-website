import { useDraggable } from "@dnd-kit/react";

import { pieceImages } from "../../../../../../constants";

const Piece = ({
    piece,
    hasPlacedPieces,
    pieceRefs,
    files,
    ranks,
    squareWidth,
    handlePieceClick,
    isDragging,
    hasPuzzleStarted,
    color,
}) => {
    let coordOfFile =
        color == "white"
            ? files.indexOf(piece.square.split("")[0])
            : 7 - files.indexOf(piece.square.split("")[0]);
    let coordOfRank =
        color == "white"
            ? 7 - ranks.indexOf(piece.square.split("")[1])
            : ranks.indexOf(piece.square.split("")[1]);

    let x = coordOfFile * squareWidth;
    let y = coordOfRank * squareWidth;

    const { ref } = useDraggable({
        id: piece.id,
        disabled: !hasPuzzleStarted,
    });

    return (
        <div
            className={"piece"}
            style={{
                transform: `translate(${x}px, ${y}px)`,
                transition:
                    hasPlacedPieces && !isDragging
                        ? "transform 0.1s ease-in-out"
                        : "none",
            }}
            onClick={() => {
                handlePieceClick(piece);
            }}
            ref={ref}
        >
            <img
                src={`/images/chess-piece-set/${pieceImages[piece.pieceNotation]}`}
                alt="piece"
                ref={(element) => {
                    if (element) pieceRefs.current[piece.id] = element;
                    else delete pieceRefs.current[piece.id];
                }}
            />
        </div>
    );
};

export default Piece;
