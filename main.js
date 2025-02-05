require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user");

const app = express();

// ✅ Updated CORS to include both frontend & backend URLs
app.use(cors({ 
  origin: [
    "http://localhost:5173",          // Local development
    "https://makeafrnd.vercel.app",   // Frontend URL on Vercel
    "https://makeafrnd2.onrender.com" // Backend URL on Render
  ],  
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected!");
}).catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
});

// ✅ Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`📢 Incoming request: ${req.method} ${req.path}`, req.body);
    next();
});

// ✅ Routes
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("✅ Backend is Running!");
});

// ✅ Ensure the backend uses the correct PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
