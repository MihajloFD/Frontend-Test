import React, { Component } from 'react';
import '../styles/core.scss';

export default class App extends Component {
  render () {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
