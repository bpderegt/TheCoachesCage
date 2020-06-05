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
`;

const Roster = ({ athletes, onPickUp, onDrop, onDragOver }) => {
  const roster = [];

  for (let key in athletes) {
    athletes[key].id = key;
    athletes[key].status ? null : athletes[key].status = 3;
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
