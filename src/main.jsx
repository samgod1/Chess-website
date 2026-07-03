import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import CourseContextProvider from "./contexts/CourseContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CourseContextProvider>
            <App />
        </CourseContextProvider>
    </StrictMode>,
);
