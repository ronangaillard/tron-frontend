import React, { Component } from 'react';
import {Row, Col, Pager} from 'react-bootstrap';
import ApiManager from '../services/apiManager.js'

class FightResultPage extends Component {
    constructor(props) {
        super(props);
        this.apiManager = new ApiManager();
        this.state = {
            fightMoves: '',
        };

        this.apiManager.launchFight(this, this.props.params.id).then((result) => {
            this.setState({fightMoves: JSON.stringify(result)});
            console.log("result of fight ");
            console.dir(result);
        });
       
    }

    render() {
        return (
            <Pager>
  
  
                    <h1> Fight Results</h1>
                    <p>Moves as JSON : </p>
                    <p>{!this.state.fightMoves && 'Loading...'}</p>
                    <p>{this.state.fightMoves}</p>
                    
                
            </Pager>

        )
    }
}

export default FightResultPage;