const pool = require('../database');
// const queries = require("./queries"); doesnt work

const getInterviewer = (req, res) => {
    const weekDay = req.params.weekDay;
    pool.query(queries.getInterviewer, [weekDay], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const getAppointment = (req, res) => {
    const weekDay = req.params.weekDay;
    pool.query(queries.getAppointment, [weekDay], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const postAppointment = (req, res) => {
    const { student, interviewer_id, appointment_id } = req.body;
    pool.query(queries.postAppointment, [student, interviewer_id, appointment_id], (error, result) => {
        if (error) throw error;
        res.status(200);
    }
  );
};

const deleteAppointment = (req, res) => {
    const { appointment_id } = req.body;
    pool.query(queries.deleteAppointment, [appointment_id], (error, result) => {
        if (error) throw error;
        res.status(200);
    }
  );
};

const getFreeSpots = (req, res) => {
    pool.query(queries.getFreeSpots, (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

module.exports = {
    getInterviewer,
    getAppointment,
    postAppointment,
    deleteAppointment,
    getFreeSpots
};

