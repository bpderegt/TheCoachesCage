import React from 'react';
import styled from 'styled-components';

const SeatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`;

const SeatNumber = styled.div`
  min-width: 1.5em;
  user-select: none;
`;

const Athlete = styled.div`
  background: transparent;
  display: flex
  align-items: center;
  border-radius: 1em;
  min-width: 85%;
  padding: 0.3em;
  margin: 0.1em;
  padding-left: 1em;
  height: 1.2em;
  transform: translate(0,0);
  box-shadow:
    ${props =>
      props.empty ? "inset 0px 1px 1px grey" : "0px 1px 1px grey"
    };
  background:
    ${props =>
      props.empty ? "#e8e9e8"
      : props.side === "coxswain" ? "#ffc10796"
      : (props.port && props.side === "s") ? "linear-gradient( 90deg, #ff949496 93%, #94ffa796 93% )"
      : (!props.port && props.side === "p") ? "linear-gradient( 90deg, #94ffa796 93%, #ff949496 93% )"
      : props.port ? "#ff949496"
      : "#94ffa796"};
`;

const SeatDelete = styled.button`
  min-height: 1.5em;
  min-width: 1.5em;
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

const Seat = ({ athlete, seat, boatNum, boatSize, onDragOver, onDrop, onPickUp, removeAthlete }) => {

  return (
    <SeatWrapper onDrop={(e)=>onDrop(e, null, boatNum, seat)} onDragStart={(e)=>onPickUp(e, athlete.id, boatNum, seat)} >
      <SeatNumber>
        {seat === 1 ? `b:`
        : (seat === boatSize - 1 && boatSize % 2 === 0) ? `c:`
        : ((seat === boatSize - 2 && boatSize % 2 === 0) || (seat === boatSize - 1 && boatSize % 2 === 0)) ? `s:`
        : `${seat}:`}
      </SeatNumber>
      <Athlete
        port={seat % 2 === 0}
        empty={athlete === undefined ? false : athlete.id === undefined}
        side={athlete === undefined ? null : athlete.side}
        draggable={athlete === undefined ? false : athlete.id !== undefined} >
          {athlete.name}
        </Athlete>
      <SeatDelete onClick={(e)=>{removeAthlete(e, boatNum, seat)}}></SeatDelete>
    </SeatWrapper>
  )
}
//
//

export default Seat;
