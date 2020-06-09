DROP DATABASE IF EXISTS coaches_cage;
CREATE DATABASE coaches_cage;

\c coaches_cage;

CREATE TABLE roster (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  preferred_name VARCHAR(100),
  middle_name VARCHAR(100),
  last_name VARCHAR(100),
  birthday DATE,
  grad_year SMALLINT,
  cellphone VARCHAR(15),
  email VARCHAR(100),
  side VARCHAR(15),
  height VARCHAR(15),
  weight SMALLINT,
  shoe_size VARCHAR(15),
  shirt_size VARCHAR(4)
);

CREATE TABLE twokpb (
  athlete_id INT NOT NULL,
  pb VARCHAR(7),
  weight SMALLINT,
  FOREIGN KEY (athlete_id) REFERENCES roster(id)
);

CREATE TABLE sixkpb (
  athlete_id INT NOT NULL,
  pb VARCHAR(7),
  weight SMALLINT,
  FOREIGN KEY (athlete_id) REFERENCES roster(id)
);

CREATE TABLE water_rank (
  athlete_id INT NOT NULL,
  pb VARCHAR(7),
  FOREIGN KEY (athlete_id) REFERENCES roster(id)
);
