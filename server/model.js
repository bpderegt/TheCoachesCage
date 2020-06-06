const staticAthletes = require('../db/staticAthletes.js');
const twoKPB = require('../db/2kpb.js');
const sixX5 = require('../db/6x500m.js');
const weights = require('../db/weights.js');
const { boats, oars } = require('../db/equipment.js');
// const twoKPB = require('../db/2kpbs.js');


const init = (param1, param2, callback) => {
  const roster = staticAthletes;
  const equipment = [boats, oars];
  let firstParam = twoKPB;
  if (param1 === '1') firstParam = sixX5;
  const secondParam = weights;
  for (let athlete in roster) {
    if (firstParam[athlete]) {
      roster[athlete].param1 = firstParam[athlete].time;
      firstParam[athlete].weight.toString().indexOf('.') === -1 ? roster[athlete].param2 = `${firstParam[athlete].weight}.0` : roster[athlete].param2 = `${firstParam[athlete].weight}`
    } else {
      roster[athlete].param1 = 'no record';
      roster[athlete].param2 = 'no record';
    }
  }
  // console.log(equipment)
  callback(null, { roster, equipment });
}

// const updatedParams = () => {
//   console.log('hello')
// }

module.exports = { init };