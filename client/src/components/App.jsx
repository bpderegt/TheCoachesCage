import React from 'react';
import styled from 'styled-components';
import { firstBy } from "thenby";
import Roster from './roster/Roster.jsx';
import BoatAndWork from './work/BoatAndWork.jsx';
const axios = require('axios');

const moment = require('moment');
moment().format();


const PageWrapper = styled.div`
  font-family: 'Lato', sans-serif;
  background: #e8e8e8;
  height: 97vh;
  width: 97vw;
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
  height: 90vh;
`;

const AddBoat = styled.button`
  margin-left: 20px;
  font-size: 1em;
  user-select: none;
  padding: 0.5em 0em 0.5em 0.25em;
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
  padding: 0.4em 0em 0.4em 0.3em;
  user-select: none;
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
      sortParams: ['2k PB', '6x500m'],
      paramIdx: [0, 1],
      lineups: [
        [
          { boatClass: '8+',
            coxswain: true,
            sweep: true,
            rig: 'spspspsp'
          },{},{},{},{},{},{},{},{},{}],
        [
          { boatClass: '8+',
            coxswain: true,
            sweep: true,
            rig: 'pspspsps'
          },{},{},{},{},{},{},{},{},{}]],
      boatClassSelect: '8+',
      boats: {},
      oars: {},
      workouts: ['',''],
      coxswainHide: true
    }
    this.onDrop = this.onDrop.bind(this);
    this.addBoat = this.addBoat.bind(this);
    this.onPickUp = this.onPickUp.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.paramChange = this.paramChange.bind(this);
    this.onCopyWorkout = this.onCopyWorkout.bind(this);
    this.removeAthlete = this.removeAthlete.bind(this);
    this.coxswainToggle = this.coxswainToggle.bind(this);
    this.onWorkoutChange = this.onWorkoutChange.bind(this);
    this.boatClassChange = this.boatClassChange.bind(this);
    this.boatClearOrDelete = this.boatClearOrDelete.bind(this);
    this.onAthleteDropDownSelection = this.onAthleteDropDownSelection.bind(this);
  }

  componentDidMount() {
    const { paramIdx } = this.state;
    axios.get(`/init/${paramIdx[0]}/${paramIdx[1]}`)
      .then(res => {
        this.setState({
          athletes: res.data.roster,
          boats: res.data.equipment[0],
          oars: res.data.equipment[1]
        })
      })
      .catch(err => console.error(err));
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

    // console.log('id: ', id)
    // console.log('boat: ', boat)
    // console.log('seat: ', seat)
    // console.log('dataId: ', dataId)
    // console.log('dataBoat: ', dataBoat)
    // console.log('dataSeat: ', dataSeat)
    // console.log('======')
    let currAthlete = athletes[dataId];

    if ((boat === dataBoat && seat === dataSeat) || (dataBoat === 'undefined' && boat === null)) { // if picking up and dropping back in roster
      // nothing to do other than don't throw an error
      return;
    } else if (boat === null) { // if dropping in roster
      // let result = returnToRoster(athletes[dataId], lineups, dataBoat, dataSeat)
      lineups[dataBoat][dataSeat] = {};
      currAthlete.boated = Math.max(currAthlete.boated - 1, 0);
    } else if (boat >=0 && dataBoat >= 0) { // if moving between seats in a boat
      lineups[dataBoat][dataSeat] = {};
      if (lineups[boat][seat].id !== undefined) { // overwriting from another boat
        console.log('athlete overwrite boated --')
        athletes[lineups[boat][seat].id].boated = Math.max(0, athletes[lineups[boat][seat].id].boated - 1)
      }
      lineups[boat][seat] = currAthlete;
    } else {
      if (lineups[boat][seat].id !== undefined) { // overwritting from roster
        athletes[lineups[boat][seat].id].boated = Math.max(0, athletes[lineups[boat][seat].id].boated - 1)
      }
      lineups[boat][seat] = currAthlete;
      currAthlete.boated += 1;
    }
    this.setState({
      lineups, athletes
    });
  }

  removeAthlete(e, boat, seat) {
    e.preventDefault();
    const { lineups, athletes } = this.state;
    athletes[lineups[boat][seat].id] ? athletes[lineups[boat][seat].id].boated = Math.max(0, athletes[lineups[boat][seat].id].boated - 1) : null
    lineups[boat][seat] = {};
    this.setState({
      lineups, athletes
    })
  }

  boatClearOrDelete(e, boat) {
    let action = e.target.className.split(' ');
    action = action[action.length - 1];
    const { lineups, athletes, workouts } = this.state;
    lineups[boat].forEach((athlete, index) => {
      if (index !== 0) {
        athletes[athlete.id] ? athletes[athlete.id].boated = Math.max(0, athletes[athlete.id].boated - 1) : null
        lineups[boat][index] = {};
      }
    })
    if (action === "delete") {
      lineups.splice(boat, 1)
      workouts.splice(boat, 1)
    }
    this.setState({
      lineups, athletes, workouts
    })
  }

  addBoat(e) {
    e.preventDefault();
    const { lineups, boatClassSelect, workouts } = this.state;
    let newBoat = [{
      boatClass: boatClassSelect,
      coxswain: false,
      sweep: true,
      rig: ''
    }];
    //{boatClass: '8+', coxswain: true, sweep: true, rig: 'spspspsp'}
    let size = parseInt(boatClassSelect);
    let appendix = boatClassSelect[boatClassSelect.length - 1]
    if (appendix === '+') {
      size += 1;
      newBoat[0].coxswain = true;
    } else if (appendix === 'x') {
      newBoat[0].sweep = false;
    }
    if (size === 1) console.log('really? a single? who even rows singles?')
    for (let i = 0; i < size; i++) {
      newBoat.push({});
    }
    lineups.push(newBoat);
    workouts.push('')
    this.setState({
      lineups, workouts
    })
  }

  boatClassChange(e) {
    e.preventDefault();
    this.setState({
      boatClassSelect: e.target.value
    });
  }

  paramChange(e) {
    e.preventDefault();
    const { sortParams, lineups } = this.state;
    this.setState({
      paramIdx: [sortParams.indexOf(e.target.value), 1]
    })
    // some DEV tech debt here, we are also return the equipement
    axios.get(`/init/${sortParams.indexOf(e.target.value)}/${1}`)
      .then(res => {
        lineups.map(lineup => {
          lineup.map(athlete => {
            if (athlete.id !== undefined) {
              athlete.param1 = res.data.roster[athlete.id].param1;
              athlete.param2 = res.data.roster[athlete.id].param2;
            }
          })
        })
        this.setState({
          athletes: res.data.roster,
          lineups
        })
      })
      .catch(err => console.error(err));
  }

  onAthleteDropDownSelection(e, boat, seat) {
    e.preventDefault()
    console.log(e.target.value)
    console.log(boat, seat)
    const { athletes, lineups } = this.state
    athletes[e.target.value].boated += 1;
    lineups[boat][seat] = athletes[e.target.value];
    this.setState({
      lineups, athletes
    })
  }

  onWorkoutChange(e, boat) {
    e.preventDefault()
    const { workouts } = this.state;
    workouts[boat] = e.target.value;
    this.setState({
      workouts
    })
    console.log(this.state);
  }

  onCopyWorkout(e, boat) {
    e.preventDefault()
    const { workouts } = this.state;
    if (e.target.value === 'right') {
      if (boat < workouts.length) workouts[boat + 1] = workouts[boat];
    } else {
      if (boat > 0) workouts[boat - 1] = workouts[boat];
    }
    this.setState({
      workouts
    })
  }

  coxswainToggle(e) {
    let { coxswainHide } = this.state;
    coxswainHide = !coxswainHide;
    this.setState({ coxswainHide })
  }

  render() {
    const {
      lineups,
      athletes,
      sortParams,
      paramIdx,
      boats,
      oars,
      workouts,
      coxswainHide
    } = this.state;
    const roster = [];
    const coxswains = [];
    //status check <-- tech debt right here, maybe plug this into the add/drop
    for (let key in athletes) {
      athletes[key].id = key;
      if (athletes[key].boated > 0 && athletes[key].absent) {
        athletes[key].status = 1;
      } else if (athletes[key].boated > 1) {
        athletes[key].status = 2;
      } else if (athletes[key].boated === 0) {
        athletes[key].status = 3;
      } else if (athletes[key].boated === 1) {
        athletes[key].status = 4;
      } else if (athletes[key].absent) {
        athletes[key].status = 5;
      }
      athletes[key].side === "coxswain" ? coxswains.push(athletes[key]) : roster.push(athletes[key]);
    };
    roster.sort(
      firstBy(athlete => athlete.status)
      .thenBy("param1")
      .thenBy("param2")
    );
    coxswains.sort(
      firstBy(athlete => athlete.status)
      .thenBy("param1")
      .thenBy("param2")
    );
    return (
      <PageWrapper>
        <HeaderWrapper>
          <h2>THE CAGE ABIDES</h2>
          <AddBoat onClick={(e)=>this.addBoat(e)}>Add a{`${this.state.boatClassSelect === '8+' ? `n `: ` `}`}</AddBoat>
          <BoatClassSelect onChange={this.boatClassChange} name="boatClass">
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
            roster={ roster }
            paramIdx={ paramIdx }
            coxswains= { coxswains }
            sortParams={ sortParams }
            coxswainHide={ coxswainHide }
            onDrop={ this.onDrop }
            onPickUp={ this.onPickUp }
            onDragOver={ this.onDragOver }
            paramChange={ this.paramChange }
            coxswainToggle={ this.coxswainToggle }
          />
          <BoatAndWork
            oars={ oars }
            boats={ boats }
            roster={ roster }
            lineups={ lineups }
            workouts={ workouts }
            coxswains={ coxswains }
            onDrop={ this.onDrop }
            onPickUp={ this.onPickUp }
            onDragOver={ this.onDragOver }
            removeAthlete={ this.removeAthlete }
            onCopyWorkout={ this.onCopyWorkout }
            onWorkoutChange={ this.onWorkoutChange }
            boatClearOrDelete={ this.boatClearOrDelete }
            onAthleteDropDownSelection={ this.onAthleteDropDownSelection }
          />
        </ContentWrapper>
      </PageWrapper>
    )
  }
}

export default App;
