const staticAthletes = require('../db/staticAthletes.js');
const twoKPB = require('../db/2kpb.js');
const sixX5 = require('../db/6x500m.js');
const { boats, oars } = require('../db/equipment.js');
const db = require('../db/index.js');

const dbRoster = 'roster';

const init = (param1, param2, callback) => {
  let roster = db.getRoster(dbRoster, (err, succ) => {
    if (err) {
      callback(err)
    } else {
      // all static calls, no db yet
      const equipment = [boats, oars];
      let firstParam = twoKPB;
      if (param1 === '1') firstParam = sixX5;

      let roster = [];
      succ.rows.map(athlete => {
        let side = '';
        if (athlete.info['Preferred Side'] === 'Coxswain') {
          side = 'coxswain';
        } else if (athlete.info['Preferred Side'] === 'Starboard') {
          side = 's';
        } else if (athlete.info['Preferred Side'] === 'Port') {
          side = 'p';
        };

        let athleteObj = {
          // id: athlete.id,
          // fake id for DEV
          id: athlete.fake_id,
          name: athlete.name,
          side: side,
          param1: '',
          param2: '',
          boated: 0,
          absent: false,
          status: 3
        }

        // calling static files, not accessing DB yet
        if (firstParam[athleteObj.id]) {
          athleteObj.param1 = firstParam[athleteObj.id].time;
          firstParam[athleteObj.id].weight.toString().indexOf('.') === -1 ? athleteObj.param2 = `${firstParam[athleteObj.id].weight}.0` : athleteObj.param2 = `${firstParam[athleteObj.id].weight}`
        } else {
          athleteObj.param1 = 'no record';
          athleteObj.param2 = 'no record';
        }
        roster.push(athleteObj);
      })
      callback(null, { roster, equipment });
    }
  });
}

// const updatedParams = (param1, param2, callback) => {
//   let roster = db.getRoster(dbRoster, (err, succ) => {
//     if (err) {
//       callback(err)
//     } else {
//       let firstParam = twoKPB;
//       if (param1 === '1') firstParam = sixX5;
//       // const secondParam = weights;
//       for (let athlete in roster) {
//         if (firstParam[athlete]) {
//           roster[athlete].param1 = firstParam[athlete].time;
//           firstParam[athlete].weight.toString().indexOf('.') === -1 ? roster[athlete].param2 = `${firstParam[athlete].weight}.0` : roster[athlete].param2 = `${firstParam[athlete].weight}`
//         } else {
//           roster[athlete].param1 = 'no record';
//           roster[athlete].param2 = 'no record';
//         }
//       }
//       callback(null, roster);
//     }
//   });
// }

module.exports = { init };