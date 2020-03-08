import React, {Component} from 'react';
import logo from '../../logo.svg';
import {Button} from "react-bootstrap";
import CreateLobbyModal from '../Modal/CreateLobbyModal';
import JoinLobbyModal from "../Modal/JoinLobbyModal";

class Home extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false
        };
    }

    render() {
        let createLobbyModalClose = () => this.setState({createLobbyModalShow: false});
        let joinLobbyModalClose = () => this.setState({joinLobbyModalShow: false});

        return (
            <div>
                <div style={{width: '100vh', height: '80vh', margin: '0 auto', padding: '10%'}}>
                    <div style={{
                        display: 'inline-block',
                        float: 'left',
                        width: '50%',
                        height: '100%',
                        backgroundColor: 'red'
                    }}>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </div>
                    <div style={{
                        display: 'inline-block',
                        margin: '0 auto',
                        padding: '3px',
                        float: 'right',
                        width: '50%',
                        height: '100%',
                        backgroundColor: 'blue'
                    }}>
                        <Button onClick={() => this.setState({createLobbyModalShow: true})} variant="secondary"
                                size="lg"
                                active style={{display: 'block'}}>
                            Lobby erstellen
                        </Button>
                        <CreateLobbyModal
                            show={this.state.createLobbyModalShow}
                            onHide={createLobbyModalClose}
                        />
                        < br/>
                        <Button onClick={() => this.setState({joinLobbyModalShow: true})} variant="secondary"
                                size="lg"
                                active
                                style={{display: 'block'}}>
                            Lobby beitreten
                        </Button>
                        <JoinLobbyModal
                            show={this.state.joinLobbyModalShow}
                            onHide={joinLobbyModalClose}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;