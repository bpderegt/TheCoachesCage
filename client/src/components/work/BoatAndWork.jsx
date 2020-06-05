import React from 'react';
import styled from 'styled-components';
import Boat from './boat/Boat.jsx'
import Workout from './workout/Workout.jsx'

const PracticeWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direct: row;
`;

const CrewWrapper = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  padding-right: 2em;
`;

const BoatAndWork = ({ lineups, onDrop, onDragOver, onPickUp }) => {
  return (
    <PracticeWrapper>
      {lineups.map((lineup, index) => (
        <CrewWrapper>
          <Boat key={index} boat={index} lineup={lineup} onDrop={onDrop} onDragOver={onDragOver} onPickUp={onPickUp}/>
          <Workout />
        </CrewWrapper>
      ))}
    </PracticeWrapper>
  )
}

export default BoatAndWork;