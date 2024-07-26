import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
    return res.status(200).send("Welcome to the homepage!");
});

app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "I am coming from the backend",
        success: true,
    });
});

// API
app.use("/api/v1/user", userRoute);   //http://localhost:8000/api/v1/user/login or register or profile/update

app.listen(PORT, () => {
    connectDB();

    console.log(`Server running at http://localhost:${PORT}`);
});
