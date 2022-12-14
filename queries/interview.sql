-- SELECT * FROM appointment
-- JOIN day
-- ON appointment.day_id = day.id
-- LEFT JOIN interview
-- ON appointment.id = interview.appointment_id
-- WHERE name = 'MONDAY'
-- ORDER BY appointment.id;

SELECT appointment.id AS appointment_id, appointment.time, interview.student,
interviewer.id AS interviewer_id, interviewer.name AS interviewer_name, interviewer.avatar AS interviewer_avatar FROM appointment
JOIN day
ON appointment.day_id = day.id
LEFT JOIN interview
ON appointment.id = interview.appointment_id
LEFT JOIN interviewer
ON interview.interviewer_id = interviewer.id
WHERE day.name = 'MONDAY'
ORDER BY appointment.id;