const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const { Pool } = require("pg");
const port = 8080;
const daysRouter = require(
   './routes/days'
)
const server = http.createServer(app);
const io = socketIO(server);
app.use('/days',daysRouter)

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

app.get("/interview", (req, res) => {
    const { appointment_id } = req.body;
    const pool = new Pool ({
       name: process.env.DB_NAME, //username postgres
       host: process.env.DB_HOST, // localhost
       database: process.env.DB_DATABASE, // database name
       password: process.env.DB_PASSWORD, // password username
       port: process.env.DB_PORT, // 5432 
    });
    pool   
       .query("SELECT appointment_id FROM interview")
       .then((result) => result.rows)
       .then((interview) => res.json(interview))
       .catch((err) => console.log("err"))
       .finally(() => pool.end());        
});

app.get("/interview", (req, res) => {
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


