const signup = async (email, password, username) => {
    const formData = { email, password, username };

    const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/signup",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include",
        },
    );

    console.log(await response.json());
};

export default signup;
