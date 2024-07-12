const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const generateToken = require("../config/generateToken");
const generateOTP = require("../utils/otp-generator");
const sendEmail = require("../utils/nodemailer");
const redisClient = require("../config/redisClient");
const jwt = require("jsonwebtoken");

// Register Step 1
const registerUser1 = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Please enter an email");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.status(400);
        throw new Error("Please enter a valid email");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const otp = generateOTP();
    await redisClient.setEx(email, 600, otp); // Store OTP in Redis with a TTL of 600 seconds (10 minutes)
    await sendEmail(email, "OTP VERIFICATION", `Your OTP is ${otp}`);
    const token = generateToken({ email:email, step: 1 }); // Generate token with email and step
    res.status(200).json({ message: "Email accepted, OTP sent", token });
});

// Register Step 2
const registerUser2 = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  console.log("Received OTP:", otp);
  console.log("Received Token:", token);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  const email = decoded.email;
  if (!otp) {
    res.status(400).json({ message: "Please enter OTP" });
    return;
  }

  const storedOTP = await redisClient.get(email);
  console.log(
    "Stored OTP from Redis:",
    storedOTP,
    "Received OTP from client:",
    otp
  );

  if (storedOTP && storedOTP === otp) {
    await redisClient.del(email);
    const newToken = generateToken({
      email: email,
      otpVerified: true,
      step: 2,
    });
    res.status(200).json({ message: "OTP verified", email, token: newToken });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});



// Register Step 3
const registerUser3 = asyncHandler(async (req, res) => {
  let { name, password, profilepicture } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("No token provided or invalid format");
  }

  const token = authHeader.split(" ")[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401);
    throw new Error("Invalid token in step3");
  }

  const email = decoded.email;
  const otpVerified = decoded.otpVerified;
  if (!otpVerified) {
    res.status(400);
    throw new Error("OTP not verified");
  }

  name = name.trim();
  password = password.trim();
  if (!name || !password) {
    res.status(400).json({ message: "Empty Input Fields" });
    return;
  } else if (!/^[a-zA-Z]*$/.test(name)) {
    res
      .status(400)
      .json({ message: "Please enter a valid name with alphabets only" });
    return;
  } else if (password.length < 8) {
    res
      .status(400)
      .json({
        message:
          "Password is too short. Enter a password longer than 8 characters",
      });
    return;
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
      profilepicture,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilepicture: user.profilepicture,
        token: generateToken({ id: user._id }),
      });
    } else {
      res.status(400).json({ message: "Failed to create the user" });
    }
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Authentication
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email: new RegExp(`^${email}$`, "i"),
    });
    if (!user) console.log("User not found");
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilepicture: user.profilepicture,
            token: generateToken({ id: user._id }),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// Fetch All Users
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

module.exports = { registerUser1, registerUser2, registerUser3, authUser, allUsers };