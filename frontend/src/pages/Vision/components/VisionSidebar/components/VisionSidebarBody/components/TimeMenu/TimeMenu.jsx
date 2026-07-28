import { useEffect, useRef, useState, useContext } from "react";

import { VisionContext } from "../../../../../../../../contexts";

const TimeMenu = ({ setIsTimeMenuOpen }) => {
    const buttons = ["15s", "30s", "45s"];

    const timeMenuRef = useRef(null);

    const { time, setTime } = useContext(VisionContext);

    function handleClick(e) {
        if (!timeMenuRef.current.contains(e.target)) {
            setIsTimeMenuOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <ul className="popup-menu" id={"timeMenu"} ref={timeMenuRef}>
            {buttons.map((option, i) => (
                <li
                    onClick={(e) => {
                        setTime(Number(option.split("s")[0]));
                        setIsTimeMenuOpen(false);
                    }}
                    className={
                        time == Number(option.split("s")[0]) ? "selected" : ""
                    }
                    key={i}
                >
                    {option}
                </li>
            ))}
        </ul>
    );
};

export default TimeMenu;
