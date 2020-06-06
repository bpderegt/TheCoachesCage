import React from 'react';
import styled from 'styled-components';

const AthleteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 1px grey;
  border-radius: 1em;
  margin: 0.1em;
  padding: 0.1em;
  margin-bottom: 0.3em;
  transform: translate(0,0);
  color:
    ${props =>
      props.status < 3 ? "white" : "black"};
  background:
    ${(props) =>
      props.status === 1 ? "red"
      : props.status === 2 ? "red"
      : props.status === 3 ? "#f3e375"
      : props.status === 4 ? "#90ee90bd"
      : "red"};
`;

const NameWrapper = styled.div`
  max-width: 8em;
  min-width: 8em;
  overflow: hidden;
  white-space: nowrap;
  margin: 0em 0.5em;
`;

const Param1Wrapper = styled.div`
  max-width: 3em;
  min-width: 3em;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 0.5em;
`;

const Param2Wrapper = styled.div`
  max-width: 3em;
  min-width: 3em;
  overflow: hidden;
  white-space: nowrap;
`;

const SideWrapper = styled.div`
  height: 1em;
  width: 1em;
  border-radius: 0.5em;
  margin: 0em 0.125em 0em;
  background:
    ${props =>
      props.side === 'p' ? "red" :
      props.side === 's' ? "green" :
      "linear-gradient( -45deg, red 50%, green 50% )"};
  `;

const Athlete = ({ athlete, onPickUp }) => {
  // console.log(athlete)
  return (
    <AthleteWrapper status={athlete.status} id={athlete.id} onDragStart={(e)=>onPickUp(e, athlete.id)} draggable>
      <NameWrapper >{athlete.name}</NameWrapper>
      <Param1Wrapper>{athlete.param1}</Param1Wrapper>
      <Param2Wrapper>{athlete.param2}</Param2Wrapper>
      <SideWrapper side={athlete.side}> </SideWrapper>
    </AthleteWrapper>
  )
}

export default Athlete;