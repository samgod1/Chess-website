import { useState, useRef, createContext, useEffect } from "react";
import gsap from "gsap";

import { puzzles } from "../constants";

export const ChessboardContext = createContext();

const ChessboardContextProvider = ({ children }) => {
    const [mode, setMode] = useState("puzzles");
    const [color, setColor] = useState(null);
    const [files, setFiles] = useState([
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
    ]);
    const [ranks, setRanks] = useState([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
    ]);
    const [fen, setFen] = useState(null);
    const [pieces, setPieces] = useState(null);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [chessboardWidth, setChessboardWidth] = useState(0);
    const [squareWidth, setSquareWidth] = useState(0);
    const [destinationSquares, setDestinationSquares] = useState([]);
    const [captureSquares, setCaptureSquares] = useState([]);
    const [hasPuzzleStarted, setHasPuzzleStarted] = useState(true);
    const [isOpponentPieceMoving, setIsOpponentPieceMoving] = useState(false);
    const [userMoveIndex, setUserMoveIndex] = useState(1);
    const [opponentMoveIndex, setOpponentMoveIndex] = useState(0);
    const [puzzleLevel, setPuzzleLevel] = useState(0);
    const [boardKey, setBoardKey] = useState(0);

    const chessboardRef = useRef(null);
    const chessboardContainerRef = useRef(null);
    const opponentPieceRef = useRef(null);
    const capturedPieceRef = useRef(null);

    function calculateChessboardWidth() {
        let chessboardContainerWidth =
            chessboardContainerRef.current.offsetWidth;

        while (chessboardContainerWidth % 4 != 0) {
            chessboardContainerWidth -= 1;
        }

        chessboardRef.current.style.width = `${chessboardContainerWidth}px`;
        chessboardRef.current.style.height = `${chessboardContainerWidth}px`;

        setChessboardWidth(chessboardContainerWidth);
        setSquareWidth(chessboardContainerWidth / 8);
    }

    function displayCorrectPiece(piece) {
        switch (true) {
            case piece == "p":
                return (
                    <img
                        src={`/images/chess-piece-set/black-pawn.png`}
                        alt={"black-pawn"}
                    />
                );
                break;
            case piece == "n":
                return (
                    <img
                        src={`/images/chess-piece-set/black-knight.png`}
                        alt={"black-knight"}
                    />
                );
                break;
            case piece == "b":
                return (
                    <img
                        src={`/images/chess-piece-set/black-bishop.png`}
                        alt={"black-bishop"}
                    />
                );
                break;
            case piece == "k":
                return (
                    <img
                        src={`/images/chess-piece-set/black-king.png`}
                        alt={"black-king"}
                    />
                );
                break;
            case piece == "q":
                return (
                    <img
                        src={`/images/chess-piece-set/black-queen.png`}
                        alt={"black-queen"}
                    />
                );
                break;
            case piece == "r":
                return (
                    <img
                        src={`/images/chess-piece-set/black-rook.png`}
                        alt={"black-rook"}
                    />
                );
                break;

            case piece == "P":
                return (
                    <img
                        src={`/images/chess-piece-set/white-pawn.png`}
                        alt={"white-pawn"}
                    />
                );
                break;
            case piece == "N":
                return (
                    <img
                        src={`/images/chess-piece-set/white-knight.png`}
                        alt={"black-pawn"}
                    />
                );
                break;
            case piece == "B":
                return (
                    <img
                        src={`/images/chess-piece-set/white-bishop.png`}
                        alt={"white-bishop"}
                    />
                );
                break;
            case piece == "K":
                return (
                    <img
                        src={`/images/chess-piece-set/white-king.png`}
                        alt={"white-king"}
                    />
                );
                break;
            case piece == "Q":
                return (
                    <img
                        src={`/images/chess-piece-set/white-queen.png`}
                        alt={"white-queen"}
                    />
                );
                break;
            case piece == "R":
                return (
                    <img
                        src={`/images/chess-piece-set/white-rook.png`}
                        alt={"white-rook"}
                    />
                );
                break;
        }
    }

    function handlePieceClick(piece) {
        let pieceColor =
            piece.pieceNotation === piece.pieceNotation.toUpperCase()
                ? "white"
                : "black";

        // If piece is already selected
        if (selectedPiece) {
            let selectedPieceColor =
                selectedPiece.pieceNotation ===
                selectedPiece.pieceNotation.toUpperCase()
                    ? "white"
                    : "black";

            // If same piece is clicked then run resetSquares and do nothing
            if (selectedPiece.id === piece.id) {
                resetSquares();
                return;
            }

            // If user clicks on another user's piece while a piece is already selected then firstly reset the squares before the new piece is selected
            if (selectedPiece.id !== piece.id) {
                resetSquares();
            }
        }

        // Don't allow user to select opponent's piece
        if (pieceColor === color) {
            setSelectedPiece(piece);
        }
    }

    function handleSquareClick() {
        resetSquares();
    }

    function resetSquares() {
        setDestinationSquares([]);
        setCaptureSquares([]);
        setSelectedPiece(null);
        if (captureSquares.length != 0) setCaptureSquares([]);
    }

    function movePiece(destination) {
        //Moves the piece
        setPieces((prevPieces) =>
            prevPieces.map((piece) => {
                if (piece.id == selectedPiece.id) {
                    return { ...piece, square: destination };
                }
                return piece;
            }),
        );

        resetSquares();
        checkUserMove(destination);
    }

    function capturePiece(destination) {
        // Removes the captured piece from pieces
        setPieces((prevPieces) =>
            prevPieces.filter((piece) => piece.square !== destination),
        );

        // Moves the piece by changing the piece square
        setPieces((prevPieces) =>
            prevPieces.map((piece) => {
                if (piece.id == selectedPiece.id) {
                    return { ...piece, square: destination };
                }
                return piece;
            }),
        );

        resetSquares();
        checkUserMove(destination);
    }

    function moveOpponentPiece() {
        // Getting the moves from puzzles data
        let position = puzzles[puzzleLevel]
            .split(",")[1]
            .split(" ")
            [opponentMoveIndex].slice(0, 2);
        let destination = puzzles[puzzleLevel]
            .split(",")[1]
            .split(" ")
            [opponentMoveIndex].slice(2, 4);

        // Moving the opponent piece
        setPieces((prevPieces) =>
            prevPieces.map((piece) => {
                if (piece.square === position) {
                    return { ...piece, square: destination };
                }
                return piece;
            }),
        );

        // Capture piece of player if there's any
        setPieces((prevPieces) =>
            prevPieces.filter((piece) => {
                let pieceColor =
                    piece.pieceNotation === piece.pieceNotation.toUpperCase()
                        ? "white"
                        : "black";

                if (piece.square === destination && pieceColor === color) {
                    return;
                }

                return piece;
            }),
        );

        // Update the opponentMoveCount
        setOpponentMoveIndex((prev) => (prev += 2));
    }

    function checkUserMove(destination) {
        const position = selectedPiece.square;

        const correctPosition = puzzles[puzzleLevel]
            .split(",")[1]
            .split(" ")
            [userMoveIndex].slice(0, 2);
        const correctDestination = puzzles[puzzleLevel]
            .split(",")[1]
            .split(" ")
            [userMoveIndex].slice(2, 4);

        const isMoveCorrect =
            position == correctPosition && destination == correctDestination;

        if (isMoveCorrect) {
            // After check is complete move the opponent piece
            moveOpponentPiece();
            setUserMoveIndex((prev) => prev + 2);
        } else {
            // Reset the board if move is incorrect
            resetBoard();
        }
    }

    function resetBoard() {
        convertFenToPiecesArray();
        setOpponentMoveIndex(0);
        setUserMoveIndex(1);
    }

    function createDestSquares({ pieceNotation, square }) {
        let file = square.split("")[0];
        let rank = square.split("")[1];

        let updatedDestinationSquares = [];
        let updatedCaptureSquares = [];

        switch (pieceNotation) {
            case "R":
            case "r":
                // For rook
                createRookDestSquares(
                    file,
                    rank,
                    updatedDestinationSquares,
                    updatedCaptureSquares,
                );
                break;

            case "B":
            case "b":
                // For bishop
                createBishopDestSquares(
                    file,
                    rank,
                    updatedDestinationSquares,
                    updatedCaptureSquares,
                );
                break;
            case "Q":
            case "q":
                // For queen
                createQueenDestSquares(
                    file,
                    rank,
                    updatedDestinationSquares,
                    updatedCaptureSquares,
                );
                break;
            case "K":
            case "k":
                // For king
                createKingDestSquares(
                    file,
                    rank,
                    updatedDestinationSquares,
                    updatedCaptureSquares,
                );
                break;
            case "P":
            case "p":
                // For pawn
                createPawnDestSquares(
                    file,
                    rank,
                    updatedDestinationSquares,
                    updatedCaptureSquares,
                );
                break;
            case "N":
            case "n":
                createKnightDestSquares(
                    file,
                    rank,
                    updatedDestinationSquares,
                    updatedCaptureSquares,
                );
                break;
        }

        setDestinationSquares([...updatedDestinationSquares]);
        setCaptureSquares([...updatedCaptureSquares]);
    }

    function createRookDestSquares(
        file,
        rank,
        updatedDestinationSquares,
        updatedCaptureSquares,
    ) {
        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];

        for (let i = 0; i < 4; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            while (true) {
                coordOfFile += directions[i][0];
                coordOfRank += directions[i][1];

                // Stopping the loop if destination square reaches to the edge
                if (
                    coordOfFile < 0 ||
                    coordOfFile > 7 ||
                    coordOfRank < 0 ||
                    coordOfRank > 7
                ) {
                    break;
                }

                let pieceOnDestSquare = pieces.find(
                    (piece) =>
                        `${files[coordOfFile]}${ranks[coordOfRank]}` ===
                        piece.square,
                );

                if (pieceOnDestSquare) {
                    //Determining if the piece in the way destination squares is white or black
                    const pieceColor =
                        pieceOnDestSquare.pieceNotation ==
                        pieceOnDestSquare.pieceNotation.toUpperCase()
                            ? "white"
                            : "black";

                    // Stopping the loop if it's our piece
                    if (pieceColor == color) {
                        break;
                    }
                    // Stopping the loop and creating capture square if it's opponent's piece
                    else {
                        updatedCaptureSquares.push(
                            `${files[coordOfFile]}${ranks[coordOfRank]}`,
                        );
                        break;
                    }
                }

                updatedDestinationSquares.push(
                    `${files[coordOfFile]}${ranks[coordOfRank]}`,
                );
            }
        }
    }

    function createBishopDestSquares(
        file,
        rank,
        updatedDestinationSquares,
        updatedCaptureSquares,
    ) {
        const directions = [
            [1, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
        ];

        for (let i = 0; i < 4; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            while (true) {
                coordOfFile += directions[i][0];
                coordOfRank += directions[i][1];

                // Stopping the loop if destination square reaches to the edge
                if (
                    coordOfFile < 0 ||
                    coordOfFile > 7 ||
                    coordOfRank < 0 ||
                    coordOfRank > 7
                ) {
                    break;
                }

                let pieceOnDestSquare = pieces.find(
                    (piece) =>
                        `${files[coordOfFile]}${ranks[coordOfRank]}` ===
                        piece.square,
                );

                if (pieceOnDestSquare) {
                    //Determining if the piece in the way destination squares is white or black
                    const pieceColor =
                        pieceOnDestSquare.pieceNotation ==
                        pieceOnDestSquare.pieceNotation.toUpperCase()
                            ? "white"
                            : "black";

                    // Stopping the loop if it's our piece
                    if (pieceColor == color) {
                        break;
                    }
                    // Stopping the loop and creating capture square if it's opponent's piece
                    else {
                        updatedCaptureSquares.push(
                            `${files[coordOfFile]}${ranks[coordOfRank]}`,
                        );
                        break;
                    }
                }

                updatedDestinationSquares.push(
                    `${files[coordOfFile]}${ranks[coordOfRank]}`,
                );
            }
        }
    }

    function createQueenDestSquares(
        file,
        rank,
        updatedDestinationSquares,
        updatedCaptureSquares,
    ) {
        createRookDestSquares(
            file,
            rank,
            updatedDestinationSquares,
            updatedCaptureSquares,
        );
        createBishopDestSquares(
            file,
            rank,
            updatedDestinationSquares,
            updatedCaptureSquares,
        );
    }

    function createKingDestSquares(
        file,
        rank,
        updatedDestinationSquare,
        updatedCaptureSquares,
    ) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let coordOfFile = files.indexOf(file);
                let coordOfRank = ranks.indexOf(rank);

                coordOfFile += j;
                coordOfRank += i;

                // To prevent unnecessary destination squares when the king is at the edges of the board
                if (
                    coordOfFile >= 0 &&
                    coordOfRank >= 0 &&
                    coordOfFile <= 7 &&
                    coordOfRank <= 7
                ) {
                    const pieceOnDestSquare = pieces.find(
                        (piece) =>
                            piece.square ===
                            `${files[coordOfFile]}${ranks[coordOfRank]}`,
                    );

                    if (pieceOnDestSquare) {
                        //Determining if the piece in the way destination squares is white or black
                        const pieceColor =
                            pieceOnDestSquare.pieceNotation ==
                            pieceOnDestSquare.pieceNotation.toUpperCase()
                                ? "white"
                                : "black";

                        // Skipping the loop if it's our piece
                        if (pieceColor == color) {
                            continue;
                        }
                        // Skipping the loop and creating capture square if it's opponent's piece
                        else {
                            updatedCaptureSquares.push(
                                `${files[coordOfFile]}${ranks[coordOfRank]}`,
                            );
                            continue;
                        }
                    }

                    updatedDestinationSquare.push(
                        `${files[coordOfFile]}${ranks[coordOfRank]}`,
                    );
                }
            }
        }
    }

    function createPawnDestSquares(
        file,
        rank,
        updatedDestinationSquare,
        updatedCaptureSquares,
    ) {
        let pawnStartingSquares = [];
        let pieceColor =
            selectedPiece.pieceNotation ==
            selectedPiece.pieceNotation.toUpperCase()
                ? "white"
                : "black";

        const directions = [
            [0, 1],
            [0, 2],
        ];
        const captureDirections = [
            [1, 1],
            [-1, 1],
        ];

        for (let i = 0; i < 8; i++) {
            pieceColor == "white"
                ? pawnStartingSquares.push(files[i] + ranks[1])
                : pawnStartingSquares.push(files[i] + ranks[6]);
        }

        let noOfDestSquares = pawnStartingSquares.includes(selectedPiece.square)
            ? 2
            : 1;

        for (let i = 0; i < noOfDestSquares; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            pieceColor == "white"
                ? (coordOfRank += directions[i][1])
                : (coordOfRank -= directions[i][1]);

            if (coordOfRank < 0 || coordOfRank > 7) break;

            const pieceOnDestinationSquare = pieces.find(
                (piece) =>
                    piece.square ===
                    `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );

            if (pieceOnDestinationSquare) break;

            updatedDestinationSquare.push(
                `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );
        }

        // For capture squares
        for (let i = 0; i < 2; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            coordOfFile += captureDirections[i][0];
            pieceColor == "white"
                ? (coordOfRank += captureDirections[i][1])
                : (coordOfRank -= captureDirections[i][1]);

            let pieceOnCaptureSquare = pieces.find(
                (piece) =>
                    piece.square ===
                    `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );

            if (pieceOnCaptureSquare) {
                let pieceOnCaptureSquareColor =
                    pieceOnCaptureSquare.pieceNotation ===
                    pieceOnCaptureSquare.pieceNotation.toUpperCase()
                        ? "white"
                        : "black";

                if (pieceOnCaptureSquareColor != color) {
                    updatedCaptureSquares.push(
                        `${files[coordOfFile]}${ranks[coordOfRank]}`,
                    );
                }
            }
        }
    }

    function createKnightDestSquares(
        file,
        rank,
        updatedDestinationSquare,
        updatedCaptureSquares,
    ) {
        const directions = [
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
            [1, 2],
            [-1, 2],
            [1, -2],
            [-1, -2],
        ];

        for (let i = 0; i < 8; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            coordOfFile += directions[i][0];
            coordOfRank -= directions[i][1];

            if (
                coordOfFile < 0 ||
                coordOfFile > 7 ||
                coordOfRank < 0 ||
                coordOfRank > 7
            ) {
                continue;
            }

            const pieceOnDestSquare = pieces.find(
                (piece) =>
                    piece.square ===
                    `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );

            if (pieceOnDestSquare) {
                //Determining if the piece in the way destination squares is white or black
                const pieceColor =
                    pieceOnDestSquare.pieceNotation ==
                    pieceOnDestSquare.pieceNotation.toUpperCase()
                        ? "white"
                        : "black";

                // Skipping the loop if it's our piece
                if (pieceColor == color) {
                    continue;
                }
                // Skipping the loop and creating capture square if it's opponent's piece
                else {
                    updatedCaptureSquares.push(
                        `${files[coordOfFile]}${ranks[coordOfRank]}`,
                    );
                    continue;
                }
            }

            updatedDestinationSquare.push(
                `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );
        }
    }

    function convertFenToPiecesArray() {
        let updatedPieces = [];

        for (let i = 0; i < 8; i++) {
            let row = fen.split(",")[0].split(" ")[0].split("/")[i];
            let coordOfFile = 0;

            for (let j = 0; j < row.length; j++) {
                let pieceNotation = row.split("")[j];
                let isNumber = /^[0-9]+$/.test(pieceNotation);

                if (!isNumber) {
                    let square = `${files[coordOfFile]}${ranks[7 - i]}`;
                    let piece = {
                        id: `${pieceNotation}-${square}`,
                        pieceNotation: pieceNotation,
                        square: square,
                    };
                    updatedPieces.push(piece);
                    coordOfFile += 1;
                } else {
                    coordOfFile += Number(pieceNotation);
                }
            }
        }

        setPieces(updatedPieces);
    }

    useEffect(() => {
        if (fen) {
            // Set color opposite to fen
            let startColor = fen.split(" ")[1];
            startColor == "b" ? setColor("white") : setColor("black");

            convertFenToPiecesArray();
        } else {
            setFen(puzzles[puzzleLevel]);
        }
    }, [fen]);

    useEffect(() => {
        if (selectedPiece) createDestSquares(selectedPiece);
    }, [selectedPiece]);

    useEffect(() => {
        if (opponentMoveIndex === 0) {
            setTimeout(() => {
                moveOpponentPiece();
            }, 500);
        }
    }, [opponentMoveIndex]);

    return (
        <ChessboardContext.Provider
            value={{
                mode,
                setMode,
                color,
                setColor,
                files,
                ranks,
                fen,
                pieces,
                chessboardRef,
                chessboardContainerRef,
                calculateChessboardWidth,
                chessboardWidth,
                squareWidth,
                displayCorrectPiece,
                destinationSquares,
                captureSquares,
                selectedPiece,
                movePiece,
                capturePiece,
                handlePieceClick,
                handleSquareClick,
                moveOpponentPiece,
            }}
        >
            {children}
        </ChessboardContext.Provider>
    );
};

export default ChessboardContextProvider;
