const signup = async (email, password) => {
    const formData = { email, password };

    const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/signup",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        },
    );

    console.log(await response.json());
};

export default signup;
