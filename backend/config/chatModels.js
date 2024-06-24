const mongoose =require("mongoose");
const chatmodel=mongoose .Schema(
    {
        chatname:{type:String,trim:true},
        isGroupchat:{type:Boolean,default:false},
        user:
            { // i have removed [ before the { 
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            }, // ] after } has been removed.
        latestchat: 
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Message",
            },
        groupAdmin:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },

    },
    {
        timestamps:true,
    }

);

const Chat=mongoose.model("Chat",chatmodel);

module.exports= Chat;
