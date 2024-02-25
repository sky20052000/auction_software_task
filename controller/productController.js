const User = require("../query/user");
const Product = require("../query/product");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Util = require("../utils/util");
dotenv.config();

const addProduct = async (req, res) => {
  try {
    const { product_name, product_title, product_category } = req.body;
    if (!(product_name && product_title && product_category)) {
      return res
        .status(400)
        .json({ success: false, message: "Mandatory fields can't be empty!" });
    }

    const productNameExits = await Product.productNameExists(product_name);
    if (productNameExits[0]["Count(*)"] > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Product name is already exists!" });
    }

    let saveData = {
      product_name,
      created_By: String(req.middleware.id),
      product_title,
      product_category,
      createdAt: new Date(),
    };
    await Product.createProduct(saveData, res);
    return res
      .status(200)
      .json({ success: true, message: "Prodcut added successfully!" });
  } catch (e) {
    console.log(e, "nn");
    return res
      .status(500)
      .json({ sucess: false, message: "Something went wrong!" });
  }
};

const getPrductList = async (req, res) => {
  try {
    let { sortcolumn, sortdirection, pageNumber, pageSize } = req.body;
    pageNumber = pageNumber ? parseInt(pageNumber) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 2;
    const offset = (pageNumber - 1) * pageSize;
    let findMatch = {
      sortcolumn,
      sortdirection,
      pageSize,
      offset,
    };

    let getProduct = await Product.getProduct(req.middleware.id, findMatch);
    //  console.log(getProduct,'nn')
    if (getProduct.length == 0) {
      return res
        .status(200)
        .json({ success: true, message: "No records found!" });
    }
    return res.status(200).json({ success: true, data: getProduct });
  } catch (e) {
    console.log(e, "error");
    return res
      .status(500)
      .json({ sucess: false, message: "Something went wrong!" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { product_id, product_name, product_title, product_category } =
      req.body;
    if (!(product_id && product_name && product_title && product_category)) {
      return res
        .status(400)
        .json({ success: false, message: "Mandatory fields can't be empty!" });
    }

    let updateData = {
      product_id,
      product_name,
      created_By: String(req.middleware.id),
      product_title,
      product_category,
      updatedAt:new Date().toISOString()
    };
    await Product.updateProduct(updateData, res);
    return res
      .status(200)
      .json({ success: true, message: "Prodcut updated successfully!" });
  } catch (e) {
    console.log(e, "nn");
    return res
      .status(500)
      .json({ sucess: false, message: "Something went wrong!" });
  }
};

const getProductDetail = async (req, res) => {
  try {
    let getProductDetail = await Product.getDetail(req.params.id, res);
    //  console.log(getProduct,'nn')
    if (getProductDetail.length == 0) {
      return res
        .status(200)
        .json({ success: true, message: "No records found!" });
    }
    return res.status(200).json({ success: true, data: getProductDetail });
  } catch (e) {
    console.log(e, "error");
    return res
      .status(500)
      .json({ sucess: false, message: "Something went wrong!" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.deleteProduct(req.params.id, res);

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (e) {
    console.log(e, "error");
    return res
      .status(500)
      .json({ sucess: false, message: "Something went wrong!" });
  }
};

module.exports = {
  addProduct,
  getPrductList,
  updateProduct,
  getProductDetail,
  deleteProduct,
};
