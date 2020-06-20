const fs = require('fs');
const path = require('path');
const db = require('./index.js');
const createRoster = require('./createRoster.js')
const nameConverter = require('./nameConverter.js');

// this is all static and not good
let filePathPrefix = path.join(__dirname, `../csv/`);
let team = '2018';
// let title = `2/9/18 step 2k`;

const addWorkout = (file, test = null) => {
  //parse title to for escapes
  let title = ``;
  for (let i = 0; i < file.length; i++) {
    if (file[i] === `'`) {
      title += `''`;
    } else if (file[i] === ':' || file[i] === '_') {
      title += '/';
    } else {
      title += file[i];
    }
  }

  title = title.substring(0, title.length - 13);

  console.log(title);
  file = `${filePathPrefix}${file}`;

  // DEV - if test matches one of the declared program tests, we will also compare the new scores with the old ones and update that table
  fs.readFile(file, 'utf8', (err, read) => {
    if (err) {
      console.log(err);
    } else {
      //convert file name to allowed title
      let combined = `${team}_x_${title}`;
      // create a postgres-friendly table name
      let tableName = `x`;
      for (let i = 0; i < combined.length; i++) {
        if (combined[i] === ` ` || combined[i] === `/` || combined[i] === `:` || combined[i] === `-`) {
          tableName += `_`;
        } else if (combined[i] !== `'`) {
          tableName += combined[i];
        }
      }

      let workoutInsert = `INSERT INTO workouts (workout_table_name, workout_name) VALUES ('${tableName}', '${title}');`

      db.insertOne(workoutInsert, (err, success) => {
        if (err) {
          if (err.code === '23505') {
            db.deleteOne('workouts', title, (err, succ) => {
              if (err) {
                console.log('first throw');
                console.error(err);
              } else {
                db.insertOne(workoutInsert, (err, succ) => {
                  if (err) {
                    console.err('second throw');
                    console.error(err);
                  } else {
                    console.log('workout added to workout table');
                  }
                })
              }
            })
          } else {
            console.error(err);
          }
        } else {
          console.log('workout added to workout table');
        }
        let csvArr = read.split('\r\n') // splits csv into individual lines
        let table = `DROP TABLE IF EXISTS ${tableName};
          CREATE TABLE ${tableName} (
            athlete_id INT,
            name VARCHAR(255),
            info json NOT NULL
          );
        `;

        let headers = csvArr[0].split(`,`); // split top line into columns // with a *comma* you dipshit
        let skipColumns = []; //columns with bad titles get skipped

        let headerArr = [];
        let workoutObjTemplate = {};

        //build the roster object
        for (let i = 0; i < headers.length; i++) {
          if (headers[i].length === 0) {
            skipColumns.push(i);
          } else {
            workoutObjTemplate[headers[i]] = ``;
          }
          headerArr.push(`${headers[i]}`);
        }

        db.insertOne(table, (err, succ) => {
          if (err) {
            console.log('the error is in the first insertOne')
            console.error(err);
          } else {
            perEntry(1, csvArr, tableName, headerArr, skipColumns, workoutObjTemplate);
          }
        })
    });
    }
  });
};


const perEntry = (i, arr, tableName, headerArr, skipColumns, template) => {
  let entryArr = [];
  let currentEntry = ``;
  let endQuote = true;

  // athlete_id is a FAKED *DEVELOPMENT* holder
  let query = `INSERT INTO ${tableName} (info, name, athlete_id) VALUES ('`;

  // working through the full stringified csv line, adding escapes when necessary, breaking line into an array
  for (let j = 0; j < arr[i].length; j++) {
    if (arr[i][j] === `"`) {
      endQuote = !endQuote;
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
  let entryObj = template;
  for (let m = 0; m < entryArr.length; m++) {
    if (skipColumns.indexOf(m) === -1) {
      entryObj[headerArr[m]] = entryArr[m];
    }
  }

  // this if statement is a *DEVELOPMENT* name-change holder
  if (true) {
    for (let key in nameConverter) {
      if (nameConverter[key].realName === entryObj['Name']) {
        entryObj['realName'] = entryObj['Name'];
        entryObj['Name'] = nameConverter[key].fakeName;
        entryObj['fakeId'] = key;
      }
    }
  }

  query += JSON.stringify(entryObj);

  // fakeId is a *DEVELOPMENT* holder
  query += `', '${entryObj['Name']}', ${entryObj['fakeId']});`;

  db.insertOne(query, (err, succ) => {
    if (err) {
      console.error(err);
    } else {
      if (i + 1 < arr.length) {
        perEntry(i + 1, arr, tableName, headerArr, skipColumns, template);
      } else {
        console.log('success');
      }
    }
  });
}

// addWorkout(file);
let filePath = path.join(__dirname, '../csv');
fs.readdir(filePath, (err, files) => {
  if (err) {
    console.log(err)
  } else {
    // console.log(files);
    // addWorkout(files[0]);
    files.map(file=>{
      if (file.indexOf('Roster') === -1) {
        addWorkout(file);
      }
    })
  }
})