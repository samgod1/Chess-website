import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

import "./Chessboard.css";

const Chessboard = ({ started }) => {
    const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];

    const [randomSquare, setRandomSquare] = useState(null);
    const [color, setColor] = useState("white");

    function generateRandomChessSquare() {
        const firstRandomNumber = Math.floor(Math.random() * 8);
        const secondRandomNumber = Math.floor(Math.random() * 8);

        const randomSquare =
            alphabets[firstRandomNumber] + numbers[secondRandomNumber];

        setRandomSquare(randomSquare);
    }

    function checkUserInput(e) {
        if (e.target.id === randomSquare) {
            // animate square green
            gsap.to(e.target, {
                backgroundColor: "var(--c-green)",
                duration: 0.2,
                yoyo: true,
                repeat: 1,
            });

            // play sound
        } else {
            //animate square red
            gsap.to(e.target, {
                backgroundColor: "var(--c-red)",
                duration: 0.2,
                yoyo: true,
                repeat: 1,
            });
        }
    }

    useEffect(() => {
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
                className={`chessboard ${color}`}
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
                                        onClick={checkUserInput}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={alphabet + number}
                                        onClick={checkUserInput}
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
                                        onClick={checkUserInput}
                                    ></div>
                                ) : (
                                    <div
                                        className="square light"
                                        id={alphabet + number}
                                        onClick={checkUserInput}
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
