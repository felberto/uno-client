import React, {Component} from "react";
import socketInstance from "../../util/Socket";
import {Button, Col, Image, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import '../../game-style.css';
import CardDeck from './CardDeck';

// test variable for CardDeck
const list = [
    {"color": "red", "number": 0},
    {"color": "green", "number": 3},
    {"color": "blue", "number": 5},
    {"color": "yellow", "number": 7}
];

class Game extends Component {

    constructor(props) {
        super(props);
        this.leaveLobby = this.leaveLobby.bind(this);
    }

    leaveLobby() {
        if (socketInstance.socket.emit('leaveRoom')) {
            console.log('client: left game');
            this.props.history.push('/');
        } else {
            console.log('could not leave room');
            return false;
        }
    }

    render() {
        const cards = list;
        return (
            <div className="background-red">
                <Row>
                    <Col lg={2}></Col>
                    <Col>
                        <Avatar name="Player 1"/>
                    </Col>
                    <Col lg={2}></Col>
                </Row>
                <Row>
                    <Col lg="2">
                        <Avatar name="Player 2"></Avatar>
                    </Col>
                    <Col>

                    </Col>
                    <Col lg="2">
                        <Avatar name="Player 3"></Avatar>
                    </Col>
                </Row>
                <Row>
                    <Col lg="2"></Col>
                    <Col>
                        <Avatar name="Meli"></Avatar>
                        <CardDeck className="cardDeck" deck={cards}/>
                        <Button>UNO!</Button>
                    </Col>
                    <Col lg="2">
                        <Button onClick={this.leaveLobby}>Lobby verlassen</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

const Avatar = ({name}) =>
    <div className="avatar">
        <Image src="https://img.icons8.com/material-sharp/48/000000/user.png"
               alt="Betnutzer Icon"/>
        <p>{name}</p>
    </div>;

export default withRouter(Game);