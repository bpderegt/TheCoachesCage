import React from 'react';
import styled from 'styled-components';

const AthleteWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const NameWrapper = styled.div`
  max-width: 10%;
  min-width: 10%;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 0.5%;
`;

const TimeWrapper = styled.div`
  max-width: 4%;
  min-width: 4%;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 0.5%;
`;

const WeightWrapper = styled.div`
  max-width: 4%;
  min-width: 4%;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 0.5%;
`;

const Athlete = ({ athlete }) => (
  <AthleteWrapper>
    <NameWrapper>{athlete.name}</NameWrapper>
    <TimeWrapper>{athlete.time}</TimeWrapper>
    <WeightWrapper>{athlete.weight.toString().indexOf('.') === -1 ? `${athlete.weight.toString()}.0` : athlete.weight.toString()}</WeightWrapper>
  </AthleteWrapper>
)

export default Athlete