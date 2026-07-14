import { useEffect } from "react";
import { useState, createContext } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    async function getUser() {
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
