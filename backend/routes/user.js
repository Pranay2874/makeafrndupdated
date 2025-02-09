const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_USER_PASSWORD } = require("../config");
const userModel = require("../db").userModel;

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        const existingUser = await userModel.findOne({ username: username.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username: username.toLowerCase(), password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_USER_PASSWORD, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000 // 1 hour
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});




router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username: username.toLowerCase() });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_USER_PASSWORD, { expiresIn: "1h" });

        // Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000 // 1 hour
        });

        // Also send the token in the response body
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});
router.get("/profile", async (req, res) => {
    try {
        console.log("Incoming Profile Request");

        const token = req.cookies.token;
        if (!token) {
            console.log(" No token provided");
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_USER_PASSWORD);
        } catch (err) {
            console.error(" JWT Verification Failed:", err.message);
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        console.log("Token Verified, User ID:", decoded.userId);

        const user = await userModel.findById(decoded.userId);
        if (!user) {
            console.log(" User not found in database");
            return res.status(404).json({ message: "User not found" });
        }

        console.log(" User Found:", user.username);
        res.status(200).json({ username: user.username });

    } catch (error) {
        console.error("Profile Fetch Error:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.post("/logout", (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error: error.message });
    }
});



//  Change Username Route
router.post("/change-username", async (req, res) => {
    try {
        const { newUsername } = req.body;

        if (!newUsername) {
            return res.status(400).json({ message: "New username is required" });
        }

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_USER_PASSWORD);
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        const userId = decoded.userId;

        // Check if username is already taken
        const existingUser = await userModel.findOne({ username: newUsername.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        //  Update username and return updated user
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { username: newUsername.toLowerCase() },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Username changed successfully", username: updatedUser.username });

    } catch (error) {
        res.status(500).json({ message: "Error changing username", error: error.message });
    }
});
module.exports = router;
