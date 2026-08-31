import { useState, createContext, useEffect, useRef, useContext } from "react";
import { UserContext } from "./UserContext.jsx";

import {
    beginnerCourse,
    intermediateCourse,
    advanceCourse,
} from "../constants.js";
import updateCompleted from "../../apis/user/updateCompleted.js";

const total =
    beginnerCourse.length + intermediateCourse.length + advanceCourse.length;

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
    const [completed, setCompleted] = useState([]);
    const [isOpen, setIsOpen] = useState([false, false, false]); //The three false indicate beginner, intermediate and professional
    const [medals, setMedals] = useState([]);
    const [hasCompleted, setHasCompleted] = useState(false);

    const firstRender = useRef(true);

    const { user, loading } = useContext(UserContext);

    function checkForMedal() {
        let bronzeMedal = true;
        let silverMedal = true;
        let goldMedal = true;

        beginnerCourse.forEach((course) => {
            if (!completed.includes(course.courseId)) {
                bronzeMedal = false;
            }
        });
        intermediateCourse.forEach((course) => {
            if (!completed.includes(course.courseId)) {
                silverMedal = false;
            }
        });
        advanceCourse.forEach((course) => {
            if (!completed.includes(course.courseId)) {
                goldMedal = false;
            }
        });

        if (bronzeMedal) {
            setMedals((prev) => [...prev, "bronze"]);
        }
        if (silverMedal) {
            setMedals((prev) => [...prev, "silver"]);
        }
        if (goldMedal) {
            setMedals((prev) => [...prev, "gold"]);
        }
    }

    useEffect(() => {
        if (!loading && user) {
            setCompleted(user?.completed);
        }
    }, [loading]);

    useEffect(() => {
        if (!firstRender.current) {
            updateCompleted(completed);
            checkForMedal();
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
                medals,
                hasCompleted,
                setHasCompleted,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export default CourseContextProvider;
