import toast from "react-hot-toast";

const login = async (email, password) => {
    try {
        const formData = { email, password };

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            return true;
        }

        throw new Error(data.message);
    } catch (error) {
        toast.error(error.message);
        return false;
    }
};

export default login;
