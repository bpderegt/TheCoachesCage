const fs = require('fs');
const path = require('path');
const nameConverter = require('./nameConverter.js');
const client = require('./index.js');

const files = [
  '12_6_18 6x10\'_6x7\' - Output.csv',
  '3_14_18 2x5k - Output.csv',
  '3_16_18 2x5k - Output.csv',
  '3_28_18 6x500m - Output.csv',
  '5_12_18 6x500m - Output.csv',
  '9_20_17 10x3\'_30_r - 9_20_17 10x3\'_30_r.csv'
]

let title = `../csv/5_12_18 6x500m - Output.csv`

let file = path.join(__dirname, title);
fs.readFile(file, 'utf8', (err, read) => {
  let newRosterObject = {};
  for (let key in nameConverter) {
    newRosterObject[nameConverter[key].realName] = {id: key, fakeName: nameConverter[key].fakeName}
  }

  //convert file name to allowed title
  let newTitle = ``;
  for (let x = title.length - 1; x >= 0; x--) {
    if (title[x] === `/`) {
      break;
    } else if (title[x] === ` `) {
      newTitle = `-${newTitle}`;
    } else if (title[x] === `.`) {
      newTitle = ``;
    } else {
      newTitle = `${title[x]}${newTitle}`
    }
  }

  let arr = read.split('\r\n') // splits csv into individual lines
  let insert = `\\c coaches_cage\nDROP TABLE IF EXISTS ${newTitle};\nCREATE TABLE ${newTitle} (\n  id INT NOT NULL,\n`;

  let headers = arr[0].split(','); // split top line into columns
  let skipColumns = []; //columns with bad titles get skipped
  let query = `INSERT INTO ${newTitle} (id, `
  let nameIdx = -1;

  //build the table
  for (let i = 0; i < headers.length; i++) {
    if (headers[i].length === 0) {
      skipColumns.push(i);
      continue;
    };
    let lowerCase = headers[i].toLowerCase();
    if (lowerCase === 'name') nameIdx = i;
    let columnHeader = `x`;
    for (let j = 0; j < lowerCase.length; j++) {
      if (/[a-zA-Z\d]/g.exec(lowerCase[j])) columnHeader += lowerCase[j];
      if (lowerCase[j] === ` `) columnHeader += `_`;
    };
    if (columnHeader === `x`) {
      skipColumns.push(i);
    } else {
      insert += `  ${columnHeader} VARCHAR(100),\n`;
      query += `${columnHeader}, `
    }
  }
  insert += `  FOREIGN KEY (id) REFERENCES roster(id)\n);\n\n`;
  query = `${query.substring(0, query.length - 2)}) VALUES (`;

  //build the individual inserts
  for (let k = 1; k < arr.length; k++) {
    let entryArr = arr[k].split(',');
    let entry = query;

    //if name is not in the roster, (right now) it doesn't get entered
    if (newRosterObject[entryArr[nameIdx]] === undefined) {
      continue;
    };
    entry += `${newRosterObject[entryArr[nameIdx]].id}, `
    for (let m = 0; m < entryArr.length; m++) {
      if (skipColumns.indexOf(m) === -1) {
        if (m === nameIdx) {
          entry += `'${newRosterObject[entryArr[nameIdx]].fakeName}, `
        } else {
          entry += `'${entryArr[m]}', `;
        }
      }
    }
    entry = entry.substring(0, entry.length - 2);
    entry += `);\n`;
    insert += entry;
  }
  console.log(insert);
});

let folder = path.join(__dirname, `../csv`)
fs.readdir(folder, (err, read) => {
  // console.log(read);
})