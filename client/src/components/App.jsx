import React from 'react';
import styled from 'styled-components';
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
        THE CAGE ABIDES
      </PageWrapper>
    )
  }
}

export default App;