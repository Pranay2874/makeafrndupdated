require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("MakeaFrnd Backend is Running 🚀");
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
