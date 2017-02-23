import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, FormGroup, FormControl, CollapsibleNav } from 'react-bootstrap';
import ApiManager from '../services/apiManager.js'
import { Link } from 'react-router';
import Notifications, {notify} from 'react-notify-toast'; 

class CustomNavBar extends Component {
    constructor() {
        super();
        this.apiManager = new ApiManager();
        this.apiManager.askLoginNotifications(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logOut = this.logOut.bind(this);
        this.state = {
            username: '',
            password: '',
            loggingIn: false,
            loggedIn: false,
            ready: false,
        };
    }
    

    spinnerStyle = {
        height: '17px',
        marginRight: '10px',
    };

    logIn(username, password) {
        console.log("Logging in");
        this.apiManager.login(username, password)
            .then((value) => notify.show('Logged in!', 'success'))
            .catch((value) => notify.show('Bad credentials!', 'error'));
    }

    handleSubmit(event) {
        this.setState({ loggingin: true });
        console.log("Submit event : (" + this.state.username + ', ' + this.state.password + ')');
        event.preventDefault();

        this.apiManager.login(this.state.username, this.state.password).then((value) => {
            console.log("Logged in !");
            notify.show('Logged in!', 'success', 1000);
            this.setState({ loggingIn: false });
            this.setState({ loggedIn: true });
        })
            .catch((value => {
                console.log("Error");
                console.dir(value);
                this.setState({ loggingIn: false });
                notify.show('Bad credentials!', 'error', 1600);
            }));
    }

    setValue(field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    }

    logOut() {
        this.apiManager.logOut().then(() => {
            console.log("Effectively logged out");
        });
        this.setState({ loggingIn: false });
        this.setState({ loggedIn: false });
    }

    render() {
        return (
            <Navbar>
                <Notifications/>
                <Navbar.Header>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Navbar.Brand>
                            Tron Coding Game
                        </Navbar.Brand>
                    </Link>

                </Navbar.Header>
                <Nav>
                    {!this.state.loggedIn && (<NavItem>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            Sign up
                        </Link>
                    </NavItem>)}
                    <NavItem>
                        <Link to="/about" style={{ textDecoration: 'none' }}>
                            About
                        </Link>
                    </NavItem>

                </Nav>

                <Nav pullRight>
                    <Navbar.Collapse>
                        {this.state.loggedIn && this.state.ready && (
                            <Nav>
                                <NavItem>
                                    <Link to="/ide" style={{ textDecoration: 'none' }}>
                                        IDE
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/fight" style={{ textDecoration: 'none' }}>
                                        Fight
                                    </Link>
                                </NavItem>
                                <NavItem eventKey={1} href="#">Profile</NavItem>
                                <Navbar.Text>
                                    <strong>|</strong>
                                </Navbar.Text>
                                <Navbar.Text>
                                    Logged in as
                                    <strong>
                                        {' ' + this.state.username}
                                    </strong>
                                </Navbar.Text>


                                <Navbar.Form pullRight >

                                    <Button onClick={this.logOut} bsStyle="warning">
                                        Log Out
                                    </Button>

                                </Navbar.Form >

                            </Nav>
                        )}
                        {!this.state.loggedIn && this.state.ready && (
                                <form onSubmit={this.handleSubmit}>
                                    <Navbar.Form pullRight onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <FormControl type="text" placeholder="Username" value={this.state.username} onChange={this.setValue.bind(this, 'username')} />
                                            {' '}
                                            <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.setValue.bind(this, 'password')} />
                                        </FormGroup>
                                        {' '}
                                        <Button type="submit" disabled={this.state.loggingIn} >
                                            {this.state.loggingIn ? <img style={this.spinnerStyle} src="images/loading_spinner.gif" /> : <img style={this.spinnerStyle} src="images/login-icon.png" />}
                                            Log In !
                                        </Button>

                                    </Navbar.Form >
                                </form>
                            )}
                        

                    </Navbar.Collapse>
                </Nav>
            </Navbar>
        )
    }
}

export default CustomNavBar;