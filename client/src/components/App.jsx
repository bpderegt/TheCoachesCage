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
  font-size: 1.0em;
  padding: 0.5em 1em;
  background: none;
  border: none;
  border-radius: 1em;
  box-shadow: 0px 1px 1px black;
`;

const BoatClassSelect = styled.select`
  margin-left: 20px;
  border: none;
  border-radius: 1em;
  background: none;
  box-shadow: 0px 1px 1px black;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athletes: {},
      sortMetrics: [],
      metricIdx: 0,
      lineups: [[{},{},{},{},{},{},{},{},{}]],
      boatClassSelect: '8+'
    }
    this.onDrop = this.onDrop.bind(this);
    this.onPickUp = this.onPickUp.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.removeAthlete = this.removeAthlete.bind(this);
    this.boatClassChange = this.boatClassChange.bind(this);
    this.boatClassSelect = this.boatClassSelect.bind(this);
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
    if ((boat === dataBoat && seat === dataSeat) || (dataBoat === undefined && boat === null)) {
      // nothing to do other than don't throw an error
      return;
    } else if (boat === null) {
      lineups[dataBoat][dataSeat - 1] = {};
      currAthlete.boated = Math.max(currAthlete.boated - 1, 0);
    } else if (boat >=0 && dataBoat >= 0) {
      lineups[dataBoat][dataSeat - 1] = {};
      lineups[boat][seat - 1] = currAthlete;
    } else {
      if (lineups[boat][seat - 1].id !== undefined) {
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
    console.log(this.state.boatClassSelect[this.state.boatClassSelect.length - 1] === '+')

    const { lineups, boatClassSelect } = this.state;
    let newBoat = [];
    let size = parseInt(boatClassSelect)
    if (boatClassSelect[boatClassSelect - 1] === '+') size++;

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

  boatClassSelect(e) {
    e.preventDefault();
  }

  render() {
    return (
      <PageWrapper>
        <HeaderWrapper>
          <h2>THE CAGE ABIDES</h2>
          <BoatClassSelect onChange={this.boatClassChange}name="boatClass">
            <option value="8+">8+</option>
            <option value="4x">4x</option>
            <option value="4-">4-</option>
            <option value="4+">4+</option>
            <option value="2x">2x</option>
            <option value="2-">2-</option>
            <option value="1x">1x</option>
          </BoatClassSelect>
          <AddBoat onClick={(e)=>this.addBoat(e)}>Add an 8+</AddBoat>
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
