
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userauth(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: "Authorization token is missing" });

        jwt.verify(token, JWT_USER_PASSWORD, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Session expired. Please log in again." });
                }
                return res.status(403).json({ message: "Invalid token", error: err.message });
            }
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { userauth };