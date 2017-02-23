import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/theme.min.css';
import { Router, Route, Switch, Link, browserHistory } from 'react-router';
import AboutPage from './components/about.js';
import SignUpPage from './components/signup.js';
import IDEPage from './components/ide.js';
import FightPage from './components/fight.js';
import FightResultPage from './components/fightResult.js';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='about' component={AboutPage} />
      <Route path='signup' component={SignUpPage} />
      <Route path='ide' component={IDEPage} />
      <Route path='fight' component={FightPage}/>
      <Route path="fight/result/:id" component={FightResultPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);


