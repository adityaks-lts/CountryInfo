const express = require('express');
require("dotenv").config();
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const user = require("./routes/user")
const searches = require("./routes/searches")
const port = 3000;
const auth = require("./middleware/auth");
const favorites = require('./routes/favorite');


app.use(express.json());
app.use(cors({origin:[process.env.FRONTEND_URL,"http://localhost:3000"]}))

app.use("/user",user);
app.use("/searches",auth, searches)
app.use("/favorites",auth,favorites)

app.listen(port, async() => {
    await connectDB;
  console.log(`Server running at http://localhost:${port}`);
});