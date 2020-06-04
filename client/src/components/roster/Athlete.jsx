import React from 'react';
import styled from 'styled-components';

const AthleteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #ffffbd;
  border: 1px solid grey;
  border-radius: 1em;
  margin: 0.1em;
`;

const NameWrapper = styled.div`
  max-width: 8em;
  min-width: 8em;
  overflow: hidden;
  white-space: nowrap;
  margin: 0em 0.5em;
`;

const TimeWrapper = styled.div`
  max-width: 3em;
  min-width: 3em;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 0.5em;
`;

const WeightWrapper = styled.div`
  max-width: 3em;
  min-width: 3em;
  overflow: hidden;
  white-space: nowrap;
`;

const SideWrapper = styled.div`
  background: ${(props) => props.side === "p" ? "green" : "red"};
  border: 0.5em solid ${(props) => props.side === "p" ? "green" : "red"};
  border-radius: .5em;
  margin-right: 0.25em;
`;


const Athlete = ({ athlete, onClick }) => (
  <AthleteWrapper draggable id={athlete.name} onClick={(e)=>onClick(e)}>
      <NameWrapper >{athlete.name}</NameWrapper>
      <TimeWrapper>{athlete.time}</TimeWrapper>
      <WeightWrapper>{athlete.weight.toString().indexOf('.') === -1 ? `${athlete.weight}.0` : `${athlete.weight}`}</WeightWrapper>
      <SideWrapper side={athlete.side}> </SideWrapper>
  </AthleteWrapper>
)

export default Athlete;