import { useEffect, useRef, useState, useContext } from "react";

import { VisionContext } from "../../../../../../../../contexts";

const ColorMenu = ({ setIsColorMenuOpen }) => {
    const buttons = ["white", "black", "random"];

    const colorMenuRef = useRef(null);

    const { color, setColor, selectedColor, setSelectedColor } =
        useContext(VisionContext);

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
                        setSelectedColor(option);
                        if (option != "random") setColor(option);
                    }}
                    className={selectedColor == option ? "selected" : ""}
                    key={i}
                >
                    {option}
                </li>
            ))}
        </ul>
    );
};

export default ColorMenu;
