import { useState, createContext, useEffect, useRef } from "react";

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
    const [completed, setCompleted] = useState([]);
    const [isOpen, setIsOpen] = useState([false, false, false]); //The three false indicate beginner, intermediate and professional
    const firstRender = useRef(true);

    useEffect(() => {
        const localCompleted = localStorage.getItem("completed");
        if (localCompleted) {
            setCompleted(JSON.parse(localCompleted));
        }
    }, []);

    useEffect(() => {
        if (!firstRender.current) {
            localStorage.setItem("completed", JSON.stringify(completed));
        }
        firstRender.current = false;
    }, [completed]);

    return (
        <CourseContext.Provider
            value={{
                completed,
                setCompleted,
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export default CourseContextProvider;
