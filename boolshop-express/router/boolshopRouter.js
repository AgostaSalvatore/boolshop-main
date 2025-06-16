const express = require("express");
const router = express.Router();
const boolshopController = require("../controllers/boolshopController");

//routes
router.get("/", boolshopController.index);
router.get("/:id", boolshopController.show);
router.get("/price-desc", boolshopController.orderByPriceDesc);
router.get("/price-asc", boolshopController.orderByPriceAsc);

//export
module.exports = router;
