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

        if (response.ok) {
            localStorage.setItem("token", data.token);
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default login;
