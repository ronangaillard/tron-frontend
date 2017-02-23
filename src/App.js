import React, { Component } from 'react';
import { Router, Route, Switch, Link, browserHistory } from 'react-router'

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
        {this.props.children}
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
