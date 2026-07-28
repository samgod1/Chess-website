import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import {
    UserContextProvider,
    CourseContextProvider,
    ChessboardContextProvider,
    VisionContextProvider,
} from "./contexts/index.js";

createRoot(document.getElementById("root")).render(
    <UserContextProvider>
        <ChessboardContextProvider>
            <VisionContextProvider>
                <CourseContextProvider>
                    <App />
                </CourseContextProvider>
            </VisionContextProvider>
        </ChessboardContextProvider>
    </UserContextProvider>,
);
