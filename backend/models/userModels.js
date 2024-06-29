const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const userModel = mongoose.Schema({
  name: { type: String, required: true },
  webmail: { type: String, required: true },
  password: { type: String, required: true },
  profilepicture: { type: String, required: true, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwadSagWsHF2jzbqkZAuGdrBaR_lal04CsDz20w62ytJsRGdU&s" },
},
{timestamps:true,}
);

userModel.methods.matchPassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password);
}
userModel.pre('save',async function (next){
    if(!this.isModified)
      {
        next();
      }
    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
 const User= mongoose.model("User",userModel);
 module.exports= User; 