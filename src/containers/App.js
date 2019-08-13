import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tasks from '../components/Tasks';

class App extends Component {
  render() {
    return <div>
      <Tasks />
    </div>;
  }
}

export default connect((state) => ({}), {})(App);
