import React from 'react';
import styled from 'styled-components';
import Boat from './boat/Boat.jsx'
import Workout from './workout/Workout.jsx'

const CrewWrapper = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  padding-right: 2em;
`;

const PerCrew = ({boatNum, lineup, onDrop, onDragOver, onPickUp, boatClearOrDelete, removeAthlete}) => {
  return (
    <CrewWrapper>
      <Boat
        lineup={lineup}
        boatNum={boatNum}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPickUp={onPickUp}
        boatClearOrDelete={boatClearOrDelete}
        removeAthlete={removeAthlete}
      />
      <Workout />
    </CrewWrapper>
  )
}

export default PerCrew;