import React, {Component} from "react";
import {getData, getId} from "../../util/Socket";
import {Button, Col, Image, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import './game-style.css';
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
            stack: {},
            userTurn: {}
        };
        console.log("constructor");
        getData((err, data) => this.setState({
            loading: false,
            name: data.name,
            playing: data.playing,
            users: data.users,
            deck: data.deck,
            stack: data.stack,
            userTurn: data.userTurn
        }));
    }

    getUser() {
        for (let i = 0; i < this.state.users.length; ++i) {
            if (this.state.users[i].user === getId()) {
                return this.state.users[i];
            }
        }
    }

    getOtherUsers(userid, count, position) {
        switch (position) {
            case 'oben':
                switch (count) {
                    case 2:
                        for (let i = 0; i < this.state.users.length; ++i) {
                            if (this.state.users[i].id !== userid) {
                                return this.state.users[i];
                            }
                        }
                    case 3:
                        let index3 = userid + 1;
                        if (index3 === 3) {
                            index3 = 0;
                        }
                        for (let i = 0; i < this.state.users.length; ++i) {
                            if (this.state.users[i].id === index3) {
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
                                return this.state.users[i];
                            }
                        }
                }
        }
    }

    getCards() {
        for (let i = 0; i < this.state.users.length; ++i) {
            if (this.state.users[i].user === getId()) {
                return this.state.users[i]['cards'];
            }
        }
    }

    render() {
        const count = this.state.users.length;
        if (!this.state.loading) {
            return (
                <div className="background-game" style={{height: window.innerHeight}}>
                    <Row>
                        <Col lg={3}/>
                        <Col style={{textAlign: 'center', margin: '2em 0'}}>
                            {/* Opponent 1*/}
                            {count >= 2 && this.state.userTurn === this.getOtherUsers(this.getUser().id, count, 'oben').id &&
                            <AvatarActive name={this.getOtherUsers(this.getUser().id, count, 'oben').username}/>}
                            {count >= 2 && this.state.userTurn !== this.getOtherUsers(this.getUser().id, count, 'oben').id &&
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
                            {count >= 3 && this.state.userTurn === this.getOtherUsers(this.getUser().id, count, 'links').id &&
                            <AvatarActive name={this.getOtherUsers(this.getUser().id, count, 'links').username}/>}
                            {count >= 3 && this.state.userTurn !== this.getOtherUsers(this.getUser().id, count, 'links').id &&
                            <Avatar name={this.getOtherUsers(this.getUser().id, count, 'links').username}/>}
                            {count >= 3 && <CardsBack
                                className="cardDeck"
                                style={{display: 'block'}}
                                count={this.getOtherUsers(this.getUser().id, count, 'links')['cards'].length}/>}
                        </Col>
                        <Col lg={3} style={{marginTop: '2em', marginBottom: '3em', textAlign: 'right'}}>
                            <CardsFront
                                deck={Array.of(this.state.stack)}
                                isDisabled={this.state.userTurn === this.getUser().id}
                            />
                        </Col>
                        <Col lg={3} style={{marginTop: '2em', marginBottom: '3em', textAlign: 'left'}}>
                            <Deck/>
                        </Col>
                        <Col lg="3">
                            {/* Opponent 3 */}
                            {count >= 4 && this.state.userTurn === this.getOtherUsers(this.getUser().id, count, 'rechts').id &&
                            <AvatarActive name={this.getOtherUsers(this.getUser().id, count, 'rechts').username}/>}
                            {count >= 4 && this.state.userTurn !== this.getOtherUsers(this.getUser().id, count, 'rechts').id &&
                            <Avatar name={this.getOtherUsers(this.getUser().id, count, 'rechts').username}/>}
                            {count >= 4 && <CardsBack
                                className="cardDeck"
                                style={{display: 'block'}}
                                count={this.getOtherUsers(this.getUser().id, count, 'rechts')['cards'].length}/>}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3"/>
                        <Col style={{textAlign: 'center'}}>
                            {this.state.userTurn === this.getUser().id &&
                            <AvatarActive name={this.getUser().username}/>}
                            {this.state.userTurn !== this.getUser().id && <Avatar name={this.getUser().username}/>}
                            <CardsFront
                                className="cardDeck"
                                deck={this.getCards()}
                                isDisabled={this.state.userTurn !== this.getUser().id}
                            />
                            <button className="alignBottom uno-button">UNO!</button>
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
            <Image src="https://img.icons8.com/material-sharp/64/000000/user.png"
                   alt="User Icon"/>
            <p style={{marginBottom: '0'}}>{name}</p>
        </div>;

const
    AvatarActive = ({name}) =>
        <div className="avatar alignBottom">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 width="64" height="64"
                 viewBox="0 0 172 172"
                 style={{fill: '#000000'}}>
                <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt"
                   strokeLinejoin="miter"
                   strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none"
                   fontWeight="none"
                   fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}>
                    <path d="M0,172v-172h172v172z" fill="none"/>
                    <g fill="#ff1700">
                        <path
                            d="M86,21.5c-15.83216,0 -28.66667,12.8345 -28.66667,28.66667c0,15.83216 12.8345,28.66667 28.66667,28.66667c15.83216,0 28.66667,-12.8345 28.66667,-28.66667c0,-15.83216 -12.8345,-28.66667 -28.66667,-28.66667zM86,100.33333c-21.52867,0 -64.5,10.80733 -64.5,32.25v17.91667h129v-17.91667c0,-21.44267 -42.97133,-32.25 -64.5,-32.25z"/>
                    </g>
                </g>
            </svg>
            <p style={{marginBottom: '0'}}>>{name}</p>
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