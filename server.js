const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const { Pool } = require("pg");
const port = 8000;
const daysRouter = require(
   './routes/days'
);
const interviewrouter = require(
   './routes/interview'
);
const availableinterviewerrouter = require(
   './routes/available_interviewer'
);
require('dotenv').config();

const server = http.createServer(app);
const io = socketIO(server);

app.use('/interview', interviewrouter);
app.use('/available_interviewer', availableinterviewerrouter);
app.use('/days',daysRouter);

// io.on("connection", (socket) => {
//    const { username, room } = socket.handshake.query;
//    console.log("A client has connected", username);
//    socket.join(room);
//    io.to(room).emit("welcome_message", {
//      username: "Chat Bot",
//      text: `${username} joined`,
//      time: moment().format("hh:mm a"),
//    });
 
//    socket.on("message", (message) => {
//      console.log("message in server", message);
//      io.to(room).emit("message", message);
//    });
 
//    socket.on("disconnect", () => {
//      console.log("A client has disconnected");
//      io.to(room).emit("message", {
//        username: "Chat Bot",
//        text: `${username} disconnected`,
//      });
//    });
//  });

console.log('env', process.env.DB_NAME);

app.listen(port, () => console.log(`Server is running on port ${port}`));