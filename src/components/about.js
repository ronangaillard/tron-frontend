import React, { Component } from 'react';
import {Row, Col, Pager} from 'react-bootstrap';

class AboutPage extends Component {

    render() {
        return (
            <Pager>
  
  
                    <h1> Welcome to the Tron Coding Game</h1>
                    <h2>A project made for the Serious Game course @Supelec</h2>
                    <br/>
                    <p>The game was designed by Robin Labat and Ronan Gaillard</p>
                    <p>The front-end is built with <i>React</i>.</p>
                    <p>The back-end is made with Python using the <i>Flask</i> framework.</p>
                
            </Pager>

        )
    }
}

export default AboutPage;