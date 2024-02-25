

const express = require("express");
const productController = require("../controller/productController");
const productRouter = express.Router();
const Authorize = require("../middleware/auth");

productRouter.post("/add_product",Authorize([1,2,3]), productController.addProduct);
productRouter.put("/update_product",Authorize([1,2,3]), productController.updateProduct);
productRouter.post("/get_product",Authorize([1,2,3]), productController.getPrductList);
productRouter.get("/get_product_detail/:id",Authorize([1,2,3]), productController.getProductDetail);
productRouter.delete("/delete_product/:id",Authorize([1,2,3]), productController.deleteProduct);



module.exports = productRouter