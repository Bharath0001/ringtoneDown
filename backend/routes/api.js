const express = require("express");
const { getHomePage } = require("../controller/dataController");


const router = express.Router();

router.get("/",getHomePage);
// router.get("/ringtones/:movieId", getRingtones);

module.exports = router;
