import React from 'react';
import styled from 'styled-components';
import Boat from './boat/Boat.jsx'
import Workout from './workout/Workout.jsx'

const BoatAndWorkWrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 1em;
  padding-right: 2em;
`;

const BoatAndWork = ({ athletes }) => {
  return (
    <BoatAndWorkWrapper>
      <Boat athletes={athletes}/>
      <Workout />
    </BoatAndWorkWrapper>
  )
}

export default BoatAndWork;