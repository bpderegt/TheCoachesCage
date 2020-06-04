import React from 'react';
import styled from 'styled-components';

const SeatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`;

const SeatNumber = styled.div`
  min-width: 1.25em;
`;

const Athlete = styled.div`
  display: flex
  align-items: center;
  border: 1px solid grey;
  border-radius: 1em;
  min-width: 85%;
  padding: 0.3em;
  margin: 0.1em;
  padding-left: 0.5em;
  height: 1.2em;
  background:
    ${(props) =>
      props.side === "s" ? "#94ffa796"
      : props.side === "p" ? "#ff949496"
      : props.side === "coxswain" ? "#ffc10796"
      : "#a7a7a796"};
`;


const Seat = ({ athlete, seat, stroke, onDragOver }) => {
  return (
    <SeatWrapper className="droppable" onDragOver={(e)=>onDragOver(e)}>
      <SeatNumber>{seat === 1 ? `b:` : stroke ? `s:` : `${seat}:`}</SeatNumber>
      <Athlete draggable side={athlete.side} >{athlete.name}</Athlete>
    </SeatWrapper>
  )
}

export default Seat;
