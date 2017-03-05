import React, { Component } from 'react';
import { Router, Route, Switch, Link, browserHistory } from 'react-router'
import {Row, Col, Pager} from 'react-bootstrap';

import './App.css';
import CustomNavBar from './components/customNavBar.js'
import ApiManager from './services/apiManager.js'
import AboutPage from './components/about.js'

class App extends Component {
  generalStyle ={
    backgroundColor: '#1F1F1E'
  };

  render() {
    return (
     <div style={this.generalStyle}>
        <CustomNavBar />
        {this.props.children  || 
          <Pager>
            <h1>Tron IA Game</h1>
            <h3>Sign up, code and challenge other players !</h3>
            <br/>
            <img style={this.spinnerStyle} src="images/tron-moto.png" />
          </Pager>}
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div>
       <p>hello</p>
      </div>
    )
  }
}

export default App;
