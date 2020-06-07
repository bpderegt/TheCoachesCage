const boats = {
  '8+': [['Athletics', 0], ['de Reckoning', 0], ['Don Quixote', 0], ['Burke II', 0], ['Farrell', 0], ['Victoria ', 0], ['Herbert', 0], ['Lindsay', 0], ['Plucky', 0], ['Shiva', 0], ['Heylin', 0], ['Burke I', 0], ['Logston', 0], ['No Ka Oi', 0]],

  '4+': [['Man of Steele', 0], ['The Rocket', 0], ['Guess What', 0], ['Jack P. Ott', 0], ['Still Classy', 0], ['Torsk', 0], ['Kanghua3', 0], ['Sancho Panza', 0]],

  '4x': [['Pheonix', 0], ['Red Rocket', 0], ['Da Boz', 0], ['Rowe Boat', 0]],

  '4-': [['Pheonix', 0], ['Da Boz', 0], ['Rowe Boat', 0]],

  '2x': [['Walter the Walrus', 0], ['Pineapple Express', 0]],

  '2-': [['Sykes #1', 0], ['Yellow Kanghua', 0], ['The Ochal', 0], ['The POS', 0]],

  '1x': [['Filippi', 0], ['Sir Philip', 0], ['G-FORCE', 0], ['Hudson', 0]],
}

const oars = {
  'sweep': [['New Charles Skinnys', 0], ['Skinnys', 0], ['Secret Oars', 0], ['New Oars', 0], ['Charles Oars', 0], ['O/G', 0], ['1G', 0], ['1B', 0], ['2B', 0], ['3B', 0], ['4B', 0], ['2g/1w', 0], ['3g/1w', 0], ['Fat Skinnys', 0], ['1g/1w', 0], ['1b/1w', 0], ['2b/1w', 0]],

  'scull': [['Orange C2 sculls', 0], ['Green C2 sculls', 0], ['Yellow Crokers', 0], ['Blue Crokers', 0]],
}

// for (let classes in oars) {
//   let boatClass = `'${classes}': [`
//   for (let i = 0; i < oars[classes].length; i++) {
//     boatClass += `['${oars[classes][i]}', ${0}], `
//   }
//   boatClass += `],\n`
//   console.log(boatClass)
// }

module.exports.boats = boats;
module.exports.oars = oars;