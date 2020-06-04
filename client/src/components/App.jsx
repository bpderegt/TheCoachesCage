import React from 'react';
import styled from 'styled-components';
import Roster from './roster/Roster.jsx';
const axios = require('axios');


const PageWrapper = styled.div`
  font-family: 'Lato', sans-serif;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props: ''
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <PageWrapper>
        <h2>THE CAGE ABIDES</h2>
        <Roster />
      </PageWrapper>
    )
  }
}

export default App;