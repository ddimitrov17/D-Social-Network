const express = require("express");
const cors = require('cors');
const { urlencoded } = require('express');
const { authRoutes } = require('./routes/auth.js')
const { mongoConnection } = require('../server/database/connection.js')
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const { v2 } = require('cloudinary');
const { postRoutes } = require("./routes/postRouter.js");
const { userRoutes } = require("./routes/userRouter.js");
const { eventRoutes } = require("./routes/eventRouter.js");
const { messageRoutes } = require("./routes/messageRoutes.js");
const { app, server } = require("./socket/socket.js");

dotenv.config();

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// const app = express();
app.enable('trust proxy');
app.use(cors({
    origin: 'https://dsocialnetwork.onrender.com',
    credentials: true
}));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes)
app.use("/api/messages", messageRoutes);
app.get("/api/ping", (req, res) => {
    res.status(200).json({ status: "ok" });
});
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    mongoConnection();
});