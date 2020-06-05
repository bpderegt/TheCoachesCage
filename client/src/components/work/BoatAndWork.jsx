import React from 'react';
import styled from 'styled-components';
import PerCrew from './PerCrew.jsx';

const PracticeWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direct: row;
`;

const BoatAndWork = ({ lineups, onDrop, onDragOver, onPickUp, boatClearOrDelete, removeAthlete }) => {
  return (
    <PracticeWrapper>
      {lineups.map((lineup, index) => (
        <PerCrew key={index}
          boat={index}
          lineup={lineup}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onPickUp={onPickUp}
          boatClearOrDelete={boatClearOrDelete}
          removeAthlete={removeAthlete}/>
      ))}
    </PracticeWrapper>
  )
}

export default BoatAndWork;