import { useState, createContext, useEffect, useRef, useContext } from "react";
import { UserContext } from "./UserContext.jsx";

import {
    beginnerCourse,
    intermediateCourse,
    professionalCourse,
} from "../constants.js";
import getCompleted from "../../apis/user/getCompleted.js";
import updateCompleted from "../../apis/user/updateCompleted.js";

const total =
    beginnerCourse.length +
    intermediateCourse.length +
    professionalCourse.length;

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
    const [completed, setCompleted] = useState([]);
    const [isOpen, setIsOpen] = useState([false, false, false]); //The three false indicate beginner, intermediate and professional

    const firstRender = useRef(true);

    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (!loading && user) {
            setCompleted(user?.completed);
        }
    }, [loading]);

    useEffect(() => {
        if (!firstRender.current) {
            updateCompleted(completed);
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
                total,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export default CourseContextProvider;
