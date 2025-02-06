const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userauth(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            res.clearCookie("token");
            return res.status(401).json({ message: "Session expired, please log in again." });
        }

        jwt.verify(token, JWT_USER_PASSWORD, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token, please log in again." });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Error in authentication middleware" });
    }
}

module.exports = { userauth };
