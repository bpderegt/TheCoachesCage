import React from 'react';
import styled from 'styled-components';
import Boat from './boat/Boat.jsx'
import Workout from './workout/Workout.jsx'

const CrewWrapper = styled.div`
  max-width: 16em;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  padding-right: 2em;
`;

const PerCrew = ({boatNum, boats, oars, roster, lineup, workouts, coxswains, onDrop, onDragOver, onPickUp, boatClearOrDelete, onCopyWorkout, removeAthlete, onWorkoutChange, onAthleteDropDownSelection}) => {

  return (
    <CrewWrapper>
      <Boat
        oars={oars}
        boats={boats}
        roster={roster}
        lineup={lineup}
        boatNum={boatNum}
        coxswains={coxswains}
        onDrop={onDrop}
        onPickUp={onPickUp}
        onDragOver={onDragOver}
        removeAthlete={removeAthlete}
        boatClearOrDelete={boatClearOrDelete}
        onAthleteDropDownSelection={onAthleteDropDownSelection}
      />
      <Workout
        boatNum={boatNum}
        workouts={workouts}
        onCopyWorkout={onCopyWorkout}
        onWorkoutChange={onWorkoutChange}
      />
    </CrewWrapper>
  )
}

export default PerCrew;