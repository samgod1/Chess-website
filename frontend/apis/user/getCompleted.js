const getCompleted = async () => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/user/completed",
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            const data = await response.json();

            if (response.ok) {
                return data.completed;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export default getCompleted;
