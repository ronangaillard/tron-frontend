import React, { Component } from 'react';
import { Panel, ButtonToolbar, Button, Row, Col, Pager } from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';
import ApiManager from '../services/apiManager.js';
import Notifications, { notify } from 'react-notify-toast';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

import 'brace/mode/lua';
import 'brace/theme/monokai';

class IDEPage extends Component {
    constructor() {
        super();
        this.apiManager = new ApiManager();
        this.save = this.save.bind(this);
        this.loadServerCode = this.loadServerCode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            ideCode: '',
            loadingCode: true,
            saving: false,
            fileState: 'Loading...',
            modalVisible: false,
        };
        this.loadServerCode();
        this.showHelp = this.showHelp.bind(this);

    }

    spinnerStyle = {
        height: '17px',
        marginRight: '10px',
    };


    editorStyle = {
        width: '100%',
    };

    onChange(newValue) {

        this.setState({ ideCode: newValue });
    }

    save() {
        console.log(this.state.ideCode);
        this.setState({ saving: true });
        this.setState({ fileState: 'Saving...' });

        this.apiManager.saveIACode(this.state.ideCode).then(() => {
            console.log("Saved!");
            this.setState({ saving: false });
            this.setState({ fileState: '' });
            notify.show('Saved!', 'success', 1000);
        }).catch((info) => {
            console.log("Error while saving " + info);
            this.setState({ saving: false });
            this.setState({ fileState: '' });
            notify.show('Error while saving...', 'error', 1000);
        })
    }

    loadServerCode() {
        this.setState({ loadingCode: true });
        this.setState({ fileState: 'Loading...' });

        this.apiManager.getIACode().then((value) => {
            console.log("Got code : " + value);
            this.setState({ loadingCode: false });
            this.setState({ ideCode: value });
            this.setState({ fileState: '' });
            notify.show('Code loaded!', 'success', 1300);
        })
            .catch((value) => {
                console.log("Unable to get code");
                notify.show('Unable to load code...', 'error', 4000);
                console.dir(value);
            })
    }

    showHelp() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }
    modalStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
        }
    };

    render() {

        return (
            <div>
                <Modal isOpen={this.state.modalVisible} onRequestHide={this.closeModal}>
                    <ModalHeader>
                        <ModalClose onClick={this.closeModal} />
                        <ModalTitle>Help - Tron API</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <p>You have to code your IA using LUA.</p>

                        <p>You code has to be in a function like this : <i>function move(walls, pos_x, pos_y, direction)</i></p>

                        <p><strong>walls</strong> : is an array containing all the walls in the grid</p>
                        <p><strong>pos_x</strong> : position of your motorcycle along the x axis (West-East axis)</p>
                        <p><strong>pos_y</strong> : position of your motorcycle along the y axis (South-North axis)</p>
                        <p><strong>direction</strong> : direction of your motorcycle ('N' for North, 'S' for South, 'W' for West and 'E' for East)</p>

                        <p>The Grid is 21x21</p>

                        <p>Your move function has to return the next direction of your motorcycle ('N' for North, 'S' for South, 'W' for West and 'E' for East) and will be run at each turn.</p>
                    </ModalBody>
                   
                </Modal>
                <Notifications />
                <Row >
                    <Col xs={2} md={2}></Col>
                    <Col xs={8} md={8}>


                        <ButtonToolbar >
                            {this.state.fileState !== '' &&
                                (<Button disabled='true' ><img style={this.spinnerStyle} src="images/loading_spinner.gif" /> {this.state.fileState} </Button>)}
                            <Button className="pull-right" bsStyle="success" disabled={this.state.loadingCode || this.state.saving} onClick={this.save}>
                                Save
                        </Button>
                            <Button className="pull-right" bsStyle="danger" disabled={this.state.loadingCode || this.state.saving} onClick={this.loadServerCode}>
                                Undo All
                        </Button>
                            <Button className="pull-right" bsStyle="info" onClick={this.showHelp}>
                                Help
                        </Button>
                        </ButtonToolbar>
                        <br />
                    </Col>
                </Row>
                <Row >
                    <Col xs={2} md={2}></Col>
                    <Col xs={8} md={8}>
                        <AceEditor
                            style={this.editorStyle}
                            mode="lua"
                            theme="monokai"
                            onChange={this.onChange}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                            value={this.state.ideCode}
                            readOnly={this.state.loadingCode}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default IDEPage;