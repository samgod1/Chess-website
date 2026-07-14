import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import CourseContextProvider from "./contexts/CourseContext.jsx";
import UserContextProvider from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
    <UserContextProvider>
        <CourseContextProvider>
            <App />
        </CourseContextProvider>
    </UserContextProvider>,
);
