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

dotenv.config();

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user",userRoutes);
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    mongoConnection();
});