const guest = async () => {
    const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/guest",
        { method: "GET", credentials: "include" },
    );

    console.log(await response.json());
};

export default guest;
