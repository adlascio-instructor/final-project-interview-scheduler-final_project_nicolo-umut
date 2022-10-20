const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();

router.get("/:day", (req, res) => {
   console.log('interview route');
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
         //   console.log(schedule);
 
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

module.exports = router;