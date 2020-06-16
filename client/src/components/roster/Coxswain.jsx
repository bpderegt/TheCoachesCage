import React from 'react';
import styled from 'styled-components';

const AthleteWrapper = styled.div`
  height:
    ${props =>
      props.hide ? '0'
      : '1.2'}em;
  transition: height 250ms ease;
  transform: translate(0,0);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow:
    ${props =>
      props.hide ? "none"
      : "0px 1px 1px grey"};
  border-radius: 1em;
  margin: 0.1em;
  padding: 0.1em;
  margin-bottom: 0.3em;
  color:
    ${props =>
      props.hide ? "transparent"
      : props.status < 3 ? "white"
      : "black"};
  transition-delay: 100ms;
  transition-property: color;
  background:
    ${(props) =>
      props.hide ? "transparent"
      : props.status === 1 ? "red"
      : props.status === 2 ? "red"
      : props.status === 3 ? "#ffc10796"
      : props.status === 4 ? "#90ee90bd"
      : "red"};
`;

const NameWrapper = styled.div`
  max-width: 8em;
  min-width: 8em;
  overflow: hidden;
  white-space: nowrap;
  margin: 0em 0.5em;
`;

const Param1Wrapper = styled.div`
  max-width: 6em;
  min-width: 6em;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 0.5em;
`;

const Param2Wrapper = styled.div`
  max-width: 3em;
  min-width: 3em;
  overflow: hidden;
  white-space: nowrap;
`;

const SideWrapper = styled.div`
  height: 0.7em;
  width: 0.7em;
  border-radius: 100%;
  border: 2px solid black;
  border-right: 2px solid transparent;
  margin: 0em 0.125em 0em;
`;

const Coxswain = ({ athlete, hide, onPickUp }) => {
  // console.log(athlete)
  return (
    <div>
      {hide
      ? <AthleteWrapper hide={hide}></AthleteWrapper>
      : <AthleteWrapper hide={hide} status={athlete.status} id={athlete.id} onDragStart={(e)=>onPickUp(e, athlete.id)} draggable>
        <NameWrapper>{athlete.name}</NameWrapper>
        <Param1Wrapper>{athlete.side}</Param1Wrapper>
        <SideWrapper side={athlete.side}> </SideWrapper>
      </AthleteWrapper>}
    </div>
  )
}

export default Coxswain;