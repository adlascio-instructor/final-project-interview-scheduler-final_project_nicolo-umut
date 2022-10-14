const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const { Pool } = require("pg");
const port = 8000;
require('dotenv').config();

const server = http.createServer(app);
const io = socketIO(server);

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

app.get("/interview/:day", (req, res) => {
   //  const { day } = req.body;
    const pool = new Pool ({
       name: process.env.DB_NAME, //username postgres
       host: process.env.DB_HOST, // localhost
       database: process.env.DB_DATABASE, // database name
       password: process.env.DB_PASSWORD, // password username
       port: process.env.DB_PORT, // 5432 
    });
    pool   
       .query(`SELECT appointment.id AS appointment_id, appointment.time, interview.student,
       interviewer.id AS interviewer_id, interviewer.name AS interviewer_name, interviewer.avatar AS interviewer_avatar FROM appointment
       JOIN day
       ON appointment.day_id = day.id
       LEFT JOIN interview
       ON appointment.id = interview.appointment_id
       LEFT JOIN interviewer
       ON interview.interviewer_id = interviewer.id
       WHERE day.name = '${req.params.day}'
       ORDER BY appointment.id;`)
       .then((result) => result.rows)
       .then((schedule) => {
         // console.log(schedule);

         const interviewObj = {};

         schedule.forEach((element) => {
            interviewObj[element.appointment_id] = {
               id: element.appointment_id,
               time: element.time,
            }
            if(element.student) {
               interviewObj[element.appointment_id].interview = {
                  student: element.student,
                  interviewer: {
                     id: element.interviewer_id,
                     name: element.interviewer_name,
                     avatar: element.interviewer_avatar
                  }
               }
            } 
         })
         res.json(interviewObj);
      })
       .catch((err) => console.log("err", err))
       .finally(() => pool.end());        
});
// loop and create object from array, if the array doesnt have anything just pass empty data if its filled it should pass every data

app.get("/interviewer", (req, res) => {
    const pool = new Pool ({
       name: process.env.DB_NAME, //username postgres
       host: process.env.DB_HOST, // localhost
       database: process.env.DB_DATABASE, // database name
       password: process.env.DB_PASSWORD, // password username
       port: process.env.DB_PORT, // 5432 
    });
    pool   
       .query("SELECT * FROM interviewer")
       .then((result) => result.rows)
       .then((interviewer) => res.json(interviewer))
       .catch((err) => console.log("err"))
       .finally(() => pool.end());        
});

app.get("/available_interviewer", (req, res) => {
    const pool = new Pool ({
       name: process.env.DB_NAME, //username postgres
       host: process.env.DB_HOST, // localhost
       database: process.env.DB_DATABASE, // database name
       password: process.env.DB_PASSWORD, // password username
       port: process.env.DB_PORT, // 5432 
    });
    pool   
       .query("SELECT day_id FROM available_interviewer")
       .then((result) => result.rows)
       .then((day_id) => res.json(day_id))
       .catch((err) => console.log("err"))
       .finally(() => pool.end());        
});

app.listen(port, () => console.log(`Server is running on port ${port}`));


