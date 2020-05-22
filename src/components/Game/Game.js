import React, {Component} from "react";
import {cancelGame, clickUno, finishGame, getCard, getData, getId} from "../../util/Socket";
import {Col, Image, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import './game-style.css';
import CardsFront from './CardsFront';
import CardsBack from "./CardsBack";
import {ReactComponent as ActiveAvatar} from "../../resources/svg/avatarActiveIcon.svg";

class Game extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: true,
            name: {},
            playing: {},
            users: [],
            deck: [],
            stack: {},
            userTurn: {},
            ranking: []
        };
        getData((err, data) => this.setState({
            loading: false,
            name: data.name,
            playing: data.playing,
            users: data.users,
            deck: data.deck,
            stack: data.stack,
            userTurn: data.userTurn,
            ranking: data.ranking
        }));
        finishGame((err, data) => this.finishGameFunction());
        cancelGame((err, data) => this.cancelGameFunction());
    }

    finishGameFunction() {
        this.props.history.push('/lobby');
    }

    cancelGameFunction() {
        this.props.history.push('/lobby');
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
                        break;
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
                        break;
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
                        break;
                    default:
                        break;
                }
                break;
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
                break;
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
                        break;
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
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    getCards() {
        for (let i = 0; i < this.state.users.length; ++i) {
            if (this.state.users[i].user === getId()) {
                return this.state.users[i]['cards'];
            }
        }
    }

    unoClickedHandler() {
        clickUno();
    }

    componentDidUpdate() {
        let user;
        for (let i = 0; i < this.state.users.length; ++i) {
            if (this.state.users[i].id === this.state.userTurn) {
                user = this.state.users[i];
            }
        }

        if (user.user === 'bot') {
            fetch('http://localhost:8000/api/playBot', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    room: this.state.name
                })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch(console.log)
        }

    }

    render() {
        const count = this.state.users.length;
        if (!this.state.loading) {
            return (
                <div className="background-game" style={{height: window.innerHeight}}>
                    <Row>
                        <Col lg={3}/>
                        <Col style={{textAlign: 'center', margin: '1em 0'}}>
                            {/* Opponent 1*/}
                            {count >= 2 && this.state.userTurn === this.getOtherUsers(this.getUser().id, count, 'oben').id &&
                            <AvatarActive name={this.getOtherUsers(this.getUser().id, count, 'oben').username}
                                          uno={this.getOtherUsers(this.getUser().id, count, 'oben').uno}/>}
                            {count >= 2 && this.state.userTurn !== this.getOtherUsers(this.getUser().id, count, 'oben').id &&
                            <Avatar name={this.getOtherUsers(this.getUser().id, count, 'oben').username}
                                    uno={this.getOtherUsers(this.getUser().id, count, 'oben').uno}/>}
                            {count >= 2 && <CardsBack
                                style={{textAlign: 'center'}}
                                className="cardDeckBack"
                                count={this.getOtherUsers(this.getUser().id, count, 'oben')['cards'].length}/>}
                        </Col>
                        <Col lg={3}/>
                    </Row>
                    <Row>
                        <Col lg="3">
                            {/* Opponent 2 */}
                            {count >= 3 && this.state.userTurn === this.getOtherUsers(this.getUser().id, count, 'links').id &&
                            <AvatarActive name={this.getOtherUsers(this.getUser().id, count, 'links').username}
                                          uno={this.getOtherUsers(this.getUser().id, count, 'links').uno}/>}
                            {count >= 3 && this.state.userTurn !== this.getOtherUsers(this.getUser().id, count, 'links').id &&
                            <Avatar name={this.getOtherUsers(this.getUser().id, count, 'links').username}
                                    uno={this.getOtherUsers(this.getUser().id, count, 'links').uno}/>}
                            {count >= 3 && <CardsBack
                                className="cardDeckBack"
                                style={{display: 'block'}}
                                count={this.getOtherUsers(this.getUser().id, count, 'links')['cards'].length}/>}
                        </Col>
                        <Col sm={3} style={{marginTop: '2em', marginBottom: '3em', textAlign: 'right'}}>
                            <CardsFront
                                deck={Array.of(this.state.stack)}
                                isDisabled={true}
                                cssClass={"storagePile"}
                            />
                        </Col>
                        <Col sm={3} style={{marginTop: '2em', marginBottom: '3em', textAlign: 'left'}}>
                            <Deck
                                isDisabled={this.state.userTurn !== this.getUser().id}
                            />
                        </Col>
                        <Col lg="3">
                            {/* Opponent 3 */}
                            {count >= 4 && this.state.userTurn === this.getOtherUsers(this.getUser().id, count, 'rechts').id &&
                            <AvatarActive name={this.getOtherUsers(this.getUser().id, count, 'rechts').username}
                                          uno={this.getOtherUsers(this.getUser().id, count, 'rechts').uno}/>}
                            {count >= 4 && this.state.userTurn !== this.getOtherUsers(this.getUser().id, count, 'rechts').id &&
                            <Avatar name={this.getOtherUsers(this.getUser().id, count, 'rechts').username}
                                    uno={this.getOtherUsers(this.getUser().id, count, 'rechts').uno}/>}
                            {count >= 4 && <CardsBack
                                className="cardDeckBack"
                                style={{display: 'block'}}
                                count={this.getOtherUsers(this.getUser().id, count, 'rechts')['cards'].length}/>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="3" style={{textAlign: 'center'}}>
                            <div className="alignBottomDiv">
                                {this.state.userTurn === this.getUser().id &&
                                <AvatarActive name={this.getUser().username} uno={this.getUser().uno}/>}
                                {this.state.userTurn !== this.getUser().id &&
                                <Avatar name={this.getUser().username} uno={this.getUser().uno}/>}
                            </div>
                        </Col>
                        <Col style={{textAlign: 'center'}}>
                            <CardsFront
                                deck={this.getCards()}
                                isDisabled={this.state.userTurn !== this.getUser().id}
                                cssClass={"cardDeck"}
                            />
                        </Col>
                        <Col sm="3">
                            <div className="alignBottomDiv">
                                {!this.getUser().finished && <button className="uno-button"
                                                                     onClick={() => this.unoClickedHandler()}>UNO!</button>}
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return (<div>Loading...</div>)
        }
    }
}

const
    Avatar = ({name, uno}) =>
        <div className="avatar alignBottom">
            <Image src="https://img.icons8.com/material-sharp/64/000000/user.png"
                   alt="User Icon"/>
            <p style={{marginBottom: '0'}}>{name}</p>
            {console.log(uno)}
            {uno && <p className="uno">UNO</p>}
        </div>;

const
    AvatarActive = ({name, uno}) =>
        <div className="avatar alignBottom">
            <ActiveAvatar/>
            <p style={{marginBottom: '0'}}>{name}</p>
            {console.log(uno)}
            {uno && <p className="uno">UNO</p>}
        </div>;

const
    Deck = ({isDisabled}) => {
        return <div className="cardDeck">
            {!isDisabled && <button onClick={() => deckClickedHandler()} className="deck">
                <p>UNO</p>
            </button>}
            {isDisabled && <button style={{disabled: true}} className="deck">
                <p>UNO</p>
            </button>}
        </div>
    };

function deckClickedHandler() {
    getCard();
}

export default withRouter(Game);