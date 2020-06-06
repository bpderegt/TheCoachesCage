import React from 'react';
import styled from 'styled-components';
import Roster from './roster/Roster.jsx';
import BoatAndWork from './work/BoatAndWork.jsx';
const axios = require('axios');

const data = require('../../../db/static2ks.js');

const moment = require('moment');
moment().format();


const PageWrapper = styled.div`
  font-family: 'Lato', sans-serif;
  // border: 2px solid red;
  background: #e8e8e8;
  height: 98vh;
  width: 98vw;
  position: relative;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const AddBoat = styled.button`
  margin-left: 20px;
  font-size: 1em;
  padding: 0.5em 0em 0.5em 0.5em;
  border: none;
  border-radius: 1em 0em 0em 1em;
  height: 2em;
  width: 4em;
  background: white;
  box-shadow: 0px 1px 1px grey;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
  :active {
    box-shadow: inset 0px 0.5px 0.5px grey;
  }
`;

const BoatClassSelect = styled.select`
  font-size: 1em;
  padding: 0.4em 0em;
  border: none;
  border-radius: 0em 1em 1em 0em;
  height: 2em;
  width: 3em;
  background: white;
  box-shadow: 0px 1px 1px grey;
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
  :active {
    box-shadow: inset 0px 0.5px 0.5px grey;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athletes: {},
      sortMetrics: [],
      metricIdx: 0,
      lineups: [[{boatClass: '8+', coxswain: true, sweep: true, rig: 'spspspsp'},{},{},{},{},{},{},{},{},{}]],
      boatClassSelect: '8+'
    }
    this.onDrop = this.onDrop.bind(this);
    this.onPickUp = this.onPickUp.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.removeAthlete = this.removeAthlete.bind(this);
    this.boatClassChange = this.boatClassChange.bind(this);
    this.boatClearOrDelete = this.boatClearOrDelete.bind(this);
  }

  componentDidMount() {
    this.setState({
      athletes: data
    })
  }

  onPickUp(e, id, boat, seat) {
    if (boat) console.log(boat);
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("boat", boat);
    e.dataTransfer.setData("seat", seat);
  }

  onDragOver(e) {
    e.preventDefault()
  }

  onDrop(e, id, boat, seat) {
    const dataId = e.dataTransfer.getData("id");
    const dataBoat = e.dataTransfer.getData("boat");
    const dataSeat = e.dataTransfer.getData("seat");
    const { lineups, athletes } = this.state;

    // console.log(id)
    // console.log(dataId)
    // console.log(boat)
    // console.log(dataBoat)
    // console.log(seat)
    // console.log(dataSeat)

    let currAthlete = athletes[dataId];


    if ((boat === dataBoat && seat === dataSeat) || (dataBoat === undefined && boat === null)) { // if picking up and dropping back in roster
      // nothing to do other than don't throw an error
      return;
    } else if (boat === null) { // if dropping in roster
      lineups[dataBoat][dataSeat - 1] = {};
      currAthlete.boated = Math.max(currAthlete.boated - 1, 0);
    } else if (boat >=0 && dataBoat >= 0) { // if moving between seats in a boat
      lineups[dataBoat][dataSeat - 1] = {};
      if (lineups[boat][seat - 1].id !== undefined) { // overwriting from another boat
        console.log('athlete overwrite boated --')
        athletes[lineups[boat][seat - 1].id].boated = Math.max(0, athletes[lineups[boat][seat - 1].id].boated - 1)
      }
      lineups[boat][seat - 1] = currAthlete;
    } else {
      if (lineups[boat][seat - 1].id !== undefined) { // overwritting from roster
        console.log('athlete overwrite boated --')
        athletes[lineups[boat][seat - 1].id].boated = Math.max(0, athletes[lineups[boat][seat - 1].id].boated - 1)
      }
      lineups[boat][seat - 1] = currAthlete;
      currAthlete.boated += 1;
    }

    this.setState({
      lineups, athletes
    });
  }

  removeAthlete(e, boat, seat) {
    e.preventDefault();
    const { lineups, athletes } = this.state;

    athletes[lineups[boat][seat - 1].id] ? athletes[lineups[boat][seat - 1].id].boated = Math.max(0, athletes[lineups[boat][seat - 1].id].boated - 1) : null
    lineups[boat][seat - 1] = {};

    this.setState({
      lineups, athletes
    })
  }

  boatClearOrDelete(e, boat) {
    let action = e.target.className.split(' ');
    action = action[action.length - 1];

    const { lineups, athletes } = this.state;

    lineups[boat].forEach((athlete, index) => {
      athletes[athlete.id] ? athletes[athlete.id].boated = Math.max(0, athletes[athlete.id].boated - 1) : null
      lineups[boat][index] = {};
    })

    if (action === "delete") {
      lineups.splice(boat, 1)
    }

    this.setState({
      lineups, athletes
    })
  }

  addBoat(e) {
    e.preventDefault;


    const { lineups, boatClassSelect } = this.state;
    let newBoat = [{
      boatClass: boatClassSelect,
      coxswain: false,
      sweep: true,
      rig: ''
    }];

    //{boatClass: '8+', coxswain: true, sweep: true, rig: 'spspspsp'}
    let size = parseInt(boatClassSelect)
    let appendix = boatClassSelect[boatClassSelect.length - 1]
    if (appendix === '+') {
      size++;
      newBoat[0].coxswain = true;
    } else if (appendix === 'x') {
      newBoat[0].sweep = false;
    }

    if (size === 1) console.log('really? a single? who even rows singles?')

    for (let i = 0; i < size; i++) {
      newBoat.push({});
    }

    lineups.push(newBoat);
    this.setState({
      lineups
    })
    console.log(this.state.lineups)
  }

  boatClassChange(e) {
    e.preventDefault();
    this.setState({
      boatClassSelect: e.target.value
    })
  }

  render() {
    return (
      <PageWrapper>
        <HeaderWrapper>
          <h2>THE CAGE ABIDES</h2>
          <AddBoat onClick={(e)=>this.addBoat(e)}>Add a{`${this.state.boatClassSelect === '8+' ? `n `: ` `}`}</AddBoat>
          <BoatClassSelect onChange={this.boatClassChange}name="boatClass">
            <option value="8+">8+</option>
            <option value="4x">4x</option>
            <option value="4-">4-</option>
            <option value="4+">4+</option>
            <option value="2x">2x</option>
            <option value="2-">2-</option>
            <option value="1x">1x</option>
          </BoatClassSelect>
        </HeaderWrapper>
        <ContentWrapper>
          <Roster
            athletes={this.state.athletes}
            onPickUp={this.onPickUp}
            onDrop={this.onDrop}
            onDragOver={this.onDragOver}
          />
          <BoatAndWork
            lineups={this.state.lineups}
            onPickUp={this.onPickUp}
            onDrop={this.onDrop}
            onDragOver={this.onDragOver}
            boatClearOrDelete={this.boatClearOrDelete}
            removeAthlete={this.removeAthlete}
          />
        </ContentWrapper>
      </PageWrapper>
    )
  }
}


export default App;
