const staticAthletes = require('../db/staticAthletes.js');
const twoKPB = require('../db/2kpb.js');
const sixX5 = require('../db/6x500m.js');
const weights = require('../db/weights.js');
// const twoKPB = require('../db/2kpbs.js');


const init = (param1, param2, callback) => {
  const roster = staticAthletes;
  const firstParam = twoKPB;
  const secondParam = weights;
  for (let athlete in roster) {
    roster[athlete].param1 = firstParam[athlete].time;
    roster[athlete].param2 = firstParam[athlete].weight;


    // hardcoding something that will need to be a conditional later
    firstParam[athlete].weight.toString().indexOf('.') === -1 ? roster[athlete].param2 = `${firstParam[athlete].weight}.0` : roster[athlete].param2 = `${firstParam[athlete].weight}`
    // roster[athlete].param2 = secondParam[athlete];
  }
  // console.log(roster);
  callback(null, roster);
}

// init()

//

module.exports.init = init;