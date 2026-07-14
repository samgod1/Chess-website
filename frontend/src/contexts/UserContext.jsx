import { useEffect } from "react";
import { useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    async function getUser() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/user/",
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            const data = await response.json();

            if (response.ok) {
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};

export default UserContextProvider;
