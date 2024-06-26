const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const generateToken =require("../config/generateToken");
const registerUser1 = asyncHandler(async (req, res) => {
  const { webmail } = req.body;

  if (!webmail) {
    res.status(400);
    throw new Error("Please enter a webmail");
  }
  else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(webmail))
    {
      res.status(400);
      throw new Error("Please enter valid webmail");
    }
  const userExists = await User.findOne({ webmail });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  res.status(200).json({message:"Webmail accepted",webmail});
  next();
});

const registerUser2 = asyncHandler(async (req, res) => {
  const { otp ,webmail} = req.body;
  res.status(200).json({message:"OTP yet to be done",webmail});
  if (!otp) {
    res.status(400);
    throw new Error("Please enter otp");
  }
  if (otp == OTP) {
    req.userData.otp=otp;
    res.status(200).json({message:"OTP verified",webmail});
  }else{
    res.status(400).json({message:"Invalid OTP"});
  }
  next();
});

const registerUser3 = asyncHandler(async (req,res) =>{
  let { name , webmail , password, profilepicture }= req.body;
  name=name.trim();
  pasword=password.trim();
  if (!name || !password) {
        res.status(400);
        throw new Error("Empty Input Fields");
  } else if (!/^[a-zA-Z]*$/.test(name)){
        res.status(400);
        throw new Error("Please enter valid name with alphabets only");
  } else if (password.length <8){
        res.status(400);
        throw new Error("Password is too short.Enter a password longer than 8 characters");
  }
  
  const user = await User.create({
    name,
    webmail,
    password,
    profilepicture,
  });
   if (user) {
      res.status(201).json({
          _id:user._id,
          name:user.name,
          webmail:user.webmail,
          password:user.password,
          profilepicture:user.profilepicture,
          token:generateToken(user._id),
        })
    } else{
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

const authUser = asyncHandler(async(req,res)=>{
    const {webmail,password}=req.body;
    const  user = await User.findOne({webmail});
    if (user && (await user.matchPassword(password )))
      res.json({
        _id:user._id,
        name:user.name,
        webmail:user.webamil,
        profilepicture:user.profilepicture,
        token: generateToken(user._id),
      })
});

module.exports = {registerUser1,registerUser2,registerUser3,authUser};
