import React from 'react';
import styled from 'styled-components';
import Seat from './Seat.jsx';

const BoatWrapper = styled.div`
  // border: 1px solid blue;
  border-radius: 4px;
  min-height: 24em;
  width: 16em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 1.5em;
`;

const Button = styled.button`
  padding: 0.2em 1em;
  background: none;
  border: none;
  border-radius: 1em;
  box-shadow: 0px 1px 1px grey;
  :focus {
    outline: none;
  }
  :hover {
    transform: scale(1.05, 1.05);
    cursor: pointer;
    box-shadow: 0px 1px 1px grey;
    background: yellow;
  }
  :active {
    box-shadow: none;
    box-shadow: inset 0px 1px 1px grey;
  }
`;

const Boat = ({ lineup, boatNum, onDrop, onDragOver, onPickUp, boatClearOrDelete, removeAthlete }) => (
  <BoatWrapper onDragOver={(e)=>onDragOver(e)}>
    {lineup.map((athlete, index) => (
      index === 0 ? null :
      <Seat
        key={index}
        athlete={athlete}
        seat={index + 1}
        boatNum={boatNum}
        boatSize={lineup.length}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPickUp={onPickUp}
        removeAthlete={removeAthlete}
      />
    ))}
    <ButtonWrapper>
      <Button className="clear" onClick={(e)=>boatClearOrDelete(e, boatNum)}>Clear Lineup</Button>
      <Button className="delete" onClick={(e)=>boatClearOrDelete(e, boatNum)}>Delete Boat</Button>
    </ButtonWrapper>
  </BoatWrapper>
)

export default Boat;

