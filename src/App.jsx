import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";
import { Home, Course } from "./pages/index.js";
import RootLayout from "./pages/RootLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "course",
                element: <Course />,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
