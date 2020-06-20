DROP DATABASE IF EXISTS coaches_cage;
CREATE DATABASE coaches_cage;

\c coaches_cage;

CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  workout_table_name VARCHAR(255),
  workout_name VARCHAR(255) UNIQUE
);
