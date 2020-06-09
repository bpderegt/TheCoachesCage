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
  font-size: 1em;
  display: flex
  align-items: center;
  border-radius: 1em;
  min-width: 85.5%;
  padding: 0.3em;
  margin: 0.1em;
  padding-left: 1em;
  height: 1.2em;
  transform: translate(0,0);
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
  box-shadow:
    ${props =>
      props.empty ? "inset 0px 1px 1px grey" : "0px 1px 1px grey"
    };
  background:
    ${props =>
      props.empty ? "#e8e9e8"
      : props.coxswain ? "#ffc10796"
      : props.side === "coxswain" ? "#ffc10796"
      : props.sculling ? "#00b6ff96"
      : (props.port && props.side === "s") ? "linear-gradient( 90deg, #ff949496 93%, #94ffa796 93% )"
      : (!props.port && props.side === "p") ? "linear-gradient( 90deg, #94ffa796 93%, #ff949496 93% )"
      : props.port ? "#ff949496"
      : "#94ffa796"};
`;

const AthleteSelect = styled.select`
  -webkit-appearance: none;
  background: transparent;
  font-size: 1em;
  border: none;
  display: flex
  align-items: center;
  border-radius: 1em;
  min-width: 94%;
  padding: 0.3em;
  margin: 0.1em;
  padding-left: 1em;
  height: 1.8em;
  transform: translate(0,0);
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
  box-shadow:
    ${props =>
      props.empty ? "inset 0px 1px 1px grey" : "0px 1px 1px grey"
    };
  background:
    ${props =>
      props.empty ? "#e8e9e8"
      : props.side === "coxswain" ? "#ffc10796"
      : props.sculling ? "blue"
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

const Seat = ({ athlete, rig, seat, roster, sculling, coxswain, boatNum, boatSize, coxswains, onDragOver, onDrop, onPickUp, removeAthlete, onAthleteDropDownSelection }) => {
  // if (coxswain) console.log(boatNum, seat, coxswain)
  return (
    <SeatWrapper onDrop={(e)=>onDrop(e, null, boatNum, seat)} onDragStart={(e)=>onPickUp(e, athlete.id, boatNum, seat)} >
      <SeatNumber>
        {seat === 1 ? `b:`
        : (coxswain) ? `c:`
        : ((seat === boatSize - 2 && boatSize % 2 === 0) || (seat === boatSize - 1)) ? `s:`
        : `${seat}:`}
      </SeatNumber>
      {/* below is sloppy and not neccesary */}
      {athlete.id !== undefined
      ? <Athlete
          onChange={ (e)=>onAthleteDropDownSelection(e, boatNum, seat) }
          port={(seat + boatNum) % 2 === 0}
          sculling={sculling}
          coxswain={coxswain}
          empty={athlete === undefined ? false : athlete.id === undefined}
          side={athlete === undefined ? null : athlete.side}
          draggable={athlete === undefined ? false : athlete.id !== undefined}
        >
          {athlete.name}
        </Athlete>
      : <AthleteSelect
          onChange={ (e)=>onAthleteDropDownSelection(e, boatNum, seat) }
          port={(seat + boatNum) % 2 === 0}
          sculling={sculling}
          coxswain={coxswain}
          empty={athlete === undefined ? false : athlete.id === undefined}
          side={athlete === undefined ? null : athlete.side}
          draggable={athlete === undefined ? false : athlete.id !== undefined}
          >
            <option value={athlete.name} defaultValue>{athlete.name}</option>
            {coxswain
              ? coxswains.map((rosterAthlete, index) => (
                <option key={index} value={rosterAthlete.id}>{rosterAthlete.name}</option>
              ))
              : roster.map((rosterAthlete, index) => (
                <option key={index} value={rosterAthlete.id}>{rosterAthlete.name}</option>
              ))}
        </AthleteSelect>}

      <SeatDelete onClick={(e)=>{removeAthlete(e, boatNum, seat)}}></SeatDelete>
    </SeatWrapper>
  )
}
export default Seat;
