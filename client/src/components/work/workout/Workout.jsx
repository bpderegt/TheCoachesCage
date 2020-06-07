import React from 'react';
import styled from 'styled-components';

const WorkoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1.75em;
`;

const SelectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 90%;
  user-select: none;
`;

const CopyLeftButton = styled.button`
  border: 1px solid transparent;
  background: none;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 100%;
  }
`;

const CopyRightButton = styled.button`
  border: 1px solid transparent;
  background: none;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 100%;
  }
`;

const WorkoutText = styled.textarea`
  background: #fffde9;
  max-width: 18em;
  border: 1px solid grey;
  font-family: 'Lato', sans-serif;
  border-radius: 0.5em;
  margin: 0.5em;
  // margin-left: 2.5em
  :focus {
    outline: none;
  }
`;

const Workouts = ({ boatNum, workouts, onCopyWorkout, onWorkoutChange }) => (
  <WorkoutWrapper>
    <TitleWrapper>
      <CopyLeftButton value="left" onClick={(e)=>onCopyWorkout(e, boatNum)}>⇇</CopyLeftButton>
      Workout
      <CopyRightButton value="right" onClick={(e)=>onCopyWorkout(e, boatNum)}>⇉</CopyRightButton>
    </TitleWrapper>
    <WorkoutText name="workout" rows="21" cols="33" autoCapitalize="none" autoComplete="off" value={workouts[boatNum]} onChange={(e)=>onWorkoutChange(e, boatNum)}></WorkoutText>
  </WorkoutWrapper>
)

export default Workouts;