import React from 'react';
import styled from 'styled-components';
import Athlete from './Athlete.jsx'

const moment = require('moment');
moment().format();

const RosterWrapper = styled.div`
  border: 1px solid black;
  margin-right: 2em;
  padding: 0.25em;
`;

const Roster = ({ roster, onAthleteClick }) => {
  console.log(roster)
  return (
    <RosterWrapper>
      {roster.map((athlete, index) => (
        <Athlete key={index} athlete={athlete} onClick={onAthleteClick} />
      ))}
    </RosterWrapper>
  )
}

export default Roster;
