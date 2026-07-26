import { useState, useContext, Activity } from "react";

import "./Options.css";
import { TimeMenu, ColorMenu } from "../index.js";
import { VisionContext } from "../../../../../../../../contexts/index.js";

const Options = () => {
    const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
    const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);

    const { setHasStarted } = useContext(VisionContext);

    return (
        <>
            <div className="options">
                <div className="show-coordinates">
                    <input type="checkbox" />
                    <span>Show coordinates</span>
                </div>
                <div className="button-container">
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

                        <Activity mode={isTimeMenuOpen ? "visible" : "hidden"}>
                            <TimeMenu setIsTimeMenuOpen={setIsTimeMenuOpen} />
                        </Activity>
                    </button>
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
                        <Activity mode={isColorMenuOpen ? "visible" : "hidden"}>
                            <ColorMenu
                                setIsColorMenuOpen={setIsColorMenuOpen}
                            />
                        </Activity>
                    </button>
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
