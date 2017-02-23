import React, { Component } from 'react';
import { ButtonToolbar, Row, Col, Pager, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import ApiManager from '../services/apiManager.js'
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class FightPage extends Component {
    constructor() {
        super();
        this.apiManager = new ApiManager();
        this.state = {
            players: [],
            currentUserId: -1,
        };
        this.apiManager.askIdNotification(this);
        this.apiManager.getPlayerList().then((players) => {
            this.setState({ players: players });
        });
    }

    

    render() {
        return (
            <Row>
                <Col xs={8} xsOffset={2}>
                 <p>{this.state.currentUserId === -1 && 'Loading...'}</p>
                    <ListGroup>
                        {this.state.currentUserId != -1 && this.state.players.map((object, i) => {
                            console.log(this.state.currentUserId);
                            if (object.id != this.state.currentUserId)
                                return <PlayerDisplay parent={this} name={object.name} id={object.id} />;
                        })}
                    </ListGroup>
                </Col>
            </Row>
        )
    }
}

class PlayerDisplay extends Component {
    constructor() {
        super();
        this.launchFight = this.launchFight.bind(this);
    }
    launchFight() {
        console.log("Launching fight against : "+this.props.id);
        browserHistory.push('/fight/result/'+this.props.id);
    }

    render() {
        return (
            <ListGroupItem>

                <ButtonToolbar >
                    <strong>{this.props.name}</strong>
                        <Button disable={this.props.locked} onClick={this.launchFight} bsStyle="primary" className="pull-right">Fight !
                        </Button>
                </ButtonToolbar >
            </ListGroupItem>

        )
    }
}

export default FightPage;