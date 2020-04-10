import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import "./home-style.css";
import "../../global-style.css";
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
            <div className="background row" style={{height: window.innerHeight}}>
                <div className="col-md-6 center-horizontal-vertical">
                    <p className="home-uno">UNO</p>
                </div>
                <div className="col-md-6 center-horizontal-vertical">
                    <Button onClick={() => this.setState({createLobbyModalShow: true})} variant="dark"
                            size="lg"
                            active style={{display: 'block', width: '50%'}}>
                        Lobby erstellen
                    </Button>
                    <CreateLobbyModal
                        show={this.state.createLobbyModalShow}
                        onHide={createLobbyModalClose}
                    />
                    < br/>
                    <Button onClick={() => this.setState({joinLobbyModalShow: true})} variant="dark"
                            size="lg"
                            active
                            style={{display: 'block', width: '50%'}}>
                        Lobby beitreten
                    </Button>
                    <JoinLobbyModal
                        show={this.state.joinLobbyModalShow}
                        onHide={joinLobbyModalClose}
                    />
                </div>
            </div>
        );
    }
}

export default Home;