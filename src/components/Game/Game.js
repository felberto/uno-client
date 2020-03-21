import React, {Component} from "react";
import socketInstance from "../../util/Socket";
import {Button, Col, Image, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import '../../game-style.css';
import CardDeck from './CardDeck';

// test variable for CardDeck
const list = [
    {"color": "red", "number": 0, "action": null},
    {"color": "green", "number": 3, "action": null},
    {"color": "blue", "number": 5, "action": null},
    {"color": "yellow", "number": 7, "action": null},
    // {"color": "red", "number": null, "action": "draw2" },
    // {"color": "green", "number": 7, "action": "suspend" },
    {"color": "blue", "number": null, "action": "return"},
    // {"color": "black", "number": null, "action": "draw4" },
    // {"color": "black", "number": null, "action": "changeColor" }
];

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {},
            playing: {},
            users: [],
            deck: []
        };
    }

    componentDidMount() {
        socketInstance.socket.emit('getRoomData');
        socketInstance.socket.on('roomData', (data) => {
            this.setState({
                name: data.name,
                playing: data.playing,
                users: data.users,
                deck: data.deck
            });
            console.log(data);
        });
    }

    render() {
        return (
            <div className="background-red">
                <Row>
                    <Col lg={2}/>
                    <Col>
                        <Avatar name="Player 1"/>
                    </Col>
                    <Col lg={2}>
                        {/*<Button variant="dark" onClick={this.leaveLobby}>Lobby verlassen</Button>*/}
                    </Col>
                </Row>
                <Row>
                    <Col lg="2">
                        <Avatar name="Player 2"/>
                    </Col>
                    <Col>

                    </Col>
                    <Col lg="2">
                        <Avatar name="Player 3"/>
                    </Col>
                </Row>
                <Row>
                    <Col lg="2"/>
                    <Col>
                        <Avatar name="Meli"/>
                        <CardDeck
                            className="cardDeck"
                            deck={list}
                        />
                        <Button variant="danger">UNO!</Button>
                    </Col>
                    <Col lg="2"/>
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