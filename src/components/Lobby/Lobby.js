import React, {Component} from "react";
import {Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {clickStart, getData, leaveLobby, redirectStart} from "../../util/Socket";
import "../../global-style.css";
import "./lobby-style.css";

class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {},
            playing: {},
            users: [],
            deck: [],
            ranking: []
        };
        this.startGame = this.startGame.bind(this);
        this.leaveLobby = this.leaveLobby.bind(this);
        this.clickStart = this.clickStart.bind(this);

        getData((err, data) => this.setState({
            name: data.name,
            playing: data.playing,
            users: data.users,
            deck: data.deck,
            ranking: data.ranking
        }));

        redirectStart((err, data) => this.startGame());
    }

    clickStart() {
        clickStart(this.state.name);
        this.props.history.push('/game');
    }

    startGame() {
        this.props.history.push('/game');
    }

    leaveLobby() {
        leaveLobby();
        console.log('client: left game');
        this.props.history.push('/');
    }

    render() {
        let startGameButton;
        if (this.state.users.length >= 2 && this.state.users.length <= 4) {
            startGameButton = <Button onClick={this.clickStart} variant="dark">Start</Button>
        } else {
            startGameButton = <Button disabled={true} onClick={this.clickStart} variant="dark">Start</Button>
        }

        return (
            <div className="background row" style={{height: window.innerHeight}}>
                <div className="col-md-6 center-horizontal-vertical">
                    <p className="lobby-uno">UNO</p>
                </div>
                <div className="col-md-6 center-vertical">
                    <h5>{this.state.users.length}/4 Players in Lobby</h5>
                    <ul>{
                        this.state.users.map((user) => {
                            return (
                                <li key={user.user}>
                                    {user.username}
                                </li>
                            );
                        })
                    }</ul>
                    < br/>
                    {this.state.ranking.length !== 0 && <h5>Last Game</h5>}
                    {this.state.ranking.length !== 0 && <div>{
                        this.state.ranking.map((user, index) => {
                            return (
                                <div>
                                    {index + 1}. {user.username}
                                </div>
                            );
                        })
                    }</div>}
                    < br/>
                    <Button onClick={this.leaveLobby} variant="dark" style={{marginRight: '0.5em'}}>Lobby
                        verlassen</Button>
                    {startGameButton}

                </div>
            </div>
        )
    }
}

export default withRouter(Lobby);