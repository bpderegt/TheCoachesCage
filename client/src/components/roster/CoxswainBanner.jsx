import React from 'react';
import styled from 'styled-components';

const AthleteWrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 1px grey;
  border-radius: 1em;
  margin: 0.1em;
  padding: 0.1em;
  margin-bottom: 0.3em;
  transform: translate(0,0);
  background: #ffc10796;
  :hover {
    cursor: pointer;
  }
`;

const NameWrapper = styled.div`
  max-width: 8em;
  min-width: 8em;
  overflow: hidden;
  white-space: nowrap;
  margin: 0em 0.5em;
  text-align: center;
`;

const SideWrapper = styled.div`
  height: 0.7em;
  width: 0.7em;
  border-radius: 100%;
  border: 2px solid black;
  border-right: 2px solid transparent;
  margin: 0em 0.125em 0em;
`;

const coxswainBanner = {
  status: 3,
  id: 'cB',
  name: 'Show Coxswains',
  side: 'coxswain'
}

const CoxswainBanner = ({ coxswainHide, coxswainToggle }) => {
  // console.log(athlete)
  return (
    <AthleteWrapper onClick={(e)=>coxswainToggle(e)} >
      <NameWrapper>{coxswainHide ? `Show Coxswains`: `Hide Coxswains` }</NameWrapper>
      <SideWrapper> </SideWrapper>
    </AthleteWrapper>
  )
}

export default CoxswainBanner;