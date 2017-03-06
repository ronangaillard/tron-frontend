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
import { browserHistory } from 'react-router';

var htmlContent = `

<div class="template">
  <div class="template-wrap clear">
    <canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault()" height="600px" width="960px"></canvas>
  </div>
</div>`;

class FightResultPage extends Component {
    constructor(props) {
        super(props);
        this.apiManager = new ApiManager();
        this.state = {
            fightMoves: '',
        };

        this.showHelp = this.showHelp.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setUnityVariables = this.setUnityVariables.bind(this);

        this.apiManager.launchFight(this, this.props.params.id).then((result) => {
            this.setState({fightMoves: JSON.stringify(result)});
            this.setState({winner : this.state.fightMoves.winner});
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

    componentDidMount () {
        /*fetch('/Release/UnityLoader.js').then((result) => {
            console.log(result);
            window.eval(result);
        });*/

        const script = document.createElement("script");

        script.src = "/Release/UnityLoader.js";
        script.async = true;

        document.body.appendChild(script);

        
        var intervalId = setInterval(this.setUnityVariables, 1000);
        this.setState({intervalId: intervalId});
    }


    setUnityVariables(){
        if(window.SendMessage) {

            let result = window.SendMessage("Main", "init", JSON.stringify(this.state.fightMoves));
            console.log('Setting variables', JSON.stringify(this.state.fightMoves));
            clearInterval(this.state.intervalId);
        }
        else
            console.log('Waiting... for unity');
   

    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
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
                    <h3>{this.state.winner == 1 ? 'You are the winner !' : 'You lost... :('}</h3>
                    <p>{!this.state.fightMoves && 'Loading...'}</p>
                    
                    <div dangerouslySetInnerHTML={ {__html: htmlContent} } />
                    
                
            </Pager>
            </div>
        )
    }
}

export default FightResultPage;