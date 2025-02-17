require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const rateLimit = require("express-rate-limit");

const routes = require("./routes/api");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 15, 
    message: { error: "Too many downloads from this IP, please try again later." },
    headers: true,
});

app.use(limiter)
app.use("/", routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));