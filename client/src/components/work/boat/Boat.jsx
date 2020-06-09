import React from 'react';
import styled from 'styled-components';
import BoatAndOars from './BoatAndOars.jsx';
import BoatAverages from './BoatAverages.jsx'
import Seat from './Seat.jsx';

const BoatWrapper = styled.div`
  // border: 1px solid blue;
  border-radius: 4px;
  min-height: 24em;
  width: 16em;
`;

const ButtonWrapper = styled.div`
  user-select: none;
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

const Boat = ({ boats, oars, lineup, roster, boatNum, coxswains, onDrop, onDragOver, onPickUp, boatClearOrDelete, removeAthlete, onAthleteDropDownSelection }) => (
  <BoatWrapper onDragOver={(e)=>onDragOver(e)}>
    <BoatAndOars
      oars={oars}
      boats={boats}
      boatNum={boatNum}
      boatDetails={lineup[0]}/>
    {lineup.map((athlete, index) => (
      index === 0 ? null :
      <Seat
        key={index}
        seat={index}
        roster={roster}
        boatNum={boatNum}
        athlete={athlete}
        rig={lineup[0].rig}
        coxswains={coxswains}
        boatSize={lineup.length}
        sculling={!lineup[0].sweep}
        coxswain={index === lineup.length - 1 && lineup[0].coxswain}
        onDrop={onDrop}
        onPickUp={onPickUp}
        onDragOver={onDragOver}
        removeAthlete={removeAthlete}
        onAthleteDropDownSelection={onAthleteDropDownSelection}
      />
    ))}
    <BoatAverages boatNum={boatNum} lineup={lineup}/>
    <ButtonWrapper>
      <Button className="clear" onClick={(e)=>boatClearOrDelete(e, boatNum)}>Clear Lineup</Button>
      <Button className="delete" onClick={(e)=>boatClearOrDelete(e, boatNum)}>Delete Boat</Button>
    </ButtonWrapper>
  </BoatWrapper>
)

export default Boat;

