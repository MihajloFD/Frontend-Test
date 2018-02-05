import React, { Component } from 'react';
import './ErrorPage.scss';
import LOGO_IMAGE from '../../images/404.gif';

export default class ErrorPage extends Component {
  render () {
    return (
      <div style={{background: 'white'}}>
        <h1 className='display-1 text-center text-warning'>Ooops, something went wrong...</h1>
        <img
          className='mh-100 center-image'
          src={LOGO_IMAGE} />
      </div>
    );
  }
}
