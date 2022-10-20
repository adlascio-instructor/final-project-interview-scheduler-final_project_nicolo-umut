const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
require("dotenv").config();

router.get("/:day", (req, res) => {
   console.log('route interviewers')
    const pool = new Pool ({
       name: process.env.DB_NAME, //username postgres
       host: process.env.DB_HOST, // localhost
       database: process.env.DB_DATABASE, // database name
       password: process.env.DB_PASSWORD, // password username
       port: process.env.DB_PORT, // 5432 
    });
    pool   
       .query(`SELECT interviewer.id AS interviewer_id, interviewer.name AS interviewer_name, interviewer.avatar AS interviewer_avatar FROM available_interviewer
       JOIN day
       ON available_interviewer.day_id = day.id
       LEFT JOIN interviewer
       ON available_interviewer.interviewer_id = interviewer.id
       WHERE day.name = '${req.params.day}'
       ORDER BY available_interviewer.id;`)
       .then((result) => result.rows)
       .then((availableInterviewer) => {
         // console.log(schedule);

         // const availableInterviewObj = {};

         // availableInterviewer.forEach((element) => {
         //    availableInterviewObj[element.available_interviewer_id] = {
         //       id: element.available_interviewer_id,
         //       time: element.time,
         //    }
         //    if(element.interviewer) {
         //       availableInterviewObj[element.available_interviewer_id].interviewer = {
         //             id: element.interviewer_id,
         //             name: element.interviewer_name,
         //             avatar: element.interviewer_avatar
         //          }
         //       } 
         // })
         res.json(availableInterviewer);
      })
       .catch((err) => console.log("err", err))
       .finally(() => pool.end());          
});

module.exports = router;