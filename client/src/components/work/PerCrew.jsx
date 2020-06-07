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

const PerCrew = ({boatNum, boats, oars, roster, lineup, onDrop, onDragOver, onPickUp, boatClearOrDelete, removeAthlete, onAthleteDropDownSelection}) => {

  return (
    <CrewWrapper>
      <Boat
        oars={oars}
        boats={boats}
        roster={roster}
        lineup={lineup}
        boatNum={boatNum}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPickUp={onPickUp}
        boatClearOrDelete={boatClearOrDelete}
        removeAthlete={removeAthlete}
        onAthleteDropDownSelection={onAthleteDropDownSelection}
      />
      <Workout />
    </CrewWrapper>
  )
}

export default PerCrew;