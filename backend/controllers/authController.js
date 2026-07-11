export const Signup = (req, res) => {
    const formData = req.body;
    console.log(req.body);

    return res.status(200).json({ message: "endpoint reached" });
};

export const Login = (req, res) => {
    return;
};

export const Logout = (req, res) => {
    return;
};
