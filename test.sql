-- day
-- appointment
-- interviewer
-- interview
-- available interviewer

-- SELECT id, time FROM appointment WHERE day_id = 1;
-- SELECT COUNT(id)
-- FROM appointment
-- WHERE day_id = 1;

SELECT day_id, day.name, COUNT(appointment.*) AS appointments, COUNT(interview.*) as interviews
FROM appointment
JOIN day ON day.id = appointment.day_id
LEFT JOIN interview ON appointment.id = interview.appointment_id
GROUP BY day_id, day.name
ORDER BY day_id;