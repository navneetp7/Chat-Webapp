const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data.js"); //Chats is yet to be created as there is no data as of now.
const connectdb = require("./config/db.js"); // Database mongodb
const colors = require("colors");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("../backend/routes/chatRoutes.js");
const messageRoutes = require("../backend/routes/messageRoutes.js");
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

const PORT = process.env.PORT || 5000;

const server = app.listen(
  5000,
  console.log(`Server running on port ${PORT}`.blue.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3030",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
});
