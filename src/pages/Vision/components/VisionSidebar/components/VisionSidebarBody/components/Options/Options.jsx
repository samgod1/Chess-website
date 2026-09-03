import { useState, useEffect, useContext, Activity } from "react";
import gsap from "gsap";

import "./Options.css";
import { TimeMenu, ColorMenu } from "../index.js";
import { VisionContext } from "../../../../../../../../contexts/index.js";

const Options = () => {
    const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
    const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);

    const { setHasStarted, isCoordinates, setIsCoordinates } =
        useContext(VisionContext);

    useEffect(() => {
        if (isTimeMenuOpen) {
            gsap.to(".time-menu-container", {
                height: "auto",
                duration: 0.1,
            });
        } else {
            gsap.to(".time-menu-container", { height: "0px", duration: 0.1 });
        }
    }, [isTimeMenuOpen]);

    useEffect(() => {
        if (isColorMenuOpen) {
            gsap.to(".color-menu-container", {
                height: "auto",
                duration: 0.1,
            });
        } else {
            gsap.to(".color-menu-container", { height: "0px", duration: 0.1 });
        }
    }, [isColorMenuOpen]);

    return (
        <>
            <div className="options">
                <div className="show-coordinates">
                    <input
                        type="checkbox"
                        defaultChecked={isCoordinates}
                        onClick={() => {
                            setIsCoordinates(!isCoordinates);
                        }}
                    />
                    <span>Show coordinates</span>
                </div>
                <div className="button-container">
                    <div className="button-wrapper">
                        <button
                            className="time"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsTimeMenuOpen(!isTimeMenuOpen);
                                if (isColorMenuOpen) {
                                    setIsColorMenuOpen(false);
                                }
                            }}
                        >
                            <img
                                src="/images/time.png"
                                alt="time"
                                width={20}
                                height={20}
                            />
                            <span>Time</span>
                        </button>
                        <TimeMenu
                            isTimeMenuOpen={isTimeMenuOpen}
                            setIsTimeMenuOpen={setIsTimeMenuOpen}
                        />
                    </div>
                    <span className="button-wrapper">
                        <button
                            className="color"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsColorMenuOpen(!isColorMenuOpen);
                                if (isTimeMenuOpen) {
                                    setIsTimeMenuOpen(false);
                                }
                            }}
                        >
                            <img
                                src="/images/color.png"
                                alt="pawn"
                                width={20}
                                height={20}
                            />
                            <span>Color</span>
                        </button>
                        <ColorMenu setIsColorMenuOpen={setIsColorMenuOpen} />
                    </span>
                </div>
            </div>
            <button
                className="start"
                onClick={() => {
                    setHasStarted(true);
                }}
            >
                Start
            </button>
        </>
    );
};

export default Options;
