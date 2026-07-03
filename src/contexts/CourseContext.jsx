import { useState, createContext } from "react";

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
    const [completed, setCompleted] = useState([]);

    return (
        <CourseContext.Provider value={{ completed, setCompleted }}>
            {children}
        </CourseContext.Provider>
    );
};

export default CourseContextProvider;
