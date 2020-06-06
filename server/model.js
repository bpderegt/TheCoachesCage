const staticAthletes = require('../db/staticAthletes.js');
const twoKPB = require('../db/2kpb.js');
const sixX5 = require('../db/6x500m.js');
const weights = require('../db/weights.js');
// const twoKPB = require('../db/2kpbs.js');


const init = (param1, param2, callback) => {
  const roster = staticAthletes;
  let firstParam = twoKPB;
  if (param1 === '1') firstParam = sixX5;
  // console.log(firstParam);
  const secondParam = weights;
  for (let athlete in roster) {
    if (firstParam[athlete]) {
      roster[athlete].param1 = firstParam[athlete].time;
      firstParam[athlete].weight.toString().indexOf('.') === -1 ? roster[athlete].param2 = `${firstParam[athlete].weight}.0` : roster[athlete].param2 = `${firstParam[athlete].weight}`
    } else {
      roster[athlete].param1 = 'no record';
      roster[athlete].param2 = 'no record';
    }


    // hardcoding something that will need to be a conditional later

    // roster[athlete].param2 = secondParam[athlete];
  }
  // console.log(roster);
  callback(null, roster);
}

// init()

//

module.exports.init = init;