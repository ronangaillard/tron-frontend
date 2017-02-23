import React, { Component } from 'react';
import {Panel, ButtonToolbar, Button, Row, Col, Pager} from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';
import ApiManager from '../services/apiManager.js';
import Notifications, {notify} from 'react-notify-toast'; 

import 'brace/mode/lua';
import 'brace/theme/monokai';

class IDEPage extends Component {
    constructor(){
        super();
        this.apiManager = new ApiManager();
        this.save = this.save.bind(this);
        this.loadServerCode = this.loadServerCode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            ideCode: '',
            loadingCode: true,
            saving: false,
            fileState: 'Loading...',
        };
        this.loadServerCode();
        
    }

    spinnerStyle = {
        height: '17px',
        marginRight: '10px',
    };


    editorStyle = {
        width: '100%',
    };

    onChange(newValue) {
    
        this.setState({ideCode: newValue});
    }

    save(){
        console.log(this.state.ideCode);
        this.setState({saving: true});
        this.setState({fileState: 'Saving...'});

        this.apiManager.saveIACode(this.state.ideCode).then(() => {
            console.log("Saved!");
            this.setState({saving: false});
            this.setState({fileState: ''});
            notify.show('Saved!', 'success', 1000);
        }).catch((info) => {
            console.log("Error while saving " + info);
            this.setState({saving: false});
            this.setState({fileState: ''});
            notify.show('Error while saving...', 'error', 1000);
        })
    }

    loadServerCode(){
        this.setState({loadingCode: true});
        this.setState({fileState: 'Loading...'});

        this.apiManager.getIACode().then((value) => {
            console.log("Got code : "+ value);
            this.setState({loadingCode: false});
            this.setState({ideCode: value});
            this.setState({fileState: ''});
            notify.show('Code loaded!', 'success', 1300);
        })
        .catch((value) => {
            console.log("Unable to get code");
            notify.show('Unable to load code...', 'error', 4000);
            console.dir(value);
        })
    }

    render() {
        
        return (
        <div>
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
                    </ButtonToolbar>
                    <br/>
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
                        editorProps={{$blockScrolling: true}}
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