import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token; // Extract token from cookies

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // Attach user information to the request object
        req.user = {
            id: decoded.userId
        };

        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export default isAuthenticated;
