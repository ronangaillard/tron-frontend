import React, { Component } from 'react';
import {Row, Col, Pager} from 'react-bootstrap';
import ApiManager from '../services/apiManager.js'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

class FightResultPage extends Component {
    constructor(props) {
        super(props);
        this.apiManager = new ApiManager();
        this.state = {
            fightMoves: '',
        };

        this.showHelp = this.showHelp.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.apiManager.launchFight(this, this.props.params.id).then((result) => {
            this.setState({fightMoves: JSON.stringify(result)});
            console.log("result of fight ");
            console.dir(result);
        }, (error) => {
            console.log('Error ', error.info);
            this.setState({errorText: 'Error : ' + error.info + '(' + error.errorText + ')'});
            this.showHelp();

        });
       
    }

    showHelp() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    render() {
        return (
            <div>
             <Modal isOpen={this.state.modalVisible} onRequestHide={this.closeModal}>
                    <ModalHeader>
                        <ModalClose onClick={this.closeModal} />
                        <ModalTitle>Error</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <p>{this.state.errorText}</p>

                        
                    </ModalBody>
                   
                </Modal>
            <Pager>
            
  
  
                    <h1> Fight Results</h1>
                    <p>Moves as JSON : </p>
                    <p>{!this.state.fightMoves && 'Loading...'}</p>
                    <p>{this.state.fightMoves}</p>
                    
                
            </Pager>
            </div>
        )
    }
}

export default FightResultPage;