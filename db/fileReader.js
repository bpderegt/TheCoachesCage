const fs = require('fs');
const path = require('path');

const files = [
  '12_6_18 6x10\'_6x7\' - Output.csv',
  '3_14_18 2x5k - Output.csv',
  '3_16_18 2x5k - Output.csv',
  '3_28_18 6x500m - Output.csv',
  '5_12_18 6x500m - Output.csv',
  '9_20_17 10x3\'_30_r - 9_20_17 10x3\'_30_r.csv'
]

let file = path.join(__dirname, `../csv/3_14_18 2x5k - Output.csv`);
fs.readFile(file, 'utf8', (err, read) => {
  let arr = read.split('\r\n')
  let insert = `
    DROP TABLE IF EXISTS ${file};\n
    CREATE TABLE ${file} (\n
  `
  let splitArr = arr.map((string, index) => {
    let records = string.split(',')
    records.map((category, idx) => {
      if (index === 0) {
        insert += `${category} VARCHAR(100),\n`
      } else {

      }
    })
  })
  console.log(splitArr)

});

// CREATE TABLE twokpb (
//   athlete_id INT NOT NULL,
//   pb VARCHAR(7),
//   weight SMALLINT,
//   FOREIGN KEY (athlete_id) REFERENCES roster(id)
// );

let folder = path.join(__dirname, `../csv`)
fs.readdir(folder, (err, read) => {
  console.log(read);
})


// const newTest = ()