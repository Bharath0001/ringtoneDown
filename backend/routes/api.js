const express = require("express");
const { getHomePage, getRingtones } = require("../controller/dataController");


const router = express.Router();

router.get("/",getHomePage);
router.get("/movie/:movieId", getRingtones);

module.exports = router;
