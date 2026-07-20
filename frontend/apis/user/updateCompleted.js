const updateCompleted = async (completed) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/user/completed",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: completed }),
            },
        );
    } catch (error) {
        toast.error(error.message);
    }
};

export default updateCompleted;
