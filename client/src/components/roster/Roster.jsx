import React from 'react';
import styled from 'styled-components';
import Athlete from './Athlete.jsx'

const RosterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 1em;
  box-shadow: 0.25px 1px 1px black;
  margin-right: 2em;
  width: 18em;
  padding: 0.25em;
  float: left;
  height: 88vh;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 4.75em;
  left: 1.5em;
`;

const ListWrapper = styled.div`
  height: 84vh;
  border-radius: 1em;
  position: absolute;
  top: 6.25em;
  left: 0.5em;
  padding: 0em 0.2em;
  overflow: auto;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
`;

const Name = styled.div`
  width: 8.5em;
`;
const Time = styled.div`
  width: 3.5em;
`;
const Weight = styled.div`
  width: 3em;
`;

const Roster = ({ roster, onPickUp, onDrop, onDragOver }) => {

  return (
    <RosterWrapper>
      <HeaderWrapper>
        <Name>Name</Name>
        <Time>Time</Time>
        <Weight>Weight</Weight>
      </HeaderWrapper>
      <ListWrapper onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>onDrop(e, null, null)}>
        {roster.map((athlete, index) => (
          <Athlete key={index} athlete={athlete} onPickUp={onPickUp} />
        ))}
      </ListWrapper>
    </RosterWrapper>
  )
}

export default Roster;
