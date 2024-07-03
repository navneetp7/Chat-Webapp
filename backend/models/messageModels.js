const mongoose=require("mongoose");
const messagemodel= mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        content:{type:String,trim:true},
        chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
        readBy:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    },
    {
        timespamps:true,
    },
);

const Message=mongoose.model('Message',messagemodel);
module.exports = Message;