const express = require('express');
const dotenv = require("dotenv")
const app = express();

//Env Variables
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is listing at port ${PORT}`))