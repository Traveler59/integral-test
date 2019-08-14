// @flow
import React from 'react';
import { connect } from 'react-redux';

import Tasks from '../components/Tasks';

class App extends React.Component<{}, {}> {
  render() {
    return <div>
      <Tasks />
    </div>;
  }
}

export default connect<*, *, *, *, *, *>((state) => ({ state }), {})(App);
