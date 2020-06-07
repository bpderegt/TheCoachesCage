const moment = require('moment');
moment().format();

let sample1 = { time: '6:48.4', weight: 159.8 }
let sample2 = { time: '6:27.4', weight: 160.2 }
let sample3 = { time: '7:02.7', weight: 152 }
let sample4 = { time: 'ERROR', weight: 152 }

const array = [sample1, sample2, sample3]
//yyyy-MM-dd'T'HH:mm:ss.SSS

let NoahMin = parseInt(moment("2000-01-01 00:06:09.2").format('mm')) * 60
let NoahSec = parseInt(moment("2000-01-01 00:06:09.2").format('ss'))
let NoahMil = parseInt(moment("2000-01-01 00:06:09.2").format('S')) / 10


let SpencerMin = parseInt(moment("2000-01-01 00:06:09.9").format('mm')) * 60
let SpencerSec = parseInt(moment("2000-01-01 00:06:09.9").format('ss'))
let SpencerMil = parseInt(moment("2000-01-01 00:06:09.9").format('S')) / 10


// console.log(split.format('m:ss.S'))

// console.log(parseInt(NoahMin) * 60 + parseInt(NoahSec) + parseInt(NoahMil) / 10)
// console.log(SpencerMin + SpencerSec + SpencerMil)

// let NoahNum = Math.floor((NoahMin + NoahSec + NoahMil) * 10) / 10;
// let SpencerNum = Math.floor((SpencerMin + SpencerSec + SpencerMil) * 10) / 10;

// console.log(sample2.time)

const crewAvgToNum = (arr) => {
  let intSum = 0;
  let decSum = 0;
  let divider = 0;
  for (let i = 0; i < arr.length; i++) {
    let iso = ``
    if (arr[i].time.length > 7) {
      continue;
    } else if (arr[i].time[1] === ":") {
      iso = `2000-01-01 00:0${arr[i].time}`
    } else if (arr[i].time[2] === ":") {
      iso = `2000-01-01 00:${arr[i].time}`
    } else {
      continue;
    }
    let seconds = (parseInt(moment(iso).format('mm')) * 60) + parseInt(moment(iso).format('ss'))
    let milli = parseInt(moment(iso).format('S'))
    intSum += seconds;
    decSum += milli;
    divider++;
  }
  let time = Math.round(((intSum + (decSum / 10)) / divider) * 10) / 10;
  return time;
}

const timeToString = (num) => {
  let minutes = Math.floor(num / 60).toString();
  let seconds = (Math.round(num % 60 * 10) / 10).toFixed(1)
  return `${minutes}:${seconds}`
}

console.log(timeToString(crewAvgToNum(array)));

// console.log(SpencerNum - NoahNum)
// console.log(NoahNum)