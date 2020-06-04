import React from 'react';
import styled from 'styled-components';

const WorkoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;

const Workouts = ({  }) => (
  <WorkoutWrapper>
    <div>Workouts</div>
    <div>6s: reverse pick x2</div>
    <div>6s: cut-the-cake x2</div>
  </WorkoutWrapper>
)

export default Workouts;
