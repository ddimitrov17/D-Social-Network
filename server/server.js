const express = require("express");
const { urlencoded } = require('express');
const { router } = require('./routes/auth.js')
const { mongoConnection } = require('../server/database/connection.js')
const dotenv = require('dotenv');

dotenv.config();
const app = express();


app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/api/auth', router);
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    mongoConnection();
});