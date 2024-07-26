import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Extract token from cookies
        if (!token) {
            return res.status(401).json({
                message: "User not Authenticated",
                success: false
            });
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            });
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export default isAuthenticated;
