import { useEffect, useRef, useState } from "react";

const TimeMenu = ({ time, setTime, setIsTimeMenuOpen }) => {
    const buttons = ["15s", "30s", "45s"];

    const timeMenuRef = useRef(null);

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
                        e.stopPropagation();
                        setTime(Number(option.split("s")[0]));
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
