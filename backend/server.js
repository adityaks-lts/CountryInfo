const express = require('express');
require("dotenv").config();
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const user = require("./routes/user")

const port = 3000;


app.use(express.json());
app.use(cors({origin:[process.env.FRONTEND_URL,"http://localhost:3000"]}))

app.use("/user",user);


app.listen(port, async() => {
    await connectDB;
  console.log(`Server running at http://localhost:${port}`);
});