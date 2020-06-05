import React from 'react';
import styled from 'styled-components';
import Seat from './Seat.jsx';

const BoatWrapper = styled.div`
  // border: 1px solid blue;
  border-radius: 4px;
  min-height: 20em;
  width: 16em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 2em;
`;

const Button = styled.button`
  background: none;
  border: none;
  border-radius: 1em;
  box-shadow: 1px 1px 5px rgba(19, 19, 19, .5);
  :focus {
    outline: none;
  }
  :hover {
    transform: scale(1.05, 1.05);
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(19, 19, 19, .5);
  }
  :active {
    box-shadow: none;
    box-shadow: inset 0px 0px 3px rgba(19, 19, 19, .5);
  }
`;

const Boat = ({ lineup, boat, onDrop, onDragOver, onPickUp, boatClearOrDelete, removeAthlete }) => (
  <BoatWrapper onDragOver={(e)=>onDragOver(e)}>
    {lineup.map((athlete, index) => (
      <Seat
        key={index}
        athlete={athlete}
        seat={index + 1}
        boat={boat}
        boatSize={lineup.length}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPickUp={onPickUp}
        removeAthlete={removeAthlete}
      />
    ))}
    <ButtonWrapper>
      <Button className="clear" onClick={(e)=>boatClearOrDelete(e, boat)}>Clear Lineup</Button>
      <Button className="delete" onClick={(e)=>boatClearOrDelete(e, boat)}>Delete Boat</Button>
    </ButtonWrapper>
  </BoatWrapper>
)

export default Boat;

