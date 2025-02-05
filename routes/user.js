const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_USER_PASSWORD } = require("../config");
const { userModel } = require("../db");
const { userauth } = require("../middleware/usermiddleware");

const router = express.Router();


router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`, req.body);
    next();
});

router.post("/signup", async (req, res) => {
    try {
        console.log("Incoming POST request to /signup:", req.body);
        const { username, password } = req.body;

        if (!username || !password) {
            console.log(" Missing username or password");
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            console.log(" Username already exists:", username);
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, password: hashedPassword });

        await newUser.save();
        console.log(" User created successfully:", newUser);
        
        return res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        console.error(" Error in /signup:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None"
        });

        return res.json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/profile", userauth, async (req, res) => {
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ username: user.username, id: user._id });
});

module.exports = router;
