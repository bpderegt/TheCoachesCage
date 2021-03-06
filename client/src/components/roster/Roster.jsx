import React from 'react';
import styled from 'styled-components';
import Rower from './Rower.jsx';
import Coxswain from './Coxswain.jsx';
import CoxswainBanner from './CoxswainBanner.jsx';

const RosterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 97%;
  min-width: 18em;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 1em;
  box-shadow: 0.25px 1px 1px black;
  margin-right: 2em;
  padding: 0.25em;
  float: left;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 4.75em;
  left: 1.5em;
`;

const ListWrapper = styled.div`
  height: 86%;
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

const CoxswainWrapper = styled.div`
`;

const CoxswainsTransform = styled.div`
height: ${(props) => props.hide ? '0' : props.length * 1.70}em;
transition: height 250ms ease;
`;

const Name = styled.div`
  user-select: none;
  width: 7.6em;
`;

const Time = styled.select`
  -webkit-appearance: none;
  user-select: none;
  width: 4.4em;
  font-size: 1em;
  border: none;
  margin-top: 0.1em;
  text-align-last: center;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
`;

const Weight = styled.div`
  user-select: none;
  width: 3em;
`;



const Roster = ({ roster, coxswains, sortParams, paramIdx, coxswainHide, onPickUp, onDrop, onDragOver, paramChange, coxswainToggle }) => {
  return (
    <RosterWrapper>
      <HeaderWrapper>
        <Name>Name</Name>
        <Time onChange={(e)=>paramChange(e)}>
          <option key={paramIdx[0]} value={sortParams[paramIdx[0]]} defaultValue>{sortParams[paramIdx[0]]}</option>
          {sortParams.map((param, index) => (
            index !== paramIdx[0]
              ? <option key={index} value={sortParams[index]}>{sortParams[index]}</option>
              : null
          ))}
        </Time>
        <Weight>Weight</Weight>
      </HeaderWrapper>
      <ListWrapper onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>onDrop(e, null, null)}>
        <CoxswainWrapper>
          <CoxswainBanner coxswainHide={coxswainHide} coxswainToggle={coxswainToggle} />
          <CoxswainsTransform hide={coxswainHide} length={coxswains.length}>
            {coxswains.map((coxswain, index) => (
                <Coxswain key={index} hide={coxswainHide} athlete={coxswain} onPickUp={onPickUp} />
              ))}
            </CoxswainsTransform>
        </CoxswainWrapper>
        {roster.map((athlete, index) => (
          <Rower key={index + coxswains.length} athlete={athlete} onPickUp={onPickUp} />
        ))}
      </ListWrapper>
    </RosterWrapper>
  )
}

export default Roster;
