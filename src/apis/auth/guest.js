import toast from "react-hot-toast";

const guest = async () => {
    try {
        const response = await fetch("/api/auth/guest", { method: "GET" });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            return true;
        }

        throw new Error(data.message);
    } catch (error) {
        toast.error(error.message);
        return false;
    }
};

export default guest;
