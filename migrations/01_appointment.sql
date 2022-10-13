CREATE TABLE day
    (id SERIAL PRIMARY KEY,
    name TEXT
    );
CREATE TABLE appointment 
    (id SERIAL PRIMARY KEY,
    time TEXT,
    day_id INTEGER REFERENCES day(id)
    );