import { useEffect, useRef, useState } from "react";

const ColorMenu = ({
    color,
    setColor,
    isColorMenuOpen,
    setIsColorMenuOpen,
}) => {
    const buttons = ["white", "black", "random"];

    const colorMenuRef = useRef(null);

    function handleClick(e) {
        if (!colorMenuRef.current.contains(e.target)) {
            setIsColorMenuOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <ul className="popup-menu" id={"colorMenu"} ref={colorMenuRef}>
            {buttons.map((option, i) => (
                <li
                    onClick={(e) => {
                        e.stopPropagation();
                        setColor(option);
                    }}
                    className={color == option ? "selected" : ""}
                    key={i}
                >
                    {option}
                </li>
            ))}
        </ul>
    );
};

export default ColorMenu;
