import { useContext } from "react";
import { UserContext } from "../../src/contexts";

const login = async (email, password) => {
    try {
        const formData = { email, password };

        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            },
        );

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            return true;
        }
        return false;
    } catch (error) {
        console.log("hello world");
        console.log(error);
        return false;
    }
};

export default login;
