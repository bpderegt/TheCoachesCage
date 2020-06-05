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
  padding-left: 1em;
  height: 1.2em;
  background:
    ${(props) =>
      props.side === "s" ? "#94ffa796"
      : props.side === "p" ? "#ff949496"
      : props.side === "coxswain" ? "#ffc10796"
      : props.side === "" ? "linear-gradient( -8deg, #ff949496 50%, #94ffa796 50% )"
      : "#a7a7a796"};
`;

const SeatDelete = styled.button`
  min-height: 1.75em;
  min-width: 1.75em;
  border: none;
  background: none;
  :hover {
    cursor: pointer;
    border: 3px solid #ca0000;
    border-radius: 1.2em;
    background: linear-gradient(45deg, transparent 44%, #ca0000 44%, #ca0000 56%, transparent 56%);
  }
  :focus {
    outline: none;
  }
  :active {
    transform: scale(0.90, 0.9);
  }
`;

const Seat = ({ athlete, seat, boat, boatSize, onDragOver, onDrop, onPickUp, removeAthlete }) => {
  return (
    <SeatWrapper onDrop={(e)=>onDrop(e, null, boat, seat)} onDragStart={(e)=>onPickUp(e, athlete.id, boat, seat)} >
      <SeatNumber>{seat === 1 ? `b:` : (seat === boatSize - 1) ? `s:` : (seat === boatSize) ? `c:` : `${seat}:`}</SeatNumber>
      <Athlete side={athlete.side} draggable >{athlete.name}</Athlete>
      <SeatDelete onClick={(e)=>{removeAthlete(e, boat, seat)}}></SeatDelete>
    </SeatWrapper>
  )
}

export default Seat;
