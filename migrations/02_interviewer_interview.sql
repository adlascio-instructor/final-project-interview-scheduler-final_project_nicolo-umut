CREATE TABLE interviewer 
    (id SERIAL PRIMARY KEY, 
    name TEXT, 
    avatar TEXT
    );
    
CREATE TABLE interview 
    (id SERIAL PRIMARY KEY,
    student TEXT,
    interviewer_id INTEGER REFERENCES interviewer(id),
    appointment_id INTEGER REFERENCES appointment(id)
    );
