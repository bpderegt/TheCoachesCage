import React from 'react';
import styled from 'styled-components';



const BoatAndOarWrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 1.75em;
  margin-bottom: 0.5em;
  margin-right: -0.5em;
`;

const Boats = styled.select`
  -webkit-appearance: none;
  text-align-last: center;
  font-size: 0.75em;
  border-radius: 1em 0em 0em 1em;
  height: 1.75em;
  width: 11em;
  background: #e8e9e8;
  border: none;
  padding-right: 0.25em;
  box-shadow: 0px 1px 1px grey;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
`;

const Oars = styled.select`
  -webkit-appearance: none;
  text-align-last: center;
  font-size: 0.75em;
  border-radius: 0em 1em 1em 0em;
  height: 1.75em;
  width: 11em;
  background: #e8e9e8;
  border: none;
  padding-left: 0.25em;
  box-shadow: 0px 1px 1px grey;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
`;

const BoatOption = styled.option`
  direction: rtl;
`;


const BoatAndOars = ({ boats, oars, boatNum, boatDetails }) => {
  let discipline = 'scull';
  if (boatDetails.sweep) discipline = 'sweep';
  return (
    boats[boatDetails.boatClass] === undefined
      ? <BoatAndOarWrapper>
          <Boats></Boats>
          <Oars></Oars>
        </BoatAndOarWrapper>
      : <BoatAndOarWrapper>
          <Boats name="Boat" >
            <BoatOption name="Boat" defaultValue>Boat</BoatOption>
            {boats[boatDetails.boatClass].map((boat, index) => (
              <BoatOption key={index} value={boat[0]}>{boat[0]}</BoatOption>
            ))}
          </Boats>
          <Oars>
            <option name="Oars" defaultValue>Oars</option>
            {oars[discipline].map((oar, index) => (
              <option key={index} value={oar[0]}>{oar[0]}</option>
            ))}
          </Oars>
        </BoatAndOarWrapper>
  )
}

export default BoatAndOars;