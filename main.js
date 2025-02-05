require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user");

const app = express();


app.use(cors({ 
    origin: [
        "http://localhost:5173",  
        "https://makeafrnd2.onrender.com",  
        "https://makeafrnd.vercel.app" 
    ], 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());  
app.use(cookieParser());  


mongoose.set("strictQuery", false); 

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(" MongoDB Connected!");
    console.log(`Connected to DB: ${mongoose.connection.db.databaseName}`);
}).catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
});


app.use((req, res, next) => {
    console.log(`🔹 Incoming request: ${req.method} ${req.path}`);
    if (Object.keys(req.body).length) console.log("🔹 Request Body:", req.body);
    next();
});

app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("✅ Backend is Running!");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
