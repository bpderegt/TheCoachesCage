import React from 'react';
import Athlete from './Athlete.jsx'
const data = require('../../../../db/static2ks.js')

const moment = require('moment');
moment().format();

const Roster = () => (
  <div>
    {data.map((athlete, index) => (
      <Athlete key={index} athlete={athlete} />
    ))}
  </div>
)

export default Roster;
