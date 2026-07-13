const guest = async () => {
    try {
        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/auth/guest",
            { method: "GET" },
        );

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
        }
    } catch (error) {
        console.log(error);
    }
};

export default guest;
