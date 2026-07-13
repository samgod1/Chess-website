const signup = async (email, password, username) => {
    try {
        const formData = { email, password, username };

        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/auth/signup",
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
        return false;
        console.log(error);
    }
};

export default signup;
