import React, { Component } from 'react';
import { Modal, Row, Col, Pager, FormGroup, FieldGroup, Checkbox, Radio, ControlLabel, HelpBlock, FormControl, Button } from 'react-bootstrap';
import ApiManager from '../services/apiManager.js'

class SignUpPage extends Component {
    constructor() {
        super();
        this.apiManager = new ApiManager();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showError = this.showError.bind(this);
        this.closeError = this.closeError.bind(this);
        this.apiManager = new ApiManager();
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            signingUp: false,
            showModal: false,
            errorText: 'Unknown error',
            modalTitle: 'Error',
        };
    }

    spinnerStyle = {
        height: '20px',
        marginRight: '10px',
    };

    showError(error) {
        this.setState({ errorText: error });
        this.setState({ showModal: true });
    }

    closeError() {
        this.setState({ showModal: false });
        this.setState({ signingUp: false });
    }

    handleSubmit(event) {
        this.setState({ signingUp: true });
        console.log("Submit event : (" + this.state.username + ', ' + this.state.password + ')');
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.showError("Confirm password and password are different !");
        }
        else{
            this.apiManager.signUp(this.state.username, this.state.password).then(() => {
                console.log("Signed up");
                this.setState({ modalTitle: 'Signed up !' });
                this.showError('You can now log in !');
            }).catch((value) => {
                this.showError(value);
                console.dir(value);
            })
        }
    }

    setValue(field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    }



    render() {
        return (

            <div>
                <Row className="show-grid">
                    <Col xs={6} md={4}></Col>
                    <Col xs={6} md={4}>


                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <ControlLabel>Username</ControlLabel>
                                <FormControl disabled={this.state.signingUp} type="text" label="Text" placeholder="Username" value={this.state.username} onChange={this.setValue.bind(this, 'username')} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Password</ControlLabel>
                                <FormControl disabled={this.state.signingUp} type="password" label="Text" placeholder="Password" value={this.state.password} onChange={this.setValue.bind(this, 'password')} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Confirm password</ControlLabel>
                                <FormControl disabled={this.state.signingUp} type="password" label="Text" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.setValue.bind(this, 'confirmPassword')} />
                            </FormGroup>

                            <Button type="submit" bsStyle="primary" block disabled={this.state.signingUp} >
                                {this.state.signingUp ? <img style={this.spinnerStyle} src="images/flickr_spinner.gif" /> : "Sign Up !"}
                            </Button>
                        </form>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.errorText}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeError}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}

export default SignUpPage;