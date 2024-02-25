const { getProductDetail } = require("../controller/productController");
const db = require("../database/connection");
const util = require("util");

const Query = util.promisify(db.query).bind(db);

const Product = {
  createProduct: async (data, res) => {
    try {
      return await Query("Insert INTO products SET ?", [data]);
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  },

  userExists: async (username, email, res) => {
    try {
      return await Query(
        "SELECT * FROM user WHERE username = '" +
          username +
          "' OR email = '" +
          email +
          "'",
        []
      );
    } catch (err) {
      // console.log(err, "nn");
      return res.status(500).send({ status: false, message: err.message });
    }
  },

  getProduct: async (id,data,res) => {
    try {
         console.log("select product_name, product_title, product_category,  DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') AS createDate from products where created_By = '"+id+"'order by  '"+data.sortdirection+"'  LIMIT "+ data.pageSize +"  offset "+data.offset+" ","nnnnnnnnnnn")
      return await Query("SELECT products.product_name, products.product_title, products.product_category, user.username FROM products INNER JOIN user ON products.created_By = user.user_id ORDER BY '"+data.sortdirection+"' LIMIT "+ data.pageSize +" OFFSET "+data.offset+" ",[]);
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  },

  productNameExists:async(product_name,res)=>{
    try{
        return await Query("SELECT Count(*) FROM products WHERE product_name = '"+ product_name +"' ",[]);
    }catch(err){
        console.log(err,"nn")
      return res.status(500).send({ status: false, message: err.message });
    }
},

updateProduct: async (data, res) => {
  try {
    //console.log("Update products Set product_name='"+data.product_name+"', created_By='"+data.created_By+"', product_title='"+data.product_title+"', product_category='"+data.product_category+"', updatedAt='"+data.updatedAt+"' WHERE product_id ="+data.product_id+" ","bbbb" )
    return await Query("Update products Set product_name='"+data.product_name+"', created_By='"+data.created_By+"', product_title='"+data.product_title+"', product_category='"+data.product_category+"', updatedAt='"+data.updatedAt+"' WHERE product_id ="+data.product_id+" " ,[]);
  } catch (err) {
    //console.log(err,"rrr")
    return res.status(500).send({ status: false, message: err.message });
  }
},

getDetail: async (id,res) => {
  try {
    return await Query("Select * from products where product_id='"+id+" '",[]);
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
},

deleteProduct: async (id,res) => {
  try {
    return await Query("Delete from products where product_id='"+id+" '",[]);
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
},

   

};

module.exports = Product;
