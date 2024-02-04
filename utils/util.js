const dotenv  = require("dotenv");
dotenv.config();
const Jwt = require("jsonwebtoken"); 
const bcrypt = require("bcrypt");



const Util = {
 GenerateAccessToken: async function(user_id, username, email,userrole){
    //   console.log(user_id,username,"nnnnnnnnnnnnnnn")
    return Jwt.sign({
         id:user_id,
         username,
         email,
         userrole
    },
    process.env.Access_Token,
    {expiresIn:process.env.Expiration}

    )
},

GenerateRefreshToken : async function(user_id, userrole){
    return Jwt.sign({
        id:user_id,
        userrole
    },
    process.env.Refresh_Token,
    {expiresIn:"30d"}

    )
}


}


module.exports = Util