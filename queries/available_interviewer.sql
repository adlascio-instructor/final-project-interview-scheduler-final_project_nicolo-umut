SELECT  interviewer.id AS interviewer_id, interviewer.name AS interviewer_name, interviewer.avatar AS interviewer_avatar FROM available_interviewer
JOIN day
ON available_interviewer.day_id = day.id
LEFT JOIN interviewer
ON available_interviewer.interviewer_id = interviewer.id
WHERE day.name = 'WEDNESDAY'
ORDER BY available_interviewer.id;