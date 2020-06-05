import React from 'react';
import styled from 'styled-components';
import Roster from './roster/Roster.jsx';
import BoatAndWork from './work/BoatAndWork.jsx';
const axios = require('axios');

const data = require('../../../db/static2ks.js')


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
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athletes: {},
      sortMetrics: [],
      metricIdx: 0,
      lineups: [[{},{},{},{},{},{},{},{},{}]]
    }
    this.onDrop = this.onDrop.bind(this);
    this.onPickUp = this.onPickUp.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
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

    const { lineups } = this.state;
    const { athletes } = this.state;

    console.log('dataId:', dataId, 'dataBoat:', dataBoat, 'dataSeat:', dataSeat)
    console.log('id:', id, 'boat:', boat, 'seat:', seat)

    let currAthlete = athletes[dataId];
    if ((boat === dataBoat && seat === dataSeat) || (dataBoat === undefined && boat === null)) {
      console.log('triggered')
      // nothing to do other than don't throw an error
      return;
    } else if (boat === null) {
      lineups[dataBoat][dataSeat - 1] = {};
      currAthlete.boated = Math.max(currAthlete.boated - 1, 0);
    } else if (boat >=0 && dataBoat >= 0) {
      console.log('trigger');
      lineups[dataBoat][dataSeat - 1] = {};
      lineups[boat][seat - 1] = currAthlete;
    } else {
      lineups[boat][seat - 1] = currAthlete;
      currAthlete.boated += 1;
    }

    //athlete status
    if (currAthlete.boated > 0 && currAthlete.absent) {
      currAthlete.status = 1;
    } else if (currAthlete.boated > 1) {
      currAthlete.status = 2;
    } else if (currAthlete.boated === 0) {
      currAthlete.status = 3;
    } else if (currAthlete.boated === 1) {
      currAthlete.status = 4;
    } else if (currAthlete.absent) {
      currAthlete.status = 5;
    }

    this.setState({
      lineups,
      athletes
    })
    // console.log(this.state)
  }

  addBoat(e) {
    e.preventDefault;
    let eight = [{},{},{},{},{},{},{},{},{}];
    const { lineups } = this.state;
    lineups.push(eight);
    this.setState({
      lineups
    })
    console.log(this.state.lineups)
  }

  render() {
    return (
      <PageWrapper>
        <HeaderWrapper>
          <h2>THE CAGE ABIDES</h2>
          <AddBoat onClick={(e)=>this.addBoat(e)}>Add an 8+</AddBoat>
        </HeaderWrapper>
        <ContentWrapper>
          <Roster athletes={this.state.athletes} onPickUp={this.onPickUp} onDrop={this.onDrop} onDragOver={this.onDragOver}/>
          <BoatAndWork lineups={this.state.lineups} onPickUp={this.onPickUp} onDrop={this.onDrop} onDragOver={this.onDragOver}/>
        </ContentWrapper>
      </PageWrapper>
    )
  }
}

export default App;