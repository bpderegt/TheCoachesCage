import React from 'react'
import styled from 'styled-components';
const moment = require('moment');
moment().format();

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 2.25em;
`;

const AveragesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0em 1em 0em 0em;
`;

const AvgSplit = styled.div`
  padding: 0.25em 0.5em;
  font-size: 0.9em;
  text-align: right;
`;

const AvgWeight = styled.div`
  padding: 0.25em 0.5em;
  font-size: 0.9em;
  text-align: right;
  margin-right: 0.95em;
`;

const BoatNum = styled.div`
  font-weight: 600;
`;

const crewSplitToNum = (arr) => {
  let intSum = 0;
  let decSum = 0;
  let divider = 0;
  for (let i = 0; i < arr.length; i++) {
    let iso = ``
    if (arr[i].param1 === undefined || arr[i].param1.length > 7) {
      continue;
    } else if (arr[i].param1[1] === ":") {
      iso = `2000-01-01 00:0${arr[i].param1}`
    } else if (arr[i].param1[2] === ":") {
      iso = `2000-01-01 00:${arr[i].param1}`
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
  if (isNaN(num)) return `-:--.-`
  let minutes = Math.floor(num / 60).toString();
  let seconds = (Math.round(num % 60)).toString().padStart(2, '0')
  let milli = Math.round((num - Math.floor(num)) * 10)
  return `${minutes}:${seconds}.${milli}`
}

const crewWeightAvg = (arr) => {
  let sum = 0;
  let divider = 0;
  for (let i = 0; i < arr.length; i++) {
    let weight = parseFloat(arr[i].param2)
    if (typeof weight === 'number' && weight > 0) {
      sum += weight
      divider++;
    }
  }
  let avg = Math.round((sum / divider) * 10) / 10
  if (isNaN(avg)) return `---.-`
  return avg.toFixed(1)
}

const BoatAverages = ({ boatNum, lineup }) => (
  <InfoWrapper>
    <BoatNum>{boatNum + 1}</BoatNum>
    <AveragesWrapper>
      <AvgSplit>{timeToString(crewSplitToNum(lineup))}</AvgSplit>
      <AvgWeight>{crewWeightAvg(lineup)}</AvgWeight>
    </AveragesWrapper>
  </InfoWrapper>
)

export default BoatAverages;