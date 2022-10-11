CREATE TABLE appointment 
    (id SERIAL PRIMARY KEY,
    time INTEGER,
    day_id INTEGER REFERENCES day(id)
    );

CREATE TABLE day
    (id SERIAL PRIMARY KEY,
    name TEXT
    );