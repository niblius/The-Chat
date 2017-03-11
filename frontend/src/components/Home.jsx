import React, { Component } from 'react';
import { Divider } from 'semantic-ui-react'

import ChatSearch from './ChatSearch.jsx';

class Home extends Component {
  render() {
    return (
      <div>
        <Divider />
        <ChatSearch {...this.props} />
      </div>
    );
  }
}

export default Home;
