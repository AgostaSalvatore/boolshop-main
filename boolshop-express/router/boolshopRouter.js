const express = require("express");
const router = express.Router();
const boolshopController = require("../controllers/boolshopController");

//routes
router.get("/", boolshopController.index);
router.get("/game/:id", boolshopController.show);

//export
module.exports = router;
