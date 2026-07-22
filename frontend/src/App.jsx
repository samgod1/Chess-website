import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";

import "./App.css";
import {
    Home,
    Course,
    WatchCourse,
    Signup,
    Login,
    Vision,
} from "./pages/index.js";
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
            {
                path: "course/:courseId",
                element: <WatchCourse />,
            },
            {
                path: "vision",
                element: <Vision />,
            },
        ],
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
        </>
    );
}

export default App;
