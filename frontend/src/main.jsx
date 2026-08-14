import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import {
    UserContextProvider,
    CourseContextProvider,
    ChessboardContextProvider,
    VisionContextProvider,
    PuzzlesContextProvider,
} from "./contexts/index.js";

createRoot(document.getElementById("root")).render(
    <UserContextProvider>
        <PuzzlesContextProvider>
            <VisionContextProvider>
                <ChessboardContextProvider>
                    <CourseContextProvider>
                        <App />
                    </CourseContextProvider>
                </ChessboardContextProvider>
            </VisionContextProvider>
        </PuzzlesContextProvider>
    </UserContextProvider>,
);
