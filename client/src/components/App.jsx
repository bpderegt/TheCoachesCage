import React from 'react';
import styled from 'styled-components';
import Roster from './roster/Roster.jsx';
import BoatAndWork from './work/BoatAndWork.jsx';
const axios = require('axios');

const data = require('../../../db/static2ks.js')


const PageWrapper = styled.div`
  font-family: 'Lato', sans-serif;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: [],
      athletes: {},
      sortMetrics: [],
      metricIdx: 0,
      lineups: []
    }
    this.onAthleteClick = this.onAthleteClick.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }

  componentDidMount() {
    const roster = [];

    for (let key in data) {
      data[key].id = key;
      data[key].status = 'roster';
      roster.push(data[key]);
    }

    roster.sort((a, b) => (a.time > b.time) ? 1 : -1)

    this.setState({
      roster: roster,
      athletes: data
    })
  }

  onAthleteClick(e) {
    e.preventDefault();

  }

  onDragOver(e) {
    e.preventDefault();
  }

  render() {
    return (
      <PageWrapper>
        <h2>THE CAGE ABIDES</h2>
        <ContentWrapper>
          <Roster roster={this.state.roster} onAthleteClick={this.onAthleteClick} />
          <BoatAndWork athletes={this.state.athletes} onDragOver={this.onDragOver} />
          <BoatAndWork athletes={this.state.athletes} onDragOver={this.onDragOver} />
        </ContentWrapper>
      </PageWrapper>
    )
  }
}

export default App;