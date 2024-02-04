const db = require("../database/connection");
const util = require("util")

const Query = util.promisify(db.query).bind(db);

const User = {

  createUser:async(data,res)=>{
          try{
            return await Query("Insert INTO user SET ?", [data])
           
          }catch(err){
            return res.status(500).send({ status: false, message: err.message });
          }
   },

   userUsernameOrEmailExists:async(username,email,res)=>{
    try{
        return await Query("SELECT Count(*) FROM user WHERE username = '"+ username +"' OR email = '"+ email +"'",[]);
    }catch(err){
        console.log(err,"nn")
      return res.status(500).send({ status: false, message: err.message });
    }
},
   

   userExists:async(username,email,res)=>{
    try{
        return await Query("SELECT * FROM user WHERE username = '"+ username +"' OR email = '"+ email +"'",[]);
    }catch(err){
        console.log(err,"nn")
      return res.status(500).send({ status: false, message: err.message });
    }
},



}

module.exports = User;