const User = require("../query/user");
const Validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Util = require("../utils/util");
dotenv.config();

const addUser = async (req, res) => {
  try {
    const { username, email, password, userrole } = req.body;
    if (!(username && email && password && userrole)) {
      return res
        .status(400)
        .json({ success: false, message: "Mandatory fields can't be empty!" });
    }
    // validateEmail
    const validateEmail = Validator.isEmail(email);
    if (!validateEmail) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const usernameExits  = await User.userUsernameOrEmailExists(username,email);
        if(usernameExits[0]["Count(*)"]>0){
            return res.status(400).json({success:false , message:"Please enter unique username and email!"});
        }

    const hashPassword = await bcrypt.hash(password, 10);

    let saveData = {
      username,
      email,
      password: hashPassword,
      userrole: String(userrole ? userrole : 1),
      createdAt: new Date(),
    };
    await User.createUser(saveData, res);
    return res
      .status(200)
      .json({ success: true, message: "User added successfully!" });
  } catch (e) {
    console.log(e, "nn");
    return res
      .status(500)
      .json({ sucess: false, message: "Something went wrong!" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!( email && password)) {
      return res.status(400).json({
        success: false,
        message: "Mandatory fields can not be epmty!",
      });
    }
    // validate email
    const validateEmail = Validator.isEmail(email);
    if (!validateEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email!" });
    }

    const findUser = await User.userExists(username, email);
    if (findUser.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exists" });
    }
    // compare password
    const validatePassword =  bcrypt.compare(password, findUser[0].password);
    if (!validatePassword) {
      return res
        .status(400)
        .json({success:false, message:"Password mismatch" });
    }

    // // geneateToken
    const accessToken =  await Util.GenerateAccessToken(findUser[0].user_id, findUser[0].username, findUser[0].email,findUser[0].userrole)
    const refreshToken =  await Util.GenerateRefreshToken(findUser[0].user_id,findUser[0].userrole)
    let userData = {
      id: findUser[0].user_id,
      username: findUser[0].username,
      email: findUser[0].email,
      userrole: findUser[0].userrole,
    };

    const options = {
        httpOnly: true,
        secure: true,
      };
  

    // //   const accessToken = await user.GenerateAccessToken(user?._id);
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ sucess: true, userData, accessToken, refreshToken });
  } catch (e) {
    console.log(e, "nn");
    return res
      .status(500)
      .json({ sucess: false, message: "Something went wrong!" });
  }
};

module.exports = {
  addUser,
  userLogin,

};
