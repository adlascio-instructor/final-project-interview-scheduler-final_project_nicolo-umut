const express = require("express");
const app = express();
const http = require("http");
// const socketIO = require("socket.io");
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
const { getAppointment, getInterviewer, postAppointment, deleteAppointment, getFreeSpots } = require("./controllers/controller");
require('dotenv').config();
// const io = require("socket.io")(8000, {
//    cors: {
//    },
// });

const server = http.createServer(app);

// io.on("Connection", (socket) => {
//    console.log(socket.id);
//    socket.on("book-interview", (obj) => {
//       console.log(obj)
//       io.emit("book-interview", obj);
//    });

//    socket.on("cancel-interview", (data) => {
//       io.emit("cancel-interview", data);
//    });
// });

app.use('/interview', interviewrouter);
app.use('/available_interviewer', availableinterviewerrouter);
app.use('/days',daysRouter);
// app.use('/controller.js', getInterviewer);
// app.use('/controller.js', getAppointment);
// app.use('/controller.js', postAppointment);
// app.use('/controller.js', deleteAppointment);
// app.use('/controller.js', getFreeSpots);

console.log('env', process.env.DB_NAME);

app.listen(port, () => console.log(`Server is running on port ${port}`));