const express = require("express");
const router = express.Router();
const boolshopController = require("../controllers/boolshopController");

//routes
router.get("/", boolshopController.index);
router.get("/price-desc", boolshopController.orderByPriceDesc);
router.get("/price-asc", boolshopController.orderByPriceAsc);
router.get("/:id", boolshopController.show);

//export
module.exports = router;
