require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user");

const app = express();

// ✅ Allow both local and deployed frontend in CORS
app.use(cors({ 
  origin: ["http://localhost:5173", "https://makeafrnd.vercel.app"],  
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
    console.log(`📌 Connected to DB: ${mongoose.connection.db.databaseName}`);
}).catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
});

// ✅ Routes
app.use("/user", userRouter);  

app.get("/", (req, res) => {
    res.send("✅ Backend is Running!");
});

// ✅ Use dynamic PORT (Important for Render)
const PORT = process.env.PORT || 10000;  // This is correct for local

app.listen(PORT, "0.0.0.0", () => {   // ✅ Ensures Render can bind to the port
    console.log(`🚀 Server running on PORT ${PORT}`);
});
