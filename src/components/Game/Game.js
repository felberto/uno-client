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
            stack: {}
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
                deck: data.deck,
                stack: data.stack
            });
            console.log(data);
        });
        console.log(socketInstance.socket.id);
    }

    getUser() {
        for (let i = 0; i < this.state.users.length; ++i) {
            if (this.state.users[i].user === socketInstance.socket.id) {
                return this.state.users[i];
            }
        }
    }

    getOtherUsers(userid, count, position) {
        console.log(userid);
        console.log(count);
        console.log(position);

        switch (position) {
            case 'oben':
                switch (count) {
                    case 2:
                        for (let i = 0; i < this.state.users.length; ++i) {
                            if (this.state.users[i].id !== userid) {
                                console.log(this.state.users[i]);
                                return this.state.users[i];
                            }
                        }
                    case 3:
                        let index3 = userid + 1;
                        if (index3 === 2) {
                            index3 = 0;
                        }
                        for (let i = 0; i < this.state.users.length; ++i) {
                            if (this.state.users[i].id === index3) {
                                console.log(this.state.users[i]);
                                return this.state.users[i];
                            }
                        }
                    case 4:
                        let index4 = userid + 2;
                        if (index4 === 4) {
                            index4 = 0;
                        } else if (index4 === 5) {
                            index4 = 1;
                        }
                        for (let i = 0; i < this.state.users.length; ++i) {
                            if (this.state.users[i].id === index4) {
                                console.log(this.state.users[i]);
                                return this.state.users[i];
                            }
                        }
                }
            case 'rechts':
                let index = userid + 1;
                if (index === 4) {
                    index = 0;
                }
                for (let i = 0; i < this.state.users.length; ++i) {
                    if (this.state.users[i].id === index) {
                        console.log(this.state.users[i]);
                        return this.state.users[i];
                    }
                }
            case 'links':
                switch (count) {
                    case 3:
                        let index3 = userid + 2;
                        if (index3 === 3) {
                            index3 = 0;
                        } else if (index3 === 4) {
                            index3 = 1;
                        }
                        for (let i = 0; i < this.state.users.length; ++i) {
                            if (this.state.users[i].id === index3) {
                                console.log(this.state.users[i]);
                                return this.state.users[i];
                            }
                        }
                    case 4:
                        let index4 = userid + 3;
                        if (index4 === 4) {
                            index4 = 0;
                        } else if (index4 === 5) {
                            index4 = 1;
                        } else if (index4 === 6) {
                            index4 = 2;
                        }
                        for (let i = 0; i < this.state.users.length; ++i) {
                            if (this.state.users[i].id === index4) {
                                console.log(this.state.users[i]);
                                return this.state.users[i];
                            }
                        }
                }
            //return this.state.users.filter(item => item.user !== socketInstance.socket.id);
        }
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
                        <Col lg={3}/>
                        <Col style={{textAlign: 'center'}}>
                            {/* Opponent 1*/}
                            {count >= 2 &&
                            <Avatar name={this.getOtherUsers(this.getUser().id, count, 'oben').username}/>}
                            {count >= 2 && <CardsBack
                                style={{textAlign: 'center'}}
                                className="cardDeck"
                                count={this.getOtherUsers(this.getUser().id, count, 'oben')['cards'].length}/>}
                        </Col>
                        <Col lg={3}>
                            {/*Todo: Spiel beenden?
                            <Button variant="dark" onClick={this.leaveLobby}>Lobby verlassen</Button>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3">
                            {/* Opponent 2 */}
                            {count >= 3 &&
                            <Avatar name={this.getOtherUsers(this.getUser().id, count, 'rechts').username}/>}
                            {count >= 3 && <CardsBack
                                className="cardDeck"
                                style={{display: 'block'}}
                                count={this.getOtherUsers(this.getUser().id, count, 'rechts')['cards'].length}/>}
                        </Col>
                        <Col lg={3} style={{marginTop: '1em', marginBottom: '1em', textAlign: 'right'}}>
                            <CardsFront
                                deck={Array.of(this.state.stack)}
                                isDisabled={true}
                            />
                        </Col>
                        <Col lg={3} style={{marginTop: '1em', marginBottom: '1em', textAlign: 'left'}}>
                            <Deck/>
                        </Col>
                        <Col lg="3">
                            {/* Opponent 3 */}
                            {count >= 4 &&
                            <Avatar name={this.getOtherUsers(this.getUser().id, count, 'links').username}/>}
                            {count >= 4 && <CardsBack
                                className="cardDeck"
                                style={{display: 'block'}}
                                count={this.getOtherUsers(this.getUser().id, count, 'links')['cards'].length}/>}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3"/>
                        <Col style={{textAlign: 'center'}}>
                            <Avatar name={this.getUser().username}/>
                            <CardsFront
                                className="cardDeck"
                                deck={this.getCards()}
                                isDisabled={false}
                            />
                            <Button className="alignBottom" variant="danger">UNO!</Button>
                        </Col>
                        <Col lg="3"/>
                    </Row>
                </div>
            )
        } else {
            return (<div>Loading...</div>)
        }

    }
}

const
    Avatar = ({name}) =>
        <div className="avatar alignBottom">
            <Image src="https://img.icons8.com/material-sharp/48/000000/user.png"
                   alt="Betnutzer Icon"/>
            <p>{name}</p>
        </div>;

const
    Deck = () => {
        return <div className="cardDeck">
            <button className="deck">
                <p>UNO</p>
            </button>
        </div>
    };

export default withRouter(Game);