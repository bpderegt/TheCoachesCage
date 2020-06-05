import React from 'react';
import styled from 'styled-components';
import { firstBy } from "thenby";
import Athlete from './Athlete.jsx'



const moment = require('moment');
moment().format();

const RosterWrapper = styled.div`
  border: 1px solid black;
  margin-right: 2em;
  padding: 0.25em;
  transition: transform 500ms ease;
`;

const Roster = ({ athletes, onPickUp, onDrop, onDragOver }) => {
  const roster = [];

  for (let key in athletes) {
    athletes[key].id = key;

    if (athletes[key].boated > 0 && athletes[key].absent) {
      athletes[key].status = 1;
    } else if (athletes[key].boated > 1) {
      athletes[key].status = 2;
    } else if (athletes[key].boated === 0) {
      athletes[key].status = 3;
    } else if (athletes[key].boated === 1) {
      athletes[key].status = 4;
    } else if (athletes[key].absent) {
      athletes[key].status = 5;
    }

    roster.push(athletes[key]);
  }
  roster.sort(
    firstBy(v => v.status)
    .thenBy("time")
  )

  // console.log(roster)
  return (
    <RosterWrapper onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>onDrop(e, null, null)}>
      {roster.map((athlete, index) => (
        <Athlete key={index} athlete={athlete} onPickUp={onPickUp} />
      ))}
    </RosterWrapper>
  )
}

export default Roster;
