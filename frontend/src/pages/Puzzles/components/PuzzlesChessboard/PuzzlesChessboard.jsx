import { useState, useRef, useEffect, useContext } from "react";
import { PuzzlesContext, UserContext } from "../../../../contexts";
import Coords from "./components/Coords/Coords";
import { puzzles, pieceImages } from "../../../../constants";
import gsap from "gsap";

import "./PuzzlesChessboard.css";

const PuzzlesChessboard = () => {
    const {
        hasPuzzleStarted,
        setHasPuzzleStarted,
        puzzleLevel,
        setPuzzleLevel,
        sidebarMode,
        setSidebarMode,
        colorChangeTrigger,
        setColorChangeTrigger,
    } = useContext(PuzzlesContext);
    const { user } = useContext(UserContext);

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
    const [defaultFen, setDefaultFen] = useState(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    );
    const [color, setColor] = useState("white");
    const [pieces, setPieces] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [chessboardSize, setChessboardSize] = useState(0);
    const [squareWidth, setSquareWidth] = useState(0);
    const [destinationSquares, setDestinationSquares] = useState([]);
    const [captureSquares, setCaptureSquares] = useState([]);
    const [turn, setTurn] = useState("opponent");
    const [userMoveIndex, setUserMoveIndex] = useState(1);
    const [opponentMoveIndex, setOpponentMoveIndex] = useState(0);
    const [hasPlacedPieces, setHasPlacedPieces] = useState(false);
    const [resetBoardComplete, setResetBoardComplete] = useState(false);
    const [colorChanged, setColorChanged] = useState(false);

    const chessboardContainerRef = useRef(null);
    const pieceRefs = useRef({});
    const firstRender = useRef(true);

    function calculateChessboardSize() {
        let chessboardContainerWidth =
            chessboardContainerRef.current.offsetWidth;

        while (chessboardContainerWidth % 4 != 0) {
            chessboardContainerWidth -= 1;
        }

        setChessboardSize(chessboardContainerWidth);
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

    function handlePieceClick(clickedPiece) {
        if (turn !== "player") return;

        let pieceColor =
            clickedPiece.pieceNotation ===
            clickedPiece.pieceNotation.toUpperCase()
                ? "white"
                : "black";

        // If piece is already selected
        if (selectedPiece) {
            // If same piece is clicked then run resetSquares and do nothing
            if (selectedPiece.id === clickedPiece.id) {
                resetSquares();
                return;
            }

            // If user clicks on another user's piece while a piece is already selected then firstly reset the squares before the new piece is selected
            if (selectedPiece.id !== clickedPiece.id) {
                resetSquares();
            }
        }

        // Don't allow user to select opponent's piece
        if (pieceColor === color) {
            // Change the background chessboardColor of selected piece
            gsap.to(pieceRefs.current[clickedPiece.id], {
                backgroundColor: "var(--c-highlight)",
                duration: 0,
            });

            // Update selectedPiece state
            setSelectedPiece(clickedPiece);
        }
    }

    function handleSquareClick() {
        resetSquares();
    }

    function resetSquares() {
        setDestinationSquares([]);
        setCaptureSquares([]);
        setSelectedPiece(null);
        setCaptureSquares([]);
        // Change the background chessboardColor of selected piece
        if (selectedPiece)
            gsap.to(pieceRefs.current[selectedPiece.id], {
                backgroundColor: "",
                duration: 0,
            });
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

        setTurn("opponent");
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

        setTurn("opponent");
        resetSquares();
        checkUserMove(destination);
    }

    function moveOpponentPiece() {
        // Getting the moves from puzzles data
        let position = puzzles[puzzleLevel - 1]
            .split(",")[1]
            .split(" ")
            [opponentMoveIndex]?.slice(0, 2);
        let destination = puzzles[puzzleLevel - 1]
            .split(",")[1]
            .split(" ")
            [opponentMoveIndex]?.slice(2, 4);

        // If user has completed the puzzle
        if (!position && !destination) {
            setHasPuzzleStarted(false);
            setSidebarMode("completed");
            return;
        }

        // Moving the opponent piece
        setPieces((prevPieces) => {
            return prevPieces.map((piece) => {
                if (piece.square === position) {
                    return { ...piece, square: destination };
                }
                return piece;
            });
        });

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

        // Change the turn and update the opponentMoveCount
        setTurn("player");
        setOpponentMoveIndex((prev) => (prev += 2));
    }

    function checkUserMove(destination) {
        const position = selectedPiece.square;

        const correctPosition = puzzles[puzzleLevel - 1]
            .split(",")[1]
            .split(" ")
            [userMoveIndex].slice(0, 2);
        const correctDestination = puzzles[puzzleLevel - 1]
            .split(",")[1]
            .split(" ")
            [userMoveIndex].slice(2, 4);

        const isMoveCorrect =
            position == correctPosition && destination == correctDestination;

        if (isMoveCorrect) {
            // The 100 ms delay for the transition piece move transition to end
            setTimeout(() => {
                playCorrectAnimation();
            }, 100);
        } else {
            setHasPuzzleStarted(false);
            // The 100 ms delay for the transition piece move transition to end
            setTimeout(() => {
                playIncorrectAnimation(destination);
            }, 100);
        }
    }

    function playCorrectAnimation() {
        gsap.to(pieceRefs.current[selectedPiece.id], {
            backgroundColor: "var(--c-green)",
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                setUserMoveIndex((prev) => prev + 2);
                setTimeout(() => {
                    moveOpponentPiece();
                }, 200);
            },
        });
    }

    function playIncorrectAnimation() {
        gsap.to(pieceRefs.current[selectedPiece.id], {
            backgroundColor: "var(--c-red)",
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                setSidebarMode("retry");
            },
        });
    }

    function resetBoard() {
        setHasPlacedPieces(false);
        setOpponentMoveIndex(0);
        setUserMoveIndex(1);
        setTurn("opponent");
        if (hasPuzzleStarted) {
            setFen(puzzles[puzzleLevel - 1]);
        }
        setResetBoardComplete(true);
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
                    const piecechessboardColor =
                        pieceOnDestSquare.pieceNotation ==
                        pieceOnDestSquare.pieceNotation.toUpperCase()
                            ? "white"
                            : "black";

                    // Stopping the loop if it's our piece
                    if (piecechessboardColor == color) {
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
                        const piecechessboardColor =
                            pieceOnDestSquare.pieceNotation ==
                            pieceOnDestSquare.pieceNotation.toUpperCase()
                                ? "white"
                                : "black";

                        // Skipping the loop if it's our piece
                        if (piecechessboardColor == color) {
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
        let piecechessboardColor =
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
            piecechessboardColor == "white"
                ? pawnStartingSquares.push(files[i] + ranks[1])
                : pawnStartingSquares.push(files[i] + ranks[6]);
        }

        let noOfDestSquares = pawnStartingSquares.includes(selectedPiece.square)
            ? 2
            : 1;

        for (let i = 0; i < noOfDestSquares; i++) {
            let coordOfFile = files.indexOf(file);
            let coordOfRank = ranks.indexOf(rank);

            piecechessboardColor == "white"
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
            piecechessboardColor == "white"
                ? (coordOfRank += captureDirections[i][1])
                : (coordOfRank -= captureDirections[i][1]);

            let pieceOnCaptureSquare = pieces.find(
                (piece) =>
                    piece.square ===
                    `${files[coordOfFile]}${ranks[coordOfRank]}`,
            );

            if (pieceOnCaptureSquare) {
                let pieceOnCaptureSquarechessboardColor =
                    pieceOnCaptureSquare.pieceNotation ===
                    pieceOnCaptureSquare.pieceNotation.toUpperCase()
                        ? "white"
                        : "black";

                if (pieceOnCaptureSquarechessboardColor != color) {
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
                const piecechessboardColor =
                    pieceOnDestSquare.pieceNotation ==
                    pieceOnDestSquare.pieceNotation.toUpperCase()
                        ? "white"
                        : "black";

                // Skipping the loop if it's our piece
                if (piecechessboardColor == color) {
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
        setHasPlacedPieces(true);
    }

    function setDefaultPosition() {
        resetBoard();
        setFen(defaultFen);
    }

    function moveToNextLevel() {
        setPuzzleLevel((prev) => prev + 1);
    }

    useEffect(() => {
        if (hasPuzzleStarted) {
            resetBoard();

            // Set color opposite to fen
            let startColor = puzzles[puzzleLevel - 1].split(" ")[1];
            startColor == "b" ? setColor("white") : setColor("black");

            setSidebarMode("started");
            setColorChanged(true);
        } else {
            setHasPlacedPieces(false);
        }
    }, [hasPuzzleStarted]);

    useEffect(() => {
        if (colorChanged) {
            setTimeout(() => {
                moveOpponentPiece();
                setColorChanged(false);
            }, 500);
        }
    }, [colorChanged]);

    useEffect(() => {
        if (selectedPiece) createDestSquares(selectedPiece);
    }, [selectedPiece]);

    useEffect(() => {
        if (resetBoardComplete) {
            convertFenToPiecesArray();
            setResetBoardComplete(false);
        }
    }, [resetBoardComplete]);

    useEffect(() => {
        calculateChessboardSize();
        setPuzzleLevel(user.puzzleLevel);
        setDefaultPosition();
    }, []);

    return (
        <div
            className="puzzles-chessboard-container"
            ref={chessboardContainerRef}
        >
            <div
                className={`puzzles-chessboard ${color}`}
                style={{ height: chessboardSize, width: chessboardSize }}
            >
                {/* Ranks and Files */}
                {ranks.map((rank, i) => {
                    //Alternating ranks
                    return i % 2 == 0 ? (
                        <div className="rank" key={i}>
                            {files.map((file, i) => {
                                //Alternating squares
                                return i % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={file + rank}
                                        onClick={handlePieceClick}
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={file + rank}
                                        onClick={handlePieceClick}
                                        key={i}
                                    ></div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rank" key={i}>
                            {files.map((file, i) => {
                                // Alternating squares
                                return (i + 1) % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={file + rank}
                                        onClick={handlePieceClick}
                                        key={i}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={file + rank}
                                        onClick={handlePieceClick}
                                        key={i}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                })}

                {/* Coordinates */}
                <Coords files={files} ranks={ranks} color={color} />

                {/* Mapping out pieces*/}
                {pieces.length > 0 &&
                    squareWidth > 0 &&
                    pieces.map((piece) => {
                        let coordOfFile = files.indexOf(
                            piece.square.split("")[0],
                        );
                        let coordOfRank =
                            7 - ranks.indexOf(piece.square.split("")[1]);

                        let x = coordOfFile * squareWidth;
                        let y = coordOfRank * squareWidth;

                        return (
                            <div
                                key={piece.id}
                                className={"piece"}
                                style={{
                                    transform: `translate(${x}px, ${y}px)`,
                                    transition: hasPlacedPieces
                                        ? "transform 0.1s ease-in-out"
                                        : "none",
                                }}
                                onClick={() => {
                                    handlePieceClick(piece);
                                }}
                            >
                                <img
                                    src={`/images/chess-piece-set/${pieceImages[piece.pieceNotation]}`}
                                    alt="piece"
                                    ref={(element) => {
                                        if (element)
                                            pieceRefs.current[piece.id] =
                                                element;
                                        else delete pieceRefs.current[piece.id];
                                    }}
                                />
                            </div>
                        );
                    })}

                {/* Mapping out destination squares */}
                {destinationSquares.map((square, i) => {
                    const fileNumber = files.indexOf(square.split("")[0]);
                    const rankNumber = 7 - Number(square.split("")[1] - 1);

                    return (
                        <div
                            className="destSquare"
                            style={{
                                transform: `translate(${fileNumber * squareWidth}px, ${rankNumber * squareWidth}px)`,
                            }}
                            key={i}
                            squareid={square}
                            onClick={() => {
                                movePiece(square);
                            }}
                        >
                            <img src="/images/dot.png" alt="dot" />
                        </div>
                    );
                })}

                {/* Mapping out capture squares */}
                {captureSquares.map((square, i) => {
                    const fileNumber = files.indexOf(square.split("")[0]);
                    const rankNumber = 7 - Number(square.split("")[1] - 1);

                    return (
                        <div
                            className="captureSquare"
                            style={{
                                transform: `translate(${fileNumber * squareWidth}px, ${rankNumber * squareWidth}px)`,
                            }}
                            key={i}
                            squareid={square}
                            onClick={() => {
                                capturePiece(square);
                            }}
                        >
                            <img
                                className="top-left"
                                src="/images/triangle.png"
                            />
                            <img
                                className="top-right"
                                src="/images/triangle.png"
                            />
                            <img
                                className="bottom-left"
                                src="/images/triangle.png"
                            />
                            <img
                                className="bottom-right"
                                src="/images/triangle.png"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PuzzlesChessboard;
