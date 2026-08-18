import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import {
    UserContextProvider,
    CourseContextProvider,
    VisionContextProvider,
    PuzzlesContextProvider,
} from "./contexts/index.js";

createRoot(document.getElementById("root")).render(
    <UserContextProvider>
        <PuzzlesContextProvider>
            <VisionContextProvider>
                <CourseContextProvider>
                    <App />
                </CourseContextProvider>
            </VisionContextProvider>
        </PuzzlesContextProvider>
    </UserContextProvider>,
);
