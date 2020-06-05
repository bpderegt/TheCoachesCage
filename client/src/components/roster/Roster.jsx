import React from 'react';
import styled from 'styled-components';
import { firstBy } from "thenby";
import Athlete from './Athlete.jsx'

const HeaderWrapper = styled.div`
`;

const RosterWrapper = styled.div`
  border: 1px solid #dcdcdc;
  border-radius: 1em;
  box-shadow: 0.25px 1px 1px black;
  margin-right: 2em;
  width: 18em;
  padding: 0.25em;
  transition: transform 500ms ease;
  height: 87vh;
  width:
  position: absolute;
  overflow: auto;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
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
  };
  roster.sort(
    firstBy(v => v.status)
    .thenBy("time")
  );
  return (
    <HeaderWrapper>
      <RosterWrapper onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>onDrop(e, null, null)}>
        {roster.map((athlete, index) => (
          <Athlete key={index} athlete={athlete} onPickUp={onPickUp} />
        ))}
      </RosterWrapper>
    </HeaderWrapper>
  )
}

export default Roster;
