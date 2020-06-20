const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'brian',
  password: 'student',
  host: 'localhost',
  database: 'coaches_cage',
  port: 5432,
});

const insertOne = (data, callback) => {
  // let query = `INSERT INTO ${tableName} (${keys}) VALUES (${values});`
  pool.query(data, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(null, success);
    }
  });
};

const deleteOne = (tableName, workoutName, callback) => {
  let query = `DELETE FROM ${tableName} WHERE workout_name = '${workoutName}';`
  pool.query(query, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(null, success);
    }
  });
};

const getRoster = (roster, callback) => {
  pool.query(`SELECT * FROM ${roster};`, (err, success) => {
    if (err) {
      callback(err);
    } else {
      callback(null, success);
    }
  });
};


module.exports = { insertOne, deleteOne, getRoster };
