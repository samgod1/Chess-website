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
            localStorage.setItem(token, data.token);
        }
    } catch (error) {
        console.log(error);
    }
};

export default login;
