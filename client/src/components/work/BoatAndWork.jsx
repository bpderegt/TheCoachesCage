import React from 'react';
import styled from 'styled-components';
import PerCrew from './PerCrew.jsx';

const PracticeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 98%;
  width: 77%;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 1em;
  box-shadow: 0.25px 1px 1px black;
  // position: absolute;
  left: 20em;
  overflow: auto;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
`;

const BoatAndWork = ({ lineups, boats, oars, roster, workouts, coxswains, onDrop, onDragOver, onPickUp, boatClearOrDelete, onCopyWorkout, removeAthlete, onWorkoutChange, onAthleteDropDownSelection }) => {
  return (
    <PracticeWrapper>
      {lineups.map((lineup, index) => (
        <PerCrew
          key={index}
          oars={oars}
          boats={boats}
          roster={roster}
          boatNum={index}
          lineup={lineup}
          workouts={workouts}
          coxswains={coxswains}
          onDrop={onDrop}
          onPickUp={onPickUp}
          onDragOver={onDragOver}
          removeAthlete={removeAthlete}
          onCopyWorkout={onCopyWorkout}
          onWorkoutChange={onWorkoutChange}
          boatClearOrDelete={boatClearOrDelete}
          onAthleteDropDownSelection={onAthleteDropDownSelection}
        />
      ))}
    </PracticeWrapper>
  )
}

export default BoatAndWork;