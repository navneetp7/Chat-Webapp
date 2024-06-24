const mongoose=require("mongoose");
const messagemodel= mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        content:{type:String,trim:true},
        chat:{type:mongoose.Schema.types.ObjectId,ref:"Chat"},
    },
    {
        timespamps:true,
    },
);

const Message=mongoose.model('Message',messsagemodel);
module.exports = Message;