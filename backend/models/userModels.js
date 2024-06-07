const mongoose = require("mongoose");
const userModel = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilepicture: { type: String, required: true, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwadSagWsHF2jzbqkZAuGdrBaR_lal04CsDz20w62ytJsRGdU&s" },
},
{timestamps:true,}
);

 const User= mongoose.model("User",userModel);
 module.exports= User;