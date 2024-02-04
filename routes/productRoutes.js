

const express = require("express");
const productController = require("../controller/productController");
const productRouter = express.Router();
const Authorize = require("../middleware/auth");

productRouter.post("/add_product",Authorize([1,2,3]), productController.addProduct);
productRouter.post("/get_product",Authorize([1,2,3]), productController.getPrductList);



module.exports = productRouter