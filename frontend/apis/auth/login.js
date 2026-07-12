const login = async (email, password) => {
    const formData = { email, password };

    const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include",
        },
    );
};

export default login;
