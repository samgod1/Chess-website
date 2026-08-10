import { useState, useRef, createContext, useEffect } from "react";
import gsap from "gsap";

import { puzzles } from "../constants";

export const ChessboardContext = createContext();

const ChessboardContextProvider = ({ children }) => {
    const [mode, setMode] = useState("puzzles");
    const [color, setColor] = useState("white");
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
    const [selectedSquare, setSelectedSquare] = useState(null);
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
    const selectedPieceRef = useRef(null);
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

    function handlePieceClick(e) {
        let isSwitching = false;
        const clickedSquare = e.target.getAttribute("squareid");
        const piece = e.target.getAttribute("piece");
        const selectedPieceColor =
            piece == piece.toUpperCase() ? "white" : "black";

        // Do nothing if user is trying to select opponent's piece
        if (color != selectedPieceColor) return;

        // Do nothing if opponent's piece is moving
        if (isOpponentPieceMoving) return;

        // For checking if user is switching to another piece was a piece is already selected
        if (selectedSquare && selectedSquare != clickedSquare) {
            isSwitching = true;
            resetSquares(isSwitching);
        }

        // Only setting value of selectedPieceRef after checking for isSwitching
        selectedPieceRef.current = e.target;

        if (selectedSquare == clickedSquare) {
            resetSquares(isSwitching);
            return;
        }

        e.target.style.backgroundColor = "var(--c-highlight)";
        setSelectedSquare(clickedSquare);
    }

    function handleSquareClick(e) {
        resetSquares();
    }

    function movePiece(e) {
        //Moves the piece
        const destination = e.target.style.transform;
        const selectedPiece = selectedPieceRef.current;

        selectedPieceRef.current.style.backgroundColor = "";
        setDestinationSquares([]);
        setCaptureSquares([]);

        gsap.to(selectedPieceRef.current, {
            transform: destination,
            duration: 0.3,
            ease: "power1.inOut",
            onComplete: () => {
                checkUserMove(e);
                //Changes the selected piece squareid attribute
                const square = e.target.getAttribute("squareid");
                selectedPiece.setAttribute("squareid", square);
                resetSquares();
            },
        });
    }

    function moveOpponentPiece() {
        setIsOpponentPieceMoving(true);

        let position = puzzles[puzzleLevel]
            .split(",")[1]
            .split(" ")
            [opponentMoveIndex].slice(0, 2);
        let destination = puzzles[puzzleLevel]
            .split(",")[1]
            .split(" ")
            [opponentMoveIndex].slice(2, 4);

        opponentPieceRef.current = chessboardRef.current.querySelector(
            `[squareid = "${position}"]`,
        );

        // Calculate the translate values
        const file = destination.split("")[0];
        const rank = destination.split("")[1];

        const coordOfFile = files.indexOf(file);
        const coordOfRank = ranks.indexOf(rank);
        const translateX = coordOfFile * squareWidth;
        const translateY = (7 - coordOfRank) * squareWidth;

        // Move the opponent's piece
        gsap.to(opponentPieceRef.current, {
            transform: `translate(${translateX}px, ${translateY}px)`,
            delay: 0.2,
            duration: 0.3,
            onComplete: () => {
                setIsOpponentPieceMoving(false);
            },
        });

        // Change the square id
        opponentPieceRef.current.setAttribute("squareid", destination);

        // Update the opponentMoveCount
        setOpponentMoveIndex((prev) => (prev += 2));
    }

    function checkUserMove(e) {
        const position = selectedPieceRef.current.getAttribute("squareid");
        const destination = e.target.getAttribute("squareid");

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
        } else {
            // Reset the board if move is incorrect
            resetBoard();
        }
    }

    function resetBoard() {
        setOpponentMoveIndex(0);
        setUserMoveIndex(1);

        selectedPieceRef.current = null;
        opponentPieceRef.current = null;
        capturedPieceRef.current = null;

        setBoardKey((prev) => prev + 1);
    }

    function capturePiece(e) {
        capturedPieceRef.current = chessboardRef.current.querySelector(
            `[squareid = ${e.target.getAttribute("squareid")}`,
        );

        console.log("capturePiece");
        movePiece(e);
    }

    function resetSquares(isSwitching) {
        setDestinationSquares([]);
        setCaptureSquares([]);
        setSelectedSquare(null);
        if (selectedPieceRef.current)
            selectedPieceRef.current.style.backgroundColor = "";
        if (!isSwitching) selectedPieceRef.current = null;
        if (captureSquares.length != 0) setCaptureSquares([]);
    }

    function createDestSquares() {
        const file = selectedSquare.split("")[0];
        const rank = selectedSquare.split("")[1];

        let updatedDestinationSquares = [];
        let updatedCaptureSquares = [];

        const piece = selectedPieceRef.current.getAttribute("piece");

        switch (piece) {
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
                    piece,
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

                const pieceOnDestSquare = chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                );

                if (pieceOnDestSquare) {
                    const pieceNotation =
                        pieceOnDestSquare.getAttribute("piece");
                    const pieceColor =
                        pieceNotation == pieceNotation.toUpperCase()
                            ? "white"
                            : "black";

                    // Stopping the loop if destination square reaches on top of other piece
                    if (pieceColor == color) {
                        break;
                    } else {
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

                const pieceOnDestSquare = chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                );

                // Stopping the loop if destination square reaches on top of other piece
                if (pieceOnDestSquare) {
                    const pieceNotation =
                        pieceOnDestSquare.getAttribute("piece");
                    const pieceColor =
                        pieceNotation == pieceNotation.toUpperCase()
                            ? "white"
                            : "black";

                    // Stopping the loop if destination square reaches on top of other piece
                    if (pieceColor == color) {
                        break;
                    } else {
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
        const indexOfFile = files.indexOf(file);
        const indexOfRank = ranks.indexOf(rank);

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
                    const pieceOnDestSquare =
                        chessboardRef.current.querySelector(
                            `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
                        );

                    if (pieceOnDestSquare) {
                        const pieceNotation =
                            pieceOnDestSquare.getAttribute("piece");
                        const pieceColor =
                            pieceNotation == pieceNotation.toUpperCase()
                                ? "white"
                                : "black";

                        // Stopping the loop if destination square reaches on top of other piece
                        if (pieceColor == color) {
                            continue;
                        } else {
                            updatedCaptureSquares.push(
                                `${files[coordOfFile]}${ranks[coordOfRank]}`,
                            );
                            continue;
                        }
                    }

                    // To remove the central destination square
                    if (
                        `${coordOfFile} + ${coordOfRank}` !=
                        `${indexOfFile} + ${indexOfRank}`
                    ) {
                        updatedDestinationSquare.push(
                            `${files[coordOfFile]}${ranks[coordOfRank]}`,
                        );
                    }
                }
            }
        }
    }

    function createPawnDestSquares(
        file,
        rank,
        updatedDestinationSquare,
        updatedCaptureSquares,
        piece,
    ) {
        let pawnStartingSquares = [];

        const directions = [
            [0, 1],
            [0, 2],
        ];
        const captureDirections = [
            [1, 1],
            [-1, 1],
        ];

        for (let i = 0; i < 7; i++) {
            piece == "P"
                ? pawnStartingSquares.push(files[i] + ranks[1])
                : pawnStartingSquares.push(files[i] + ranks[6]);
        }

        let noOfDestSquares = pawnStartingSquares.includes(selectedSquare)
            ? 2
            : 1;

        for (let i = 0; i < noOfDestSquares; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            piece == "P"
                ? (coordOfRank += directions[i][1])
                : (coordOfRank -= directions[i][1]);

            if (coordOfRank < 0 || coordOfRank > 7) break;

            const pieceOnDestinationSquare =
                chessboardRef.current.querySelector(
                    `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
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
            color == "white"
                ? (coordOfRank += captureDirections[i][1])
                : (coordOfRank -= captureDirections[i][1]);

            let pieceOnCaptureSquare = chessboardRef.current.querySelector(
                `[squareid = ${files[coordOfFile]}${ranks[coordOfRank]}]`,
            );

            if (pieceOnCaptureSquare) {
                let pieceNotation = pieceOnCaptureSquare.getAttribute("piece");
                let pieceColor =
                    pieceNotation == pieceNotation.toUpperCase()
                        ? "white"
                        : "black";

                if (pieceColor != color) {
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

            const pieceOnDestSquare = chessboardRef.current.querySelector(
                `[squareid = "${files[coordOfFile]}${ranks[coordOfRank]}"]`,
            );

            if (pieceOnDestSquare) {
                const pieceNotation = pieceOnDestSquare.getAttribute("piece");
                const pieceColor =
                    pieceNotation == pieceNotation.toUpperCase()
                        ? "white"
                        : "black";

                // Stopping the loop if destination square reaches on top of other piece
                if (pieceColor == color) {
                    continue;
                } else {
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

    useEffect(() => {
        if (selectedSquare) {
            createDestSquares();
        }
    }, [selectedSquare]);

    useEffect(() => {
        // Set color opposite to fen
        if (fen) {
            let startColor = fen.split(" ")[1];
            startColor == "b" ? setColor("white") : setColor("black");
        } else {
            setFen(puzzles[puzzleLevel]);
        }
    }, [fen]);

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
                chessboardRef,
                chessboardContainerRef,
                calculateChessboardWidth,
                chessboardWidth,
                squareWidth,
                displayCorrectPiece,
                destinationSquares,
                captureSquares,
                movePiece,
                capturePiece,
                handlePieceClick,
                handleSquareClick,
                moveOpponentPiece,
                boardKey,
            }}
        >
            {children}
        </ChessboardContext.Provider>
    );
};

export default ChessboardContextProvider;
