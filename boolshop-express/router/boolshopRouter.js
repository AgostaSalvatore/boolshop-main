const express = require("express");
const router = express.Router();
const boolshopController = require("../controllers/boolshopController");
const orderController = require("../controllers/orderController");

//routes
router.get("/videogame", boolshopController.index);
router.get("/videogame/:id", boolshopController.show);

router.post("/order", orderController.create);
router.get("/order/:id", orderController.getById);

//export
module.exports = router;
