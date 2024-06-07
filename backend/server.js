const express=require("express");
const dotenv=require("dotenv");
const chats=require("./data/data.js"); //Chats is yet to be created as there is no data as of now.
const connectdb = require("./config/db.js");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes.js");
const app=express();
dotenv.config();
connectdb(); 
app.get('/',(req,res)=>{
    res.send("API is running successfully");

    
})
app.use('/api/user',userRoutes);
const PORT = process.env.PORT || 3030;

app.listen(3030,console.log(`Server running on port ${PORT}`.blue.bold)); 