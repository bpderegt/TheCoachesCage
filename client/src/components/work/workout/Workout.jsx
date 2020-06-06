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

const WorkoutSelectorButton = styled.button`
  margin-left: 20px;
  font-size: 0.7em;
  border: none;
  border-radius: 1em 0em 0em 1em;
  height: 2em;
  width: 6em;
  background: white;
  box-shadow: 0px 1px 1px grey;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
  :active {
    box-shadow: inset 0px 1px 1px grey;
  }
`;

const BoatClassSelect = styled.select`
  font-size: 0.7em;
  border: none;
  border-radius: 0em 1em 1em 0em;
  height: 2em;
  width: 8em;
  background: white;
  box-shadow: 0px 1px 1px grey;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
  :active {
    box-shadow: inset 0px 1px 1px grey;
  }
`;

const TitleWrapper = styled.div`
  margin:auto;
`;

const WorkoutText = styled.textarea`
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

const Workouts = ({  }) => (
  <WorkoutWrapper>
    <TitleWrapper>Workout</TitleWrapper>
    {/* <SelectionWrapper> */}
      {/* <WorkoutSelectorButton>Add a</WorkoutSelectorButton> */}
      {/* <BoatClassSelect>
        <option value="preRow">Pre Row</option>
        <option value="drill">Drill</option>
        <option value="work">Work</option>
        <option value="postRow">Post Row</option>
      </BoatClassSelect> */}
    {/* </SelectionWrapper> */}
    <WorkoutText name="workout" rows="21" cols="33" autoCapitalize="none" autoComplete="off"></WorkoutText>
  </WorkoutWrapper>
)

export default Workouts;
