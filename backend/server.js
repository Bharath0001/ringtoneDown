require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const routes = require("./routes/api");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


app.use("/", routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));