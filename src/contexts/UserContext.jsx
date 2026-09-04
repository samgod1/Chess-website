import { use, useEffect } from "react";
import { useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getUser() {
        try {
            const token = localStorage.getItem("token");

            if (token) {
                const response = await fetch("/api/user/", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, getUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
