const express = require("express");
const { getHomePage, getRingtones, searchItems } = require("../controller/dataController");


const router = express.Router();

router.get("/",getHomePage);
router.get("/movie/:movieId", getRingtones);
router.get("/search", searchItems);

module.exports = router;
