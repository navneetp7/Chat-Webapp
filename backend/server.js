const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data.js"); //Chats is yet to be created as there is no data as of now.
const connectdb = require("./config/db.js"); // Database mongodb
const colors = require("colors");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const responses = require("./utils/responses.js").default;
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

dotenv.config();
connectdb();
const app = express();

app.use(cors()); //cors middleware
app.use(express.json()); //To take in the json data

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`.blue.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup",(userData)=>{
    socket.join(userData._id);
    socket.emit("connected");
  }); 
  socket.on("join chat",(room)=>{
    socket.join(room);
    console.log("User Joined room: "+ room);
  });
  socket.on("typing",(room)=> {
    socket.in(room).emit("typing")
    console.log("typing");
  });
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message",(newMessageRecieved)=>{
    var chat= newMessageRecieved.chat;
     if (!chat.users) return console.log("chat.usersnot defined");
     chat.users.forEach(user=>{
      if (user._id== newMessageRecieved.sender_id) return;
      socket.in(user._id).emit("message recieved",newMessageRecieved);
     }) 
  })
  socket.off("setup",()=>{
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  })
}); 