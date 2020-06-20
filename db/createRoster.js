const fs = require('fs');
const path = require('path');
const faker = require('faker');
const db = require('./index.js');
const nameConverter = require('./nameConverter.js');

// this is all static and not good
let fileName = `../csv/Strokes18 Roster - Sheet1.csv`;
let file = path.join(__dirname, fileName);
let team = '2018';
let title = 'roster';

fs.readFile(file, 'utf8', (err, read) => {
  if (err) {
    console.log(err);
  } else {
    // DEV - maybe revisit this for yearly rosters in the future
    // //convert file name to allowed title
    // let combined = `${team}${title}`
    // // create a postgres-friendly table name
    // let tableName = `x`;
    // for (let i = 0; i < combined.length; i++) {
    //   if (combined[i] !== ' ') {
    //     tableName += combined[i];
    //   }
    // }

    let tableName = `roster`;

    let arr = read.split('\r\n') // splits csv into individual lines
    let table = `DROP TABLE IF EXISTS ${tableName};
  CREATE TABLE ${tableName} (
    id SERIAL PRIMARY KEY,
    fake_id INT,
    name VARCHAR(255),
    info json NOT NULL
  );
  `;

    let headers = arr[0].split(','); // split top line into columns
    let skipColumns = []; //columns with bad titles get skipped

    let rosterArr = [];
    let rosterObjTemplate = {
      'Full Name': '',
    };

    //build the roster object
    for (let i = 0; i < headers.length; i++) {
      if (headers[i].length === 0) {
        skipColumns.push(i);
        continue;
      } else {
        rosterArr.push(`${headers[i]}`);
        rosterObjTemplate[headers[i]] = '';
      }
    }

    const perEntry = (i) => {
      let entryArr = [];
      let currentEntry = ``;
      let endQuote = true;
      // fake_id is a *DEVELOPMENT* holder
      let query = `INSERT INTO ${tableName} (info, name, fake_id) VALUES ('`;

      // escaping extra commas, although ignore intended commas for now
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === `"`) {
          endQuote = !endQuote
        } else if (endQuote && arr[i][j] === `,`) {
          entryArr.push(currentEntry);
          currentEntry = ``;
        } else if (arr[i][j] === `'`) {
          currentEntry += `'`;
          currentEntry += arr[i][j];
        } else {
          currentEntry += arr[i][j];
        }
      }
      entryArr.push(currentEntry);

      // creates roster object per athlete
      let entryObj = rosterObjTemplate;
      for (let m = 0; m < entryArr.length; m++) {
        // these "ifs" are *DEVELOPMENT* holders
        if (m === 6 || m === 8 || m === 10) {
          let phone = `1 (${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}) ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
          entryObj[rosterArr[m]] = phone;
        } else if (m === 7 || m === 9 || m === 11) {
          entryObj[rosterArr[m]] = faker.internet.email();
        } else if (skipColumns.indexOf(m) === -1) {
          entryObj[rosterArr[m]] = entryArr[m];
        }
      }
      if (entryObj['Preferred Name']) {
        entryObj['Full Name'] = `${entryObj['Preferred Name']} ${entryObj['Last Name']}`;
      } else {
        entryObj['Full Name'] = `${entryObj['First Name']} ${entryObj['Last Name']}`;
      }

      // this if statement is a *DEVELOPMENT* holder
      if (true) {
        for (let key in nameConverter) {
          if (nameConverter[key].realName === entryObj['Full Name']) {
            entryObj['real Full Name'] = entryObj['Full Name'];
            entryObj['Full Name'] = nameConverter[key].fakeName;
            entryObj['fake_id'] = key;
          }
        }
      }

      query += JSON.stringify(entryObj);
      // fake_id is a *DEVELOPMENT* holder
      query += `', '${entryObj['Full Name']}', ${entryObj['fake_id']});`

      db.insertOne(query, (err, succ) => {
        if (err) {
          console.error(err)
        } else {
          // console.log(query)
          if (i + 1 < arr.length) {
            perEntry(i + 1);
          } else {
            console.log('success');
          }
        }
      });
    };

    db.insertOne(table, (err, succ) => {
      if (err) {
        console.error(err)
      } else {
        perEntry(1);
      }
    })
  }
});

