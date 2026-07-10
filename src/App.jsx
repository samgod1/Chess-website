import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./App.css";
import { Home, Course, WatchCourse, Signup, Login } from "./pages/index.js";
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
        </>
    );
}

export default App;
