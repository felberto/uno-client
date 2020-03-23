import React, {Component} from "react";
import socketInstance from "../../util/Socket";
import {Button, Col, Image, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import '../../game-style.css';
import CardsFront from './CardsFront';
import CardsBack from "./CardsBack";

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            name: {},
            playing: {},
            users: [],
            deck: [],
            ownUser: {},
        };
    }

    componentDidMount() {
        socketInstance.socket.emit('getRoomData');
        socketInstance.socket.on('roomData', (data) => {
            this.setState({
                loading: false,
                name: data.name,
                playing: data.playing,
                users: data.users,
                deck: data.deck
            });
            console.log(data);
        });
        console.log(socketInstance.socket.id);
    }

    getUser() {
        for (let i = 0; i < this.state.users.length; ++i) {
            if (this.state.users[i].user === socketInstance.socket.id) {
                return this.state.users[i].username;
            }
        }
    }

    getOtherUsers() {
        return this.state.users.filter(item => item.user !== socketInstance.socket.id);
    }

    getCards() {
        for (let i = 0; i < this.state.users.length; ++i) {
            if (this.state.users[i].user === socketInstance.socket.id) {
                console.log(this.state.users[i]);
                console.log(this.state.users[i]['cards'].length);
                console.log(this.state.users[i]['cards']);
                return this.state.users[i]['cards'];
            }
        }
    }

    render() {
        console.log(this.state.loading);
        const count = this.state.users.length;
        if (!this.state.loading) {
            return (
                <div className="background-red">
                    <Row>
                        <Col lg={2}/>
                        <Col>
                            {/* Opponent 1*/}
                            {count >= 2 && <Avatar name={this.getOtherUsers()[0].username}/>}
                            {count >= 2 && <CardsBack
                                className="cardDeck"
                                count={this.getOtherUsers()[0]['cards'].length}/>}
                        </Col>
                        <Col lg={2}>
                            {/*Todo: Spiel beenden?
                            <Button variant="dark" onClick={this.leaveLobby}>Lobby verlassen</Button>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3">
                            {/* Opponent 2 */}
                            {count >= 3 && <Avatar name={this.getOtherUsers()[1].username}/>}
                            {count >= 3 && <CardsBack
                                className="cardDeck"
                                style={{display: 'block'}}
                                count={this.getOtherUsers()[1]['cards'].length}/>}
                        </Col>
                        <Col>
                            {/* Todo: Deck here */}
                            <p>Stapel und Ablagestapel hier</p>
                        </Col>
                        <Col lg="3">
                            {/* Opponent 3 */}
                            {count >= 4 && <Avatar name={this.getOtherUsers()[2].username}/>}
                            {count >= 4 && <CardsBack
                                className="cardDeck"
                                style={{display: 'block'}}
                                count={this.getOtherUsers()[2]['cards'].length}/>}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="2"/>
                        <Col>
                            <Avatar name={this.getUser()}/>
                            <CardsFront
                                className="cardDeck"
                                deck={this.getCards()}
                            />
                            <Button variant="danger">UNO!</Button>
                        </Col>
                        <Col lg="2"/>
                    </Row>
                </div>
            )
        } else {
            return (<div>Loading...</div>)
        }

    }
}

const Avatar = ({name}) =>
    <div className="avatar">
        <Image src="https://img.icons8.com/material-sharp/48/000000/user.png"
               alt="Betnutzer Icon"/>
        <p>{name}</p>
    </div>;

export default withRouter(Game);