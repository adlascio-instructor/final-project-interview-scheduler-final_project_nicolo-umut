-- day
-- appointment
-- interviewer
-- interview
-- available interviewer

SELECT appointment_id 
FROM interview
JOIN day 
ON appointment_id = appointments_id;