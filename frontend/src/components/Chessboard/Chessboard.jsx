import { useState, useRef } from "react";

import "./Chessboard.css";

const Chessboard = () => {
    const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

    const [started, setStarted] = useState(false); //Vision practice
    const [randomSquare, setRandomSquare] = useState(null);
    const [color, setColor] = useState("white");

    function generateRandomChessSquare() {
        const firstRandomNumber = Math.floor(Math.random() * 8);
        const secondRandomNumber = Math.floor(Math.random() * 8);

        const randomSquare =
            alphabets[firstRandomNumber] + numbers[secondRandomNumber];

        setRandomSquare(randomSquare);
    }

    useState(() => {
        if (started) {
            generateRandomChessSquare();
        }
    }, [started]);

    return (
        <div className="chessboard-container">
            {started && (
                <div className="randomSquareDisplay">{randomSquare}</div>
            )}
            <div
                className="chessboard white"
                onClick={() => {
                    if (started) {
                        generateRandomChessSquare();
                    }
                }}
            >
                {numbers.map((number, i) => {
                    //Alternating ranks
                    return i % 2 == 0 ? (
                        <div className="rank">
                            {alphabets.map((alphabet, i) => {
                                //Alternating squares
                                return i % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={alphabet + number}
                                        onClick={(e) => {
                                            console.log(e.target.id);
                                        }}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={alphabet + number}
                                        onClick={(e) => {
                                            console.log(e.target.id);
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rank">
                            {alphabets.map((alphabet, i) => {
                                // Alternating squares
                                return (i + 1) % 2 == 0 ? (
                                    <div
                                        className="square dark"
                                        id={alphabet + number}
                                        onClick={(e) => {
                                            console.log(e.target.id);
                                        }}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={alphabet + number}
                                        onClick={(e) => {
                                            console.log(e.target.id);
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Chessboard;
