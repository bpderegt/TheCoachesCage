import React from 'react';
import styled from 'styled-components';
import Seat from './Seat.jsx';

const lineup = [
  // { id: 2, name: 'Jason Sun', time: '6:27.4', weight: 160.2, side: 'p' },
  // { id: 54, name: 'Adrian Layer', time: '6:29.5', weight: 202, side: 's' },
  // { id: 40, name: 'Cam Kumagai', time: '6:29.9', weight: 173.8, side: 'p' },
  // { id: 59, name: 'Matthew Boranian', time: '6:15.3', weight: 193, side: 's' },
  // { id: 19, name: 'Kai Hoite', time: '6:25.0', weight: 187.2, side: 'p' },
  // { id: 57, name: 'John Mark Ozaeta', time: '6:14.9', weight: 200.8, side: 's' },
  // {},
  // { id: 88, name: 'Noah Kim', time: '6:09.2', weight: 186.4, side: 's' },
  // {id: 103, name: 'Audrey Gates', side: 'coxswain'}
  {},{},{},{},{},{},{},{},{}
]

const BoatWrapper = styled.div`
  // border: 1px solid blue;
  border-radius: 4px;
  min-height: 20em;
`;

const Boat = ({ onDragOver }) => (
  <BoatWrapper>
    {lineup.map((athlete, index) => (
      <Seat key={index} athlete={athlete} seat={index + 1} stroke={index === lineup.length}/>
    ))}
  </BoatWrapper>
)

export default Boat;

//{ id: 32, name: 'Spencer Dettlinger', time: '6:09.4', weight: 201.2, side: 'p' }